// ============================================
// ZDRAVEIBOLEST CUSTOM FUNCTIONS
// ============================================

// ============================================
// 0. BYPASS JWT AUTHENTICATION PLUGIN
// ============================================
add_filter('jwt_auth_whitelist', function($endpoints) {
    $endpoints[] = '/wp-json/zdravei/v1/update-profile';
    $endpoints[] = '/wp-json/zdravei/v1/clinical-trial-inquiry';
    $endpoints[] = '/wp-json/zdravei/v1/validate';
    $endpoints[] = '/wp-json/zdravei/v1/register';
    $endpoints[] = '/wp-json/zdravei/v1/login';
    return $endpoints;
});

// ============================================
// 1. JWT DECODE ФУНКЦИЯ (поддържа 1 и 3 сегмента)
// ============================================
function zdravei_decode_jwt_token($token) {
    if (empty($token)) {
        return new WP_Error('empty_token', 'Токенът е празен', array('status' => 401));
    }
    
    $parts = explode('.', $token);
    
    // Формат 1: Стандартен JWT с 3 сегмента
    if (count($parts) === 3) {
        $payload_base64 = $parts[1];
        $payload_json = base64_decode(str_replace(['-', '_'], ['+', '/'], $payload_base64));
        $payload = json_decode($payload_json);
        
        if (!$payload) {
            return new WP_Error('invalid_token', 'Невалиден токен', array('status' => 401));
        }
        
        if (isset($payload->exp) && $payload->exp < time()) {
            return new WP_Error('expired_token', 'Токенът е изтекъл', array('status' => 401));
        }
        
        return $payload;
    }
    
    // Формат 2: 1-сегментен base64 payload
    if (count($parts) === 1) {
        $payload_json = base64_decode(str_replace(['-', '_'], ['+', '/'], $token));
        $payload = json_decode($payload_json);
        
        if (!$payload) {
            return new WP_Error('invalid_token', 'Невалиден токен', array('status' => 401));
        }
        
        if (isset($payload->exp) && $payload->exp < time()) {
            return new WP_Error('expired_token', 'Токенът е изтекъл', array('status' => 401));
        }
        
        return $payload;
    }
    
    return new WP_Error('invalid_token_format', 'Невалиден формат на токена', array('status' => 401));
}

// Helper функция за извличане на user_id от decoded token
function zdravei_get_user_id_from_token($decoded) {
    if (isset($decoded->data->user->id)) {
        return $decoded->data->user->id;
    }
    if (isset($decoded->user_id)) {
        return $decoded->user_id;
    }
    return null;
}

// ============================================
// 2. РЕГИСТРАЦИЯ НА SITE_MEMBER РОЛЯ
// ============================================
function zdravei_register_site_member_role() {
    if (!get_role('site_member')) {
        add_role('site_member', 'Member', array('read' => true, 'level_0' => true));
    }
}
add_action('init', 'zdravei_register_site_member_role');

