<?php
/**
 * ВАЖНО: Този код трябва да се добави в functions.php на WordPress темата
 * или като отделен плъгин.
 * 
 * Съдържа:
 * 1. Регистрация на нова роля "site_member"
 * 2. REST API endpoints за update-profile и clinical-trial-inquiry
 * 3. Добавяне на custom user fields в админ панела
 * 4. Bypass за JWT Authentication плъгина
 */

// ============================================
// 0. BYPASS JWT AUTHENTICATION PLUGIN ЗА НАШИТЕ ENDPOINTS
// ============================================

// Whitelist нашите custom endpoints от JWT плъгина
add_filter('jwt_auth_whitelist', function($endpoints) {
    $endpoints[] = '/wp-json/zdravei/v1/update-profile';
    $endpoints[] = '/wp-json/zdravei/v1/clinical-trial-inquiry';
    $endpoints[] = '/wp-json/zdravei/v1/validate';
    $endpoints[] = '/wp-json/zdravei/v1/register';
    $endpoints[] = '/wp-json/zdravei/v1/login';
    return $endpoints;
});

// ============================================
// 0.5 CUSTOM JWT VALIDATION (поддържа и 1-сегментни и 3-сегментни токени)
// ============================================

/**
 * Валидира JWT токен - поддържа два формата:
 * 1. Стандартен 3-сегментен JWT (header.payload.signature)
 * 2. 1-сегментен base64 payload (от JWT Authentication плъгина)
 */
function zdravei_validate_jwt_token($token) {
    if (empty($token)) {
        return false;
    }
    
    $parts = explode('.', $token);
    
    // Формат 1: Стандартен JWT с 3 сегмента
    if (count($parts) === 3) {
        $secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : 'zdravei-secret-key-change-this';
        
        list($base64_header, $base64_payload, $base64_signature) = $parts;
        
        // Проверяваме подписа
        $signature = hash_hmac('sha256', $base64_header . '.' . $base64_payload, $secret_key, true);
        $expected_signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        if (!hash_equals($expected_signature, $base64_signature)) {
            return false;
        }
        
        // Декодираме payload
        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $base64_payload)), true);
        
        if (!$payload) {
            return false;
        }
        
        // Проверяваме дали токенът е изтекъл
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return false;
        }
        
        // Връщаме user_id (може да е в различни формати)
        if (isset($payload['user_id'])) {
            return $payload['user_id'];
        }
        if (isset($payload['data']['user']['id'])) {
            return $payload['data']['user']['id'];
        }
        
        return false;
    }
    
    // Формат 2: 1-сегментен base64 payload (от JWT плъгина)
    if (count($parts) === 1) {
        // Декодираме директно като base64
        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $token)), true);
        
        if (!$payload) {
            return false;
        }
        
        // Проверяваме дали токенът е изтекъл
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return false;
        }
        
        // JWT плъгинът използва data.user.id формат
        if (isset($payload['data']['user']['id'])) {
            return $payload['data']['user']['id'];
        }
        if (isset($payload['user_id'])) {
            return $payload['user_id'];
        }
        
        return false;
    }
    
    return false;
}

// ============================================
// 1. РЕГИСТРАЦИЯ НА SITE_MEMBER РОЛЯ
// ============================================

function zdravei_register_site_member_role() {
    add_role(
        'site_member',
        'Member',
        array(
            'read' => true,
            'level_0' => true,
        )
    );
}
add_action('init', 'zdravei_register_site_member_role');

// ============================================
// 2. ОБНОВЯВАНЕ НА REGISTER ENDPOINT ДА ПОДДЪРЖА ROLE
// ============================================

// Модифицирай съществуващия register endpoint да приема role параметър
// В register handler функцията добави:
// $role = isset($params['role']) && $params['role'] === 'site_member' ? 'site_member' : 'subscriber';
// wp_update_user(array('ID' => $user_id, 'role' => $role));

// ============================================
// 3. REST API ENDPOINT ЗА UPDATE PROFILE
// ============================================

