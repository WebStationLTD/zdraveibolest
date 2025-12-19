<?php
/**
 * ПЪЛЕН REGISTER ENDPOINT ЗА ZDRAVEIBOLEST
 * 
 * Този код трябва да се добави в functions.php на WordPress темата.
 * Ако вече имаш register endpoint, замени го с този.
 * 
 * Поддържа:
 * - role параметър (site_member)
 * - phone параметър
 * - disease параметър
 * - therapeutic_area параметър
 * - Автоматичен login след регистрация (връща token)
 * - Bypass за JWT Authentication плъгина
 */

// ============================================
// 0. BYPASS JWT AUTHENTICATION PLUGIN
// ============================================

// Whitelist нашите custom endpoints от JWT плъгина
add_filter('jwt_auth_whitelist', function($endpoints) {
    $endpoints[] = '/wp-json/zdravei/v1/register';
    $endpoints[] = '/wp-json/zdravei/v1/login';
    $endpoints[] = '/wp-json/zdravei/v1/validate';
    $endpoints[] = '/wp-json/zdravei/v1/update-profile';
    $endpoints[] = '/wp-json/zdravei/v1/clinical-trial-inquiry';
    return $endpoints;
});

// ============================================
// 1. РЕГИСТРАЦИЯ НА SITE_MEMBER РОЛЯ
// ============================================

function zdravei_register_site_member_role() {
    // Добавяме ролята само ако не съществува
    if (!get_role('site_member')) {
        add_role(
            'site_member',
            'Member',
            array(
                'read' => true,
                'level_0' => true,
            )
        );
    }
}
add_action('init', 'zdravei_register_site_member_role');

// ============================================
// 2. REGISTER ENDPOINT
// ============================================

function zdravei_register_endpoints() {
    // Register endpoint
    register_rest_route('zdravei/v1', '/register', array(
        'methods' => 'POST',
        'callback' => 'zdravei_register_user_callback',
        'permission_callback' => '__return_true', // Публичен достъп
    ));
    
    // Login endpoint
    register_rest_route('zdravei/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'zdravei_login_user_callback',
        'permission_callback' => '__return_true',
    ));
    
    // Validate token endpoint
    register_rest_route('zdravei/v1', '/validate', array(
        'methods' => 'POST',
        'callback' => 'zdravei_validate_token_callback',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'zdravei_register_endpoints');

/**
 * Register new user callback
 */
function zdravei_register_user_callback($request) {
    $params = $request->get_json_params();
    
    // Валидация на задължителни полета
    if (empty($params['username'])) {
        return new WP_Error('missing_username', 'Потребителското име е задължително', array('status' => 400));
    }
    if (empty($params['email'])) {
        return new WP_Error('missing_email', 'Имейлът е задължителен', array('status' => 400));
    }
    if (empty($params['password'])) {
        return new WP_Error('missing_password', 'Паролата е задължителна', array('status' => 400));
    }
    
    // Проверка дали потребителят вече съществува
    if (username_exists($params['username'])) {
        return new WP_Error('username_exists', 'Това потребителско име вече е заето', array('status' => 400));
    }
    if (email_exists($params['email'])) {
        return new WP_Error('email_exists', 'Този имейл вече е регистриран', array('status' => 400));
    }
    
    // Определяме ролята (по подразбиране site_member)
    $role = 'site_member';
    if (!empty($params['role']) && in_array($params['role'], array('site_member', 'subscriber'))) {
        $role = $params['role'];
    }
    
    // Създаваме потребителя
    $user_data = array(
        'user_login' => sanitize_user($params['username']),
        'user_email' => sanitize_email($params['email']),
        'user_pass' => $params['password'],
        'role' => $role,
    );
    
    // Добавяме first_name и last_name ако са подадени
    if (!empty($params['first_name'])) {
        $user_data['first_name'] = sanitize_text_field($params['first_name']);
    }
    if (!empty($params['last_name'])) {
        $user_data['last_name'] = sanitize_text_field($params['last_name']);
    }
    
    $user_id = wp_insert_user($user_data);
    
    if (is_wp_error($user_id)) {
        return new WP_Error('registration_failed', $user_id->get_error_message(), array('status' => 400));
    }
    
    // Запазваме допълнителни мета полета
    if (!empty($params['phone'])) {
        update_user_meta($user_id, 'phone', sanitize_text_field($params['phone']));
    }
    if (!empty($params['disease'])) {
        update_user_meta($user_id, 'disease', sanitize_text_field($params['disease']));
    }
    if (!empty($params['therapeutic_area'])) {
        update_user_meta($user_id, 'therapeutic_area', sanitize_text_field($params['therapeutic_area']));
    }
    
    // Записваме дата на регистрация
    update_user_meta($user_id, 'registration_date', current_time('mysql'));
    update_user_meta($user_id, 'registration_source', 'frontend');
    
    // Генерираме JWT токен за автоматичен login
    $token = zdravei_generate_jwt_token($user_id);
    
    // Връщаме успех с token и user данни
    $user = get_userdata($user_id);
    
    return array(
        'success' => true,
        'message' => 'Регистрацията е успешна',
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'user_id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'user_email' => $user->user_email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'display_name' => $user->display_name,
            'role' => $role,
            'phone' => get_user_meta($user_id, 'phone', true),
            'disease' => get_user_meta($user_id, 'disease', true),
            'therapeutic_area' => get_user_meta($user_id, 'therapeutic_area', true),
        ),
    );
}