// ============================================
// 3. REST API ENDPOINT ЗА VALIDATE
// ============================================
function zdravei_register_validate_endpoint() {
    register_rest_route('zdravei/v1', '/validate', array(
        'methods' => 'POST',
        'callback' => 'zdravei_validate_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_validate_endpoint');

function zdravei_validate_callback($request) {
    // Взимаме токена от custom header X-Auth-Token
    $token = $request->get_header('X-Auth-Token');
    
    // Алтернативно - опитай да вземеш от $_SERVER
    if (empty($token) && isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
        $token = $_SERVER['HTTP_X_AUTH_TOKEN'];
    }
    
    // Ако няма токен, връщаме празен response (не е грешка)
    if (empty($token)) {
        return array('valid' => false, 'message' => 'No token provided');
    }
    
    $decoded = zdravei_decode_jwt_token($token);
    if (is_wp_error($decoded)) {
        return $decoded;
    }
    
    $user_id = zdravei_get_user_id_from_token($decoded);
    
    if (!$user_id) {
        return new WP_Error('no_user_id', 'Не е намерен user_id в токена', array('status' => 401));
    }
    
    $user = get_userdata($user_id);
    if (!$user) {
        return new WP_Error('user_not_found', 'Потребителят не е намерен', array('status' => 404));
    }
    
    return array(
        'id' => $user->ID,
        'user_id' => $user->ID,
        'username' => $user->user_login,
        'email' => $user->user_email,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'display_name' => $user->display_name,
        'role' => implode(', ', $user->roles),
        'phone' => get_user_meta($user->ID, 'phone', true),
        'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
        'disease' => get_user_meta($user->ID, 'disease', true),
        'birth_year' => get_user_meta($user->ID, 'birth_year', true),
        'gender' => get_user_meta($user->ID, 'gender', true),
        'city' => get_user_meta($user->ID, 'city', true),
        'profile_completed' => get_user_meta($user->ID, 'profile_completed', true),
    );
}

// ============================================
// 4. REST API ENDPOINT ЗА UPDATE PROFILE
// ============================================
function zdravei_register_update_profile_endpoint() {
    register_rest_route('zdravei/v1', '/update-profile', array(
        'methods' => 'POST',
        'callback' => 'zdravei_update_profile_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_update_profile_endpoint');

function zdravei_update_profile_callback($request) {
    $params = $request->get_json_params();
    
    // Взимаме токена от custom header X-Auth-Token
    $token = $request->get_header('X-Auth-Token');
    
    if (empty($token)) {
        return new WP_Error('no_token', 'Липсва токен за автентикация', array('status' => 401));
    }
    
    $decoded = zdravei_decode_jwt_token($token);
    if (is_wp_error($decoded)) {
        return $decoded;
    }
    
    $user_id = zdravei_get_user_id_from_token($decoded);
    
    if (!$user_id) {
        return new WP_Error('no_user_id', 'Не е намерен user_id в токена', array('status' => 401));
    }
    
    $current_user = get_userdata($user_id);
    if (!$current_user) {
        return new WP_Error('invalid_user', 'Потребителят не е намерен', array('status' => 404));
    }
    
    // Update basic user info
    $user_data = array('ID' => $user_id);
    if (isset($params['first_name'])) {
        $user_data['first_name'] = sanitize_text_field($params['first_name']);
    }
    if (isset($params['last_name'])) {
        $user_data['last_name'] = sanitize_text_field($params['last_name']);
    }
    
    $update_result = wp_update_user($user_data);
    if (is_wp_error($update_result)) {
        return $update_result;
    }
    
    // Update custom meta fields
    $meta_fields = array('phone', 'birth_year', 'gender', 'city', 'current_conditions', 'current_medications', 'smoking_status', 'additional_info', 'disease', 'therapeutic_area');
    foreach ($meta_fields as $field) {
        if (isset($params[$field])) {
            $value = sanitize_text_field($params[$field]);
            update_user_meta($user_id, $field, $value);
        }
    }
    
    // Mark profile as completed
    update_user_meta($user_id, 'profile_completed', true);
    update_user_meta($user_id, 'profile_completed_date', current_time('mysql'));
    
    $user = get_userdata($user_id);
    
    return array(
        'success' => true,
        'message' => 'Профилът е обновен успешно',
        'user' => array(
            'id' => $user->ID,
            'email' => $user->user_email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'phone' => get_user_meta($user->ID, 'phone', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
            'disease' => get_user_meta($user->ID, 'disease', true),
            'birth_year' => get_user_meta($user->ID, 'birth_year', true),
            'gender' => get_user_meta($user->ID, 'gender', true),
            'city' => get_user_meta($user->ID, 'city', true),
            'current_conditions' => get_user_meta($user->ID, 'current_conditions', true),
            'current_medications' => get_user_meta($user->ID, 'current_medications', true),
            'smoking_status' => get_user_meta($user->ID, 'smoking_status', true),
            'profile_completed' => true,
        ),
    );
}

// ============================================
// 5. REST API ENDPOINT ЗА CLINICAL TRIAL INQUIRY
// ============================================
function zdravei_register_clinical_inquiry_endpoint() {
    register_rest_route('zdravei/v1', '/clinical-trial-inquiry', array(
        'methods' => 'POST',
        'callback' => 'zdravei_clinical_inquiry_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_clinical_inquiry_endpoint');

function zdravei_clinical_inquiry_callback($request) {
    $params = $request->get_json_params();
    
    // Взимаме токена от custom header X-Auth-Token
    $token = $request->get_header('X-Auth-Token');
    
    if (empty($token)) {
        return new WP_Error('no_token', 'Липсва токен за автентикация', array('status' => 401));
    }
    
    $decoded = zdravei_decode_jwt_token($token);
    if (is_wp_error($decoded)) {
        return $decoded;
    }
    
    $user_id = zdravei_get_user_id_from_token($decoded);
    if (!$user_id) {
        return new WP_Error('no_user_id', 'Не е намерен user_id в токена', array('status' => 401));
    }
    
    $current_user = get_userdata($user_id);
    if (!$current_user) {
        return new WP_Error('invalid_user', 'Потребителят не е намерен', array('status' => 404));
    }
    
    $admin_email = get_option('admin_email');
    $subject = 'Нова заявка за клинично изпитване от ' . sanitize_text_field($params['first_name']) . ' ' . sanitize_text_field($params['last_name']);
    
    $gender_labels = array('male' => 'Мъж', 'female' => 'Жена', 'other' => 'Друго', 'prefer_not_to_say' => 'Предпочита да не отговори');
    $smoking_labels = array('never' => 'Никога не е пушил/а', 'former' => 'Бивш пушач', 'current' => 'Пуши в момента', 'occasional' => 'Пуши рядко');
    
    $message = "Получена е нова заявка за клинично изпитване:\n\n";
    $message .= "=== ЛИЧНА ИНФОРМАЦИЯ ===\n";
    $message .= "Име: " . sanitize_text_field($params['first_name']) . "\n";
    $message .= "Фамилия: " . sanitize_text_field($params['last_name']) . "\n";
    $message .= "Имейл: " . sanitize_email($params['email']) . "\n";
    $message .= "Телефон: " . sanitize_text_field($params['phone']) . "\n";
    $message .= "Година на раждане: " . sanitize_text_field($params['birth_year']) . "\n";
    $message .= "Пол: " . ($gender_labels[$params['gender']] ?? $params['gender']) . "\n";
    $message .= "Град: " . sanitize_text_field($params['city']) . "\n\n";
    $message .= "=== ЗДРАВНА ИНФОРМАЦИЯ ===\n";
    $message .= "Настоящи заболявания: " . sanitize_text_field($params['current_conditions']) . "\n";
    $message .= "Прием на медикаменти: " . sanitize_text_field($params['current_medications']) . "\n";
    $message .= "Пушене: " . ($smoking_labels[$params['smoking_status']] ?? $params['smoking_status']) . "\n";
    $message .= "Допълнителна информация: " . sanitize_textarea_field($params['additional_info']) . "\n\n";
    $message .= "User ID: " . $current_user->ID . "\n";
    $message .= "Линк: " . admin_url('user-edit.php?user_id=' . $current_user->ID) . "\n";
    
    $headers = array('Content-Type: text/plain; charset=UTF-8');
    $sent = wp_mail($admin_email, $subject, $message, $headers);
    
    update_user_meta($current_user->ID, 'clinical_inquiry_submitted', true);
    update_user_meta($current_user->ID, 'clinical_inquiry_date', current_time('mysql'));
    
    return array('success' => true, 'message' => 'Заявката е изпратена успешно');
}

// ============================================
// 6. REST API ENDPOINT ЗА REGISTER
// ============================================
function zdravei_register_register_endpoint() {
    register_rest_route('zdravei/v1', '/register', array(
        'methods' => 'POST',
        'callback' => 'zdravei_register_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_register_endpoint');

function zdravei_register_callback($request) {
    $params = $request->get_json_params();
    
    // Валидация на задължителни полета
    if (empty($params['username']) || empty($params['email']) || empty($params['password'])) {
        return new WP_Error('missing_fields', 'Моля, попълнете всички задължителни полета', array('status' => 400));
    }
    
    // Проверка дали потребителското име вече съществува
    if (username_exists($params['username'])) {
        return new WP_Error('username_exists', 'Потребителското име вече съществува', array('status' => 400));
    }
    
    // Проверка дали имейлът вече съществува
    if (email_exists($params['email'])) {
        return new WP_Error('email_exists', 'Имейлът вече е регистриран', array('status' => 400));
    }
    
    // Създаване на нов потребител
    $user_id = wp_create_user(
        sanitize_text_field($params['username']),
        $params['password'],
        sanitize_email($params['email'])
    );
    
    if (is_wp_error($user_id)) {
        return $user_id;
    }
    
    // Задаване на роля site_member
    $user = new WP_User($user_id);
    $user->set_role('site_member');
    
    // Обновяване на основна информация
    if (!empty($params['first_name'])) {
        wp_update_user(array(
            'ID' => $user_id,
            'first_name' => sanitize_text_field($params['first_name'])
        ));
    }
    
    if (!empty($params['last_name'])) {
        wp_update_user(array(
            'ID' => $user_id,
            'last_name' => sanitize_text_field($params['last_name'])
        ));
    }
    
    // Запазване на custom meta полета
    if (!empty($params['phone'])) {
        update_user_meta($user_id, 'phone', sanitize_text_field($params['phone']));
    }
    
    if (!empty($params['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($params['therapeutic_area']));
    }
    
    // ВАЖНО: Запазване на избраното заболяване
    if (!empty($params['disease'])) {
        update_user_meta($user_id, 'disease', sanitize_text_field($params['disease']));
    }
    
    // Допълнителни meta полета
    update_user_meta($user_id, 'registration_date', current_time('mysql'));
    update_user_meta($user_id, 'registration_source', 'website');
    update_user_meta($user_id, 'profile_completed', false);
    
    // ВАЖНО: Тригърване на 'user_register' hook за плъгини като "Better Notification WP"
    // wp_create_user() НЕ тригърва този hook автоматично, затова го правим ръчно
    do_action('user_register', $user_id, array(
        'user_login' => $params['username'],
        'user_email' => $params['email'],
        'first_name' => $params['first_name'] ?? '',
        'last_name' => $params['last_name'] ?? '',
        'role' => 'site_member',
    ));
    
    // Генериране на JWT токен
    $token_data = array(
        'iss' => get_bloginfo('url'),
        'iat' => time(),
        'exp' => time() + (7 * DAY_IN_SECONDS), // 7 дни
        'data' => array(
            'user' => array(
                'id' => $user_id
            )
        )
    );
    
    $token_json = json_encode($token_data);
    $token = base64_encode($token_json);
    
    // Вземаме fresh данни за потребителя
    $user_data = get_userdata($user_id);
    
    return array(
        'success' => true,
        'message' => 'Регистрацията е успешна',
        'token' => $token,
        'user' => array(
            'id' => $user_id,
            'username' => $user_data->user_login,
            'email' => $user_data->user_email,
            'first_name' => $user_data->first_name,
            'last_name' => $user_data->last_name,
            'role' => 'site_member',
            'phone' => get_user_meta($user_id, 'phone', true),
            'therapeutic_area' => get_user_meta($user_id, 'therapeutic_area', true),
            'disease' => get_user_meta($user_id, 'disease', true),
            'profile_completed' => false,
        )
    );
}

// ============================================
// 7. REST API ENDPOINT ЗА LOGIN
// ============================================
function zdravei_register_login_endpoint() {
    register_rest_route('zdravei/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'zdravei_login_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_login_endpoint');

function zdravei_login_callback($request) {
    $params = $request->get_json_params();
    
    if (empty($params['username']) || empty($params['password'])) {
        return new WP_Error('missing_credentials', 'Моля, въведете потребителско име и парола', array('status' => 400));
    }
    
    $user = wp_authenticate($params['username'], $params['password']);
    
    if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'Невалидно потребителско име или парола', array('status' => 401));
    }
    
    // Генериране на JWT токен
    $token_data = array(
        'iss' => get_bloginfo('url'),
        'iat' => time(),
        'exp' => time() + (7 * DAY_IN_SECONDS),
        'data' => array(
            'user' => array(
                'id' => $user->ID
            )
        )
    );
    
    $token_json = json_encode($token_data);
    $token = base64_encode($token_json);
    
    return array(
        'success' => true,
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'role' => implode(', ', $user->roles),
            'phone' => get_user_meta($user->ID, 'phone', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
            'disease' => get_user_meta($user->ID, 'disease', true),
            'birth_year' => get_user_meta($user->ID, 'birth_year', true),
            'gender' => get_user_meta($user->ID, 'gender', true),
            'city' => get_user_meta($user->ID, 'city', true),
            'profile_completed' => get_user_meta($user->ID, 'profile_completed', true),
        )
    );
}

// ============================================
// 8. ДОБАВЯНЕ НА CUSTOM FIELDS В АДМИН ПАНЕЛА
// ============================================
function zdravei_add_custom_user_fields($user) {
    ?>
    <h3>Регистрационна информация</h3>
    <table class="form-table">
        <tr>
            <th><label for="therapeutic_area">Терапевтична област</label></th>
            <td>
                <input type="text" name="therapeutic_area" id="therapeutic_area" value="<?php echo esc_attr(get_user_meta($user->ID, 'therapeutic_area', true)); ?>" class="regular-text" />
                <p class="description">Slug на избраната терапевтична област при регистрация</p>
            </td>
        </tr>
        <tr>
            <th><label for="disease">Конкретно заболяване</label></th>
            <td>
                <input type="text" name="disease" id="disease" value="<?php echo esc_attr(get_user_meta($user->ID, 'disease', true)); ?>" class="regular-text" />
                <p class="description">Избраното заболяване при регистрация</p>
            </td>
        </tr>
    </table>
    
    <h3>Здравна информация</h3>
    <table class="form-table">
        <tr>
            <th><label for="phone">Телефон</label></th>
            <td>
                <input type="text" name="phone" id="phone" value="<?php echo esc_attr(get_user_meta($user->ID, 'phone', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="birth_year">Година на раждане</label></th>
            <td>
                <input type="number" name="birth_year" id="birth_year" value="<?php echo esc_attr(get_user_meta($user->ID, 'birth_year', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="gender">Пол</label></th>
            <td>
                <?php $gender = get_user_meta($user->ID, 'gender', true); ?>
                <select name="gender" id="gender">
                    <option value="">-- Изберете --</option>
                    <option value="male" <?php selected($gender, 'male'); ?>>Мъж</option>
                    <option value="female" <?php selected($gender, 'female'); ?>>Жена</option>
                    <option value="other" <?php selected($gender, 'other'); ?>>Друго</option>
                    <option value="prefer_not_to_say" <?php selected($gender, 'prefer_not_to_say'); ?>>Предпочитам да не отговарям</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="city">Град</label></th>
            <td>
                <input type="text" name="city" id="city" value="<?php echo esc_attr(get_user_meta($user->ID, 'city', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="current_conditions">Настоящи заболявания</label></th>
            <td>
                <textarea name="current_conditions" id="current_conditions" rows="3" class="regular-text"><?php echo esc_textarea(get_user_meta($user->ID, 'current_conditions', true)); ?></textarea>
            </td>
        </tr>
        <tr>
            <th><label for="current_medications">Прием на медикаменти</label></th>
            <td>
                <textarea name="current_medications" id="current_medications" rows="3" class="regular-text"><?php echo esc_textarea(get_user_meta($user->ID, 'current_medications', true)); ?></textarea>
            </td>
        </tr>
        <tr>
            <th><label for="smoking_status">Пушене</label></th>
            <td>
                <?php $smoking = get_user_meta($user->ID, 'smoking_status', true); ?>
                <select name="smoking_status" id="smoking_status">
                    <option value="">-- Изберете --</option>
                    <option value="never" <?php selected($smoking, 'never'); ?>>Никога не съм пушил/а</option>
                    <option value="former" <?php selected($smoking, 'former'); ?>>Бивш пушач</option>
                    <option value="current" <?php selected($smoking, 'current'); ?>>Пуша в момента</option>
                    <option value="occasional" <?php selected($smoking, 'occasional'); ?>>Пуша рядко/социално</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="additional_info">Допълнителна здравна информация</label></th>
            <td>
                <textarea name="additional_info" id="additional_info" rows="4" class="regular-text"><?php echo esc_textarea(get_user_meta($user->ID, 'additional_info', true)); ?></textarea>
            </td>
        </tr>
    </table>
    <h3>Статус</h3>
    <table class="form-table">
        <tr>
            <th>Дата на регистрация</th>
            <td>
                <?php 
                $reg_date = get_user_meta($user->ID, 'registration_date', true);
                echo $reg_date ? $reg_date : 'Няма данни';
                ?>
            </td>
        </tr>
        <tr>
            <th>Профил завършен</th>
            <td>
                <?php 
                $completed = get_user_meta($user->ID, 'profile_completed', true);
                $completed_date = get_user_meta($user->ID, 'profile_completed_date', true);
                if ($completed) {
                    echo '<span style="color:green;">✓ Да</span>';
                    if ($completed_date) {
                        echo ' <small>(на ' . $completed_date . ')</small>';
                    }
                } else {
                    echo '<span style="color:orange;">✗ Не</span>';
                }
                ?>
            </td>
        </tr>
        <tr>
            <th>Заявка изпратена</th>
            <td>
                <?php 
                $inquiry = get_user_meta($user->ID, 'clinical_inquiry_submitted', true);
                $inquiry_date = get_user_meta($user->ID, 'clinical_inquiry_date', true);
                if ($inquiry) {
                    echo '<span style="color:green;">✓ Да</span>';
                    if ($inquiry_date) {
                        echo ' <small>(на ' . $inquiry_date . ')</small>';
                    }
                } else {
                    echo '<span style="color:gray;">✗ Не</span>';
                }
                ?>
            </td>
        </tr>
    </table>
    <?php
}
add_action('show_user_profile', 'zdravei_add_custom_user_fields');
add_action('edit_user_profile', 'zdravei_add_custom_user_fields');

function zdravei_save_custom_user_fields($user_id) {
    if (!current_user_can('edit_user', $user_id)) return false;
    
    $fields = array(
        'therapeutic_area', 
        'disease', 
        'phone', 
        'birth_year', 
        'gender', 
        'city', 
        'current_conditions', 
        'current_medications', 
        'smoking_status', 
        'additional_info'
    );
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_user_meta($user_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('personal_options_update', 'zdravei_save_custom_user_fields');
add_action('edit_user_profile_update', 'zdravei_save_custom_user_fields');

// ============================================
// 9. ДОБАВЯНЕ НА КОЛОНИ В СПИСЪКА С ПОТРЕБИТЕЛИ
// ============================================
function zdravei_add_user_columns($columns) {
    $columns['phone'] = 'Телефон';
    $columns['therapeutic_area'] = 'Терап. област';
    $columns['disease'] = 'Заболяване';
    $columns['profile_completed'] = 'Профил';
    return $columns;
}
add_filter('manage_users_columns', 'zdravei_add_user_columns');

function zdravei_show_user_column_content($value, $column_name, $user_id) {
    if ($column_name === 'phone') return get_user_meta($user_id, 'phone', true) ?: '-';
    if ($column_name === 'therapeutic_area') return get_user_meta($user_id, 'therapeutic_area', true) ?: '-';
    if ($column_name === 'disease') {
        $disease = get_user_meta($user_id, 'disease', true);
        return $disease ? '<span title="' . esc_attr($disease) . '">' . (strlen($disease) > 30 ? substr($disease, 0, 30) . '...' : $disease) . '</span>' : '-';
    }
    if ($column_name === 'profile_completed') return get_user_meta($user_id, 'profile_completed', true) ? '✓' : '✗';
    return $value;
}
add_filter('manage_users_custom_column', 'zdravei_show_user_column_content', 10, 3);