function zdravei_register_update_profile_endpoint() {
    register_rest_route('zdravei/v1', '/update-profile', array(
        'methods' => 'POST',
        'callback' => 'zdravei_update_profile_callback',
        'permission_callback' => '__return_true', // Публичен достъп, валидацията е в callback
    ));
}
add_action('rest_api_init', 'zdravei_register_update_profile_endpoint');

function zdravei_update_profile_callback($request) {
    // Ръчно валидираме JWT токена (bypass JWT плъгина)
    $auth_header = $request->get_header('Authorization');
    
    if (empty($auth_header)) {
        return new WP_Error('no_token', 'Липсва токен за автентикация', array('status' => 401));
    }
    
    $token = str_replace('Bearer ', '', $auth_header);
    
    // Използваме нашата custom JWT валидация
    $user_id = zdravei_validate_jwt_token($token);
    
    if (!$user_id) {
        return new WP_Error('invalid_token', 'Невалиден или изтекъл токен', array('status' => 401));
    }
    
    $current_user = get_userdata($user_id);
    
    if (!$current_user || !$current_user->ID) {
        return new WP_Error('user_not_found', 'Потребителят не е намерен', array('status' => 404));
    }
    
    $params = $request->get_json_params();
    
    // Update basic user info
    $user_data = array('ID' => $current_user->ID);
    
    if (isset($params['first_name'])) {
        $user_data['first_name'] = sanitize_text_field($params['first_name']);
    }
    if (isset($params['last_name'])) {
        $user_data['last_name'] = sanitize_text_field($params['last_name']);
    }
    
    wp_update_user($user_data);
    
    // Update custom meta fields
    $meta_fields = array(
        'phone',
        'birth_year',
        'gender',
        'city',
        'current_conditions',
        'current_medications',
        'smoking_status',
        'additional_info',
        'disease',
        'therapeutic_area',
    );
    
    foreach ($meta_fields as $field) {
        if (isset($params[$field])) {
            update_user_meta($current_user->ID, $field, sanitize_text_field($params[$field]));
        }
    }
    
    // Mark profile as completed
    update_user_meta($current_user->ID, 'profile_completed', true);
    update_user_meta($current_user->ID, 'profile_completed_date', current_time('mysql'));
    
    // Return updated user data
    $user = get_userdata($current_user->ID);
    
    return array(
        'success' => true,
        'message' => 'Профилът е обновен успешно',
        'user' => array(
            'id' => $user->ID,
            'email' => $user->user_email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'phone' => get_user_meta($user->ID, 'phone', true),
            'birth_year' => get_user_meta($user->ID, 'birth_year', true),
            'gender' => get_user_meta($user->ID, 'gender', true),
            'city' => get_user_meta($user->ID, 'city', true),
            'current_conditions' => get_user_meta($user->ID, 'current_conditions', true),
            'current_medications' => get_user_meta($user->ID, 'current_medications', true),
            'smoking_status' => get_user_meta($user->ID, 'smoking_status', true),
            'profile_completed' => get_user_meta($user->ID, 'profile_completed', true),
        ),
    );
}

// ============================================
// 4. REST API ENDPOINT ЗА CLINICAL TRIAL INQUIRY
// ============================================

function zdravei_register_clinical_inquiry_endpoint() {
    register_rest_route('zdravei/v1', '/clinical-trial-inquiry', array(
        'methods' => 'POST',
        'callback' => 'zdravei_clinical_inquiry_callback',
        'permission_callback' => '__return_true', // Публичен достъп, валидацията е в callback
    ));
}
add_action('rest_api_init', 'zdravei_register_clinical_inquiry_endpoint');

