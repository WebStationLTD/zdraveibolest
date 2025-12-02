<?php
/**
 * ============================================
 * ZDRAVEIBOLEST.BG - AUTHENTICATION SYSTEM
 * ============================================
 * 
 * Този код трябва да се добави във вашия functions.php файл
 * в WordPress темата или в custom plugin.
 * 
 * ВАЖНО: Трябва да инсталирате JWT Authentication Plugin:
 * https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
 * 
 * ============================================
 */

// ============================================
// 1. CUSTOM USER META FIELD
// ============================================

/**
 * Добавяне на custom field за терапевтична област в user meta
 */
add_action('user_register', 'save_therapeutic_area_on_register');
function save_therapeutic_area_on_register($user_id) {
    if (isset($_POST['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($_POST['therapeutic_area']));
    }
}

/**
 * Добавяне на поле за терапевтична област в профила на потребителя
 */
add_action('show_user_profile', 'show_therapeutic_area_field');
add_action('edit_user_profile', 'show_therapeutic_area_field');
function show_therapeutic_area_field($user) {
    $therapeutic_area = get_user_meta($user->ID, 'therapeutic_area', true);
    ?>
    <h3>Информация за здраве</h3>
    <table class="form-table">
        <tr>
            <th><label for="therapeutic_area">Терапевтична област</label></th>
            <td>
                <input type="text" name="therapeutic_area" id="therapeutic_area" 
                       value="<?php echo esc_attr($therapeutic_area); ?>" 
                       class="regular-text" />
                <br />
                <span class="description">Терапевтичната област, за която потребителят проявява интерес</span>
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Запазване на терапевтична област при редакция на профил
 */
add_action('personal_options_update', 'save_therapeutic_area_field');
add_action('edit_user_profile_update', 'save_therapeutic_area_field');
function save_therapeutic_area_field($user_id) {
    if (!current_user_can('edit_user', $user_id)) {
        return false;
    }
    if (isset($_POST['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($_POST['therapeutic_area']));
    }
}

// ============================================
// 2. CUSTOM REST API ENDPOINTS
// ============================================

/**
 * Регистриране на custom REST API endpoints
 */
add_action('rest_api_init', function () {
    
    // Register endpoint
    register_rest_route('zdravei/v1', '/register', array(
        'methods' => 'POST',
        'callback' => 'zdravei_register_user',
        'permission_callback' => '__return_true'
    ));
    
    // Login endpoint
    register_rest_route('zdravei/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'zdravei_login_user',
        'permission_callback' => '__return_true'
    ));
    
    // Validate token endpoint
    register_rest_route('zdravei/v1', '/validate', array(
        'methods' => 'POST',
        'callback' => 'zdravei_validate_token',
        'permission_callback' => '__return_true'
    ));
});

/**
 * Register User - Custom endpoint
 */
function zdravei_register_user($request) {
    $parameters = $request->get_json_params();
    
    // Validation
    if (empty($parameters['username']) || empty($parameters['email']) || empty($parameters['password'])) {
        return new WP_Error('missing_fields', 'Моля, попълнете всички задължителни полета', array('status' => 400));
    }
    
    if (!is_email($parameters['email'])) {
        return new WP_Error('invalid_email', 'Невалиден имейл адрес', array('status' => 400));
    }
    
    if (username_exists($parameters['username'])) {
        return new WP_Error('username_exists', 'Потребителското име вече съществува', array('status' => 400));
    }
    
    if (email_exists($parameters['email'])) {
        return new WP_Error('email_exists', 'Имейлът вече е регистриран', array('status' => 400));
    }
    
    // Create user
    $user_id = wp_create_user(
        sanitize_user($parameters['username']),
        $parameters['password'],
        sanitize_email($parameters['email'])
    );
    
    if (is_wp_error($user_id)) {
        return $user_id;
    }
    
    // Update user meta
    if (!empty($parameters['first_name'])) {
        update_user_meta($user_id, 'first_name', sanitize_text_field($parameters['first_name']));
    }
    
    if (!empty($parameters['last_name'])) {
        update_user_meta($user_id, 'last_name', sanitize_text_field($parameters['last_name']));
    }
    
    if (!empty($parameters['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($parameters['therapeutic_area']));
    }
    
    // Generate JWT token
    $user = get_user_by('id', $user_id);
    $token = zdravei_generate_jwt_token($user);
    
    return array(
        'success' => true,
        'message' => 'Регистрацията е успешна',
        'token' => $token,
        'user' => array(
            'id' => $user_id,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => get_user_meta($user_id, 'first_name', true),
            'last_name' => get_user_meta($user_id, 'last_name', true),
            'therapeutic_area' => get_user_meta($user_id, 'therapeutic_area', true),
        )
    );
}

/**
 * Login User - Custom endpoint
 */
function zdravei_login_user($request) {
    $parameters = $request->get_json_params();
    
    if (empty($parameters['username']) || empty($parameters['password'])) {
        return new WP_Error('missing_credentials', 'Моля, въведете потребителско име и парола', array('status' => 400));
    }
    
    // Authenticate
    $user = wp_authenticate($parameters['username'], $parameters['password']);
    
    if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'Грешно потребителско име или парола', array('status' => 401));
    }
    
    // Generate JWT token
    $token = zdravei_generate_jwt_token($user);
    
    return array(
        'success' => true,
        'message' => 'Успешен вход',
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => get_user_meta($user->ID, 'first_name', true),
            'last_name' => get_user_meta($user->ID, 'last_name', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
        )
    );
}

/**
 * Validate Token - Custom endpoint
 */
function zdravei_validate_token($request) {
    $token = $request->get_header('Authorization');
    
    if (empty($token)) {
        return new WP_Error('no_token', 'Липсва токен за автентикация', array('status' => 401));
    }
    
    // Remove 'Bearer ' prefix
    $token = str_replace('Bearer ', '', $token);
    
    // Decode JWT token
    $decoded = zdravei_decode_jwt_token($token);
    
    if (is_wp_error($decoded)) {
        return $decoded;
    }
    
    $user_id = $decoded->data->user->id;
    $user = get_user_by('id', $user_id);
    
    if (!$user) {
        return new WP_Error('invalid_user', 'Потребителят не съществува', array('status' => 404));
    }
    
    return array(
        'success' => true,
        'user' => array(
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => get_user_meta($user->ID, 'first_name', true),
            'last_name' => get_user_meta($user->ID, 'last_name', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
        )
    );
}

// ============================================
// 3. JWT TOKEN HELPERS
// ============================================

/**
 * Generate JWT Token
 */
function zdravei_generate_jwt_token($user) {
    $secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : 'your-secret-key-here';
    $issued_at = time();
    $expiration_time = $issued_at + (60 * 60 * 24 * 7); // 7 days
    
    $payload = array(
        'iss' => get_bloginfo('url'),
        'iat' => $issued_at,
        'exp' => $expiration_time,
        'data' => array(
            'user' => array(
                'id' => $user->ID,
            )
        )
    );
    
    // If JWT plugin is installed, use it
    if (function_exists('JWT::encode')) {
        return \Firebase\JWT\JWT::encode($payload, $secret_key, 'HS256');
    }
    
    // Simple fallback token
    return base64_encode(json_encode($payload));
}

/**
 * Decode JWT Token
 */
function zdravei_decode_jwt_token($token) {
    $secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : 'your-secret-key-here';
    
    try {
        // If JWT plugin is installed, use it
        if (function_exists('JWT::decode')) {
            $decoded = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($secret_key, 'HS256'));
            return $decoded;
        }
        
        // Simple fallback
        $decoded = json_decode(base64_decode($token));
        
        if (!$decoded || !isset($decoded->data->user->id)) {
            return new WP_Error('invalid_token', 'Невалиден токен', array('status' => 401));
        }
        
        // Check expiration
        if (isset($decoded->exp) && $decoded->exp < time()) {
            return new WP_Error('expired_token', 'Изтекъл токен', array('status' => 401));
        }
        
        return $decoded;
        
    } catch (Exception $e) {
        return new WP_Error('token_error', $e->getMessage(), array('status' => 401));
    }
}

// ============================================
// 4. CORS SUPPORT
// ============================================

/**
 * Enable CORS for REST API
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');
        
        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
        
        return $value;
    });
}, 15);


