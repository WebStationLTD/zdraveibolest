<?php
/**
 * ZDRAVEI_UPDATE_PROFILE_CALLBACK - DEBUG VERSION
 * Копирай това и замени функцията във functions.php
 */

function zdravei_update_profile_callback($request) {
    error_log('=== UPDATE PROFILE START ===');
    
    $params = $request->get_json_params();
    error_log('Received params: ' . print_r($params, true));
    
    // Взимаме токена от custom header X-Auth-Token
    $token = $request->get_header('X-Auth-Token');
    error_log('Token: ' . ($token ? 'EXISTS' : 'NULL'));
    
    if (empty($token)) {
        error_log('ERROR: No token provided');
        return new WP_Error('no_token', 'Липсва токен за автентикация', array('status' => 401));
    }
    
    $decoded = zdravei_decode_jwt_token($token);
    if (is_wp_error($decoded)) {
        error_log('ERROR: Token decode failed - ' . $decoded->get_error_message());
        return $decoded;
    }
    
    $user_id = zdravei_get_user_id_from_token($decoded);
    error_log('User ID from token: ' . $user_id);
    
    if (!$user_id) {
        error_log('ERROR: No user_id in token');
        return new WP_Error('no_user_id', 'Не е намерен user_id в токена', array('status' => 401));
    }
    
    $current_user = get_userdata($user_id);
    if (!$current_user) {
        error_log('ERROR: User not found - ID: ' . $user_id);
        return new WP_Error('invalid_user', 'Потребителят не е намерен', array('status' => 404));
    }
    
    error_log('Current user: ' . $current_user->user_login);
    
    // Update basic user info
    $user_data = array('ID' => $user_id);
    if (isset($params['first_name'])) {
        $user_data['first_name'] = sanitize_text_field($params['first_name']);
        error_log('Setting first_name: ' . $user_data['first_name']);
    }
    if (isset($params['last_name'])) {
        $user_data['last_name'] = sanitize_text_field($params['last_name']);
        error_log('Setting last_name: ' . $user_data['last_name']);
    }
    
    $update_result = wp_update_user($user_data);
    if (is_wp_error($update_result)) {
        error_log('ERROR: wp_update_user failed - ' . $update_result->get_error_message());
        return $update_result;
    }
    error_log('wp_update_user SUCCESS');
    
    // Update custom meta fields
    $meta_fields = array('phone', 'birth_year', 'gender', 'city', 'current_conditions', 'current_medications', 'smoking_status', 'additional_info', 'disease', 'therapeutic_area');
    foreach ($meta_fields as $field) {
        if (isset($params[$field])) {
            $value = sanitize_text_field($params[$field]);
            $result = update_user_meta($user_id, $field, $value);
            error_log("update_user_meta({$field}): {$value} - Result: " . ($result ? 'SUCCESS' : 'FAILED'));
        }
    }
    
    // Mark profile as completed
    update_user_meta($user_id, 'profile_completed', true);
    update_user_meta($user_id, 'profile_completed_date', current_time('mysql'));
    error_log('Profile marked as completed');
    
    $user = get_userdata($user_id);
    
    $response = array(
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
            'profile_completed' => true,
        ),
    );
    
    error_log('Response: ' . print_r($response, true));
    error_log('=== UPDATE PROFILE END ===');
    
    return $response;
}