function zdravei_clinical_inquiry_callback($request) {
    // Ръчно валидираме JWT токена (bypass JWT плъгина)
    $auth_header = $request->get_header('Authorization');
    
    if (empty($auth_header)) {
        return new WP_Error('no_token', 'Липсва токен за автентикация', array('status' => 401));
    }
    
    $token = str_replace('Bearer ', '', $auth_header);
    
    // Използваме нашата custom JWT валидация
    $user_id = zdravei_validate_jwt_token($token);
    
    if (!$user_id) {
        return new WP_Error('invalid_token', 'Невалиден или изтекъл токен', array('status' => 401));
    }
    
    $current_user = get_userdata($user_id);
    
    if (!$current_user || !$current_user->ID) {
        return new WP_Error('user_not_found', 'Потребителят не е намерен', array('status' => 404));
    }
    
    $params = $request->get_json_params();
    
    // Get admin email
    $admin_email = get_option('admin_email');
    
    // Prepare email content
    $subject = 'Нова заявка за клинично изпитване от ' . $params['first_name'] . ' ' . $params['last_name'];
    
    $gender_labels = array(
        'male' => 'Мъж',
        'female' => 'Жена',
        'other' => 'Друго',
        'prefer_not_to_say' => 'Предпочита да не отговори',
    );
    
    $smoking_labels = array(
        'never' => 'Никога не е пушил/а',
        'former' => 'Бивш пушач',
        'current' => 'Пуши в момента',
        'occasional' => 'Пуши рядко/социално',
    );
    
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
    
    $message .= "=== ДАННИ ЗА ПОТРЕБИТЕЛЯ ===\n";
    $message .= "Потребителско име: " . $current_user->user_login . "\n";
    $message .= "User ID: " . $current_user->ID . "\n";
    $message .= "Дата на регистрация: " . $current_user->user_registered . "\n";
    $message .= "Дата на заявката: " . current_time('mysql') . "\n\n";
    
    $message .= "---\n";
    $message .= "Линк към профила в админ панела: " . admin_url('user-edit.php?user_id=' . $current_user->ID) . "\n";
    
    // Send email
    $headers = array('Content-Type: text/plain; charset=UTF-8');
    $sent = wp_mail($admin_email, $subject, $message, $headers);
    
    // Log the inquiry
    update_user_meta($current_user->ID, 'clinical_inquiry_submitted', true);
    update_user_meta($current_user->ID, 'clinical_inquiry_date', current_time('mysql'));
    
    if ($sent) {
        return array(
            'success' => true,
            'message' => 'Заявката е изпратена успешно',
        );
    } else {
        return new WP_Error('email_failed', 'Грешка при изпращане на имейл', array('status' => 500));
    }
}

// ============================================
// 5. ДОБАВЯНЕ НА CUSTOM FIELDS В АДМИН ПАНЕЛА
// ============================================

function zdravei_add_custom_user_fields($user) {
    ?>
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
                <input type="number" name="birth_year" id="birth_year" value="<?php echo esc_attr(get_user_meta($user->ID, 'birth_year', true)); ?>" class="regular-text" min="1920" max="<?php echo date('Y'); ?>" />
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
                    <option value="prefer_not_to_say" <?php selected($gender, 'prefer_not_to_say'); ?>>Предпочита да не отговори</option>
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
                    <option value="never" <?php selected($smoking, 'never'); ?>>Никога не е пушил/а</option>
                    <option value="former" <?php selected($smoking, 'former'); ?>>Бивш пушач</option>
                    <option value="current" <?php selected($smoking, 'current'); ?>>Пуши в момента</option>
                    <option value="occasional" <?php selected($smoking, 'occasional'); ?>>Пуши рядко/социално</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="additional_info">Допълнителна здравна информация</label></th>
            <td>
                <textarea name="additional_info" id="additional_info" rows="4" class="regular-text"><?php echo esc_textarea(get_user_meta($user->ID, 'additional_info', true)); ?></textarea>
            </td>
        </tr>
        <tr>
            <th><label for="therapeutic_area">Терапевтична област (интерес)</label></th>
            <td>
                <input type="text" name="therapeutic_area" id="therapeutic_area" value="<?php echo esc_attr(get_user_meta($user->ID, 'therapeutic_area', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="disease">Заболяване (от бърза регистрация)</label></th>
            <td>
                <input type="text" name="disease" id="disease" value="<?php echo esc_attr(get_user_meta($user->ID, 'disease', true)); ?>" class="regular-text" />
            </td>
        </tr>
    </table>
    
    <h3>Статус на профила</h3>
    <table class="form-table">
        <tr>
            <th>Профилът е завършен</th>
            <td>
                <?php 
                $completed = get_user_meta($user->ID, 'profile_completed', true);
                $completed_date = get_user_meta($user->ID, 'profile_completed_date', true);
                if ($completed) {
                    echo '<span style="color: green;">&#10004; Да</span>';
                    if ($completed_date) {
                        echo ' <small>(на ' . $completed_date . ')</small>';
                    }
                } else {
                    echo '<span style="color: orange;">&#10008; Не</span>';
                }
                ?>
            </td>
        </tr>
        <tr>
            <th>Заявка за клинично изпитване</th>
            <td>
                <?php 
                $inquiry = get_user_meta($user->ID, 'clinical_inquiry_submitted', true);
                $inquiry_date = get_user_meta($user->ID, 'clinical_inquiry_date', true);
                if ($inquiry) {
                    echo '<span style="color: green;">&#10004; Изпратена</span>';
                    if ($inquiry_date) {
                        echo ' <small>(на ' . $inquiry_date . ')</small>';
                    }
                } else {
                    echo '<span style="color: gray;">&#10008; Не е изпращана</span>';
                }
                ?>
            </td>
        </tr>
    </table>
    <?php
}
add_action('show_user_profile', 'zdravei_add_custom_user_fields');
add_action('edit_user_profile', 'zdravei_add_custom_user_fields');