/**
 * Login user callback
 */
function zdravei_login_user_callback($request) {
    $params = $request->get_json_params();
    
    if (empty($params['username']) || empty($params['password'])) {
        return new WP_Error('missing_credentials', 'Потребителско име и парола са задължителни', array('status' => 400));
    }
    
    // Опит за login
    $user = wp_authenticate($params['username'], $params['password']);
    
    if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'Грешно потребителско име или парола', array('status' => 401));
    }
    
    // Генерираме JWT токен
    $token = zdravei_generate_jwt_token($user->ID);
    
    return array(
        'success' => true,
        'token' => $token,
        'user' => array(
            'id' => $user->ID,
            'user_id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'user_email' => $user->user_email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'display_name' => $user->display_name,
            'role' => implode(', ', $user->roles),
            'phone' => get_user_meta($user->ID, 'phone', true),
            'birth_year' => get_user_meta($user->ID, 'birth_year', true),
            'gender' => get_user_meta($user->ID, 'gender', true),
            'city' => get_user_meta($user->ID, 'city', true),
            'current_conditions' => get_user_meta($user->ID, 'current_conditions', true),
            'current_medications' => get_user_meta($user->ID, 'current_medications', true),
            'smoking_status' => get_user_meta($user->ID, 'smoking_status', true),
            'disease' => get_user_meta($user->ID, 'disease', true),
            'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
            'profile_completed' => get_user_meta($user->ID, 'profile_completed', true),
        ),
    );
}

/**
 * Validate token callback
 */
function zdravei_validate_token_callback($request) {
    // Взимаме Authorization header
    $auth_header = $request->get_header('Authorization');
    
    if (empty($auth_header)) {
        return new WP_Error('no_token', 'Липсва токен за автентикация', array('status' => 401));
    }
    
    // Извличаме токена от "Bearer TOKEN"
    $token = str_replace('Bearer ', '', $auth_header);
    
    // Валидираме токена
    $user_id = zdravei_validate_jwt_token($token);
    
    if (!$user_id) {
        return new WP_Error('invalid_token', 'Невалиден или изтекъл токен', array('status' => 401));
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
        'user_email' => $user->user_email,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'firstName' => $user->first_name,
        'lastName' => $user->last_name,
        'display_name' => $user->display_name,
        'role' => implode(', ', $user->roles),
        'phone' => get_user_meta($user->ID, 'phone', true),
        'birth_year' => get_user_meta($user->ID, 'birth_year', true),
        'gender' => get_user_meta($user->ID, 'gender', true),
        'city' => get_user_meta($user->ID, 'city', true),
        'current_conditions' => get_user_meta($user->ID, 'current_conditions', true),
        'current_medications' => get_user_meta($user->ID, 'current_medications', true),
        'smoking_status' => get_user_meta($user->ID, 'smoking_status', true),
        'disease' => get_user_meta($user->ID, 'disease', true),
        'therapeutic_area' => get_user_meta($user->ID, 'therapeutic_area', true),
        'profile_completed' => get_user_meta($user->ID, 'profile_completed', true),
    );
}

// ============================================
// 3. JWT TOKEN ФУНКЦИИ (ПРОСТИ, БЕЗ БИБЛИОТЕКА)
// ============================================

/**
 * Генерира JWT токен (стандартен 3-сегментен формат)
 */
if (!function_exists('zdravei_generate_jwt_token')) {
    function zdravei_generate_jwt_token($user_id) {
        $secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : 'zdravei-secret-key-change-this';
        
        $issued_at = time();
        $expiration = $issued_at + (60 * 60 * 24 * 30); // 30 дни валидност
        
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'iss' => get_bloginfo('url'),
            'iat' => $issued_at,
            'exp' => $expiration,
            'user_id' => $user_id,
            // Добавяме и формата на JWT плъгина за съвместимост
            'data' => [
                'user' => [
                    'id' => $user_id
                ]
            ]
        ]);
        
        $base64_header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64_payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        
        $signature = hash_hmac('sha256', $base64_header . '.' . $base64_payload, $secret_key, true);
        $base64_signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        return $base64_header . '.' . $base64_payload . '.' . $base64_signature;
    }
}

/**
 * Валидира JWT токен - поддържа два формата:
 * 1. Стандартен 3-сегментен JWT (header.payload.signature)
 * 2. 1-сегментен base64 payload (от JWT Authentication плъгина)
 */
if (!function_exists('zdravei_validate_jwt_token')) {
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
}

// ============================================
// 4. ДОБАВЯНЕ НА JWT_AUTH_SECRET_KEY В wp-config.php
// ============================================
/*
 * ВАЖНО: Добави този ред в wp-config.php (преди "That's all, stop editing!"):
 * 
 * define('JWT_AUTH_SECRET_KEY', 'твой-уникален-секретен-ключ-тук-123456789');
 * 
 * Можеш да генерираш ключ от: https://api.wordpress.org/secret-key/1.1/salt/
 */

?>