// Save custom fields
function zdravei_save_custom_user_fields($user_id) {
    if (!current_user_can('edit_user', $user_id)) {
        return false;
    }
    
    $fields = array(
        'phone',
        'birth_year',
        'gender',
        'city',
        'current_conditions',
        'current_medications',
        'smoking_status',
        'additional_info',
        'therapeutic_area',
        'disease',
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
// 6. ДОБАВЯНЕ НА КОЛОНИ В СПИСЪКА С ПОТРЕБИТЕЛИ
// ============================================

function zdravei_add_user_columns($columns) {
    $columns['phone'] = 'Телефон';
    $columns['city'] = 'Град';
    $columns['profile_completed'] = 'Профил';
    $columns['clinical_inquiry'] = 'Заявка';
    return $columns;
}
add_filter('manage_users_columns', 'zdravei_add_user_columns');

function zdravei_show_user_column_content($value, $column_name, $user_id) {
    switch ($column_name) {
        case 'phone':
            return get_user_meta($user_id, 'phone', true) ?: '-';
        case 'city':
            return get_user_meta($user_id, 'city', true) ?: '-';
        case 'profile_completed':
            $completed = get_user_meta($user_id, 'profile_completed', true);
            return $completed ? '<span style="color:green;">&#10004;</span>' : '<span style="color:orange;">&#10008;</span>';
        case 'clinical_inquiry':
            $inquiry = get_user_meta($user_id, 'clinical_inquiry_submitted', true);
            return $inquiry ? '<span style="color:green;">&#10004;</span>' : '-';
        default:
            return $value;
    }
}
add_filter('manage_users_custom_column', 'zdravei_show_user_column_content', 10, 3);

// ============================================
// 7. МОДИФИЦИРАНЕ НА REGISTER ENDPOINT ЗА ROLE
// ============================================

// Ако вече имате register endpoint, добавете следното в callback функцията:

/*
// В здравей_register_user_callback функцията добавете:

// Get role from params (default to site_member)
$role = isset($params['role']) && in_array($params['role'], array('site_member', 'subscriber')) 
    ? $params['role'] 
    : 'site_member';

// After creating user, set the role
$user_id = wp_insert_user(array(
    'user_login' => $username,
    'user_email' => $email,
    'user_pass' => $password,
    'first_name' => $first_name,
    'last_name' => $last_name,
    'role' => $role, // <-- Добавете това
));

// Also save phone and disease if provided (for quick registration)
if (!empty($params['phone'])) {
    update_user_meta($user_id, 'phone', sanitize_text_field($params['phone']));
}
if (!empty($params['disease'])) {
    update_user_meta($user_id, 'disease', sanitize_text_field($params['disease']));
}
if (!empty($params['therapeutic_area'])) {
    update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($params['therapeutic_area']));
}
*/

?>

