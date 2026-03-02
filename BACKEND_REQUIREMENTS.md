# Backend Requirements - WordPress Custom Endpoint

## ⚠️ ВАЖНО: Backend Field Mapping

### Frontend изпраща полетата по ДВА начина:

Frontend изпраща и двата варианта на полетата за съвместимост:

```javascript
{
  // Вариант 1: Без префикс
  "birth_year": "1985",
  "gender": "male",
  "city": "София",
  "current_conditions": "диабет",
  "current_medications": "метформин",
  "smoking_status": "never",
  "additional_info": "...",
  
  // Вариант 2: С acf_ префикс
  "acf_birth_year": "1985",
  "acf_gender": "male",
  "acf_city": "София",
  "acf_current_diseases": "диабет",
  "acf_current_medications": "метформин",
  "acf_smoking_status": "never",
  "acf_additional_health_info": "..."
}
```

### Backend трябва да запише данните в ACF полета:

В `/wp-json/zdravei/v1/update-profile` endpoint-а трябва да се записват:
- `acf_phone_number` (от `phone` или `acf_phone_number`)
- `acf_birth_year` (от `birth_year` или `acf_birth_year`)
- `acf_gender` (от `gender` или `acf_gender`)
- `acf_city` (от `city` або `acf_city`)
- `acf_current_diseases` (от `current_conditions` или `acf_current_diseases`)
- `acf_current_medications` (от `current_medications` или `acf_current_medications`)
- `acf_smoking_status` (от `smoking_status` или `acf_smoking_status`)
- `acf_additional_health_info` (от `additional_info` или `acf_additional_health_info`)

## ⚠️ КРИТИЧНО: Нужен нов Backend Endpoint

### Endpoint: `/wp-json/zdravei/v1/create-application`

**Method:** POST  
**Authentication:** X-Auth-Token header

**Статус:** ❌ **НЕ СЪЩЕСТВУВА ОЩЕ** - трябва да се създаде на WordPress

#### Временно решение (в момента):
Frontend използва съществуващия endpoint `/zdravei/v1/clinical-trial-inquiry` който:
- Обновява User Profile ✅
- Изпраща имейл уведомление ✅
- **НЕ** създава Applications CPT ❌

#### Request Payload:
```json
{
  "applicant_id": 123,
  "target_study_id": 456,
  "first_name": "Иван",
  "last_name": "Петров",
  "phone": "+359 888 123 456",
  "birth_year": "1985",
  "gender": "male",
  "city": "София",
  "current_diseases": "диабет тип 2",
  "current_medications": "метформин",
  "smoking_status": "never",
  "additional_health_info": "Допълнителна информация..."
}
```

#### Backend Implementation (PHP - functions.php или custom plugin):

```php
add_action('rest_api_init', function () {
    register_rest_route('zdravei/v1', '/create-application', array(
        'methods' => 'POST',
        'callback' => 'create_clinical_application',
        'permission_callback' => function($request) {
            $token = $request->get_header('X-Auth-Token');
            return validate_custom_token($token); // Your token validation function
        }
    ));
});

function create_clinical_application($request) {
    $params = $request->get_json_params();
    
    // Validate required fields
    if (empty($params['applicant_id'])) {
        return new WP_Error('missing_applicant', 'Applicant ID is required', array('status' => 400));
    }
    
    // Create the post
    $post_data = array(
        'post_title'    => sprintf(
            'Кандидатура - %s %s - %s',
            $params['first_name'],
            $params['last_name'],
            date('d.m.Y')
        ),
        'post_type'     => 'applications',
        'post_status'   => 'publish',
        'post_author'   => $params['applicant_id']
    );
    
    $post_id = wp_insert_post($post_data);
    
    if (is_wp_error($post_id)) {
        return new WP_Error('creation_failed', 'Failed to create application', array('status' => 500));
    }
    
    // Update ACF fields
    update_field('acf_applicant_id', $params['applicant_id'], $post_id);
    update_field('acf_target_study_id', $params['target_study_id'] ?? 0, $post_id);
    
    // Medical snapshot fields
    if (!empty($params['phone'])) {
        update_field('acf_phone_number', $params['phone'], $post_id);
    }
    if (!empty($params['birth_year'])) {
        update_field('acf_birth_year', $params['birth_year'], $post_id);
    }
    if (!empty($params['gender'])) {
        update_field('acf_gender', $params['gender'], $post_id);
    }
    if (!empty($params['city'])) {
        update_field('acf_city', $params['city'], $post_id);
    }
    if (!empty($params['current_diseases'])) {
        update_field('acf_current_diseases', $params['current_diseases'], $post_id);
    }
    if (!empty($params['current_medications'])) {
        update_field('acf_current_medications', $params['current_medications'], $post_id);
    }
    if (!empty($params['smoking_status'])) {
        update_field('acf_smoking_status', $params['smoking_status'], $post_id);
    }
    if (!empty($params['additional_health_info'])) {
        update_field('acf_additional_health_info', $params['additional_health_info'], $post_id);
    }
    
    return array(
        'success' => true,
        'message' => 'Application created successfully',
        'application_id' => $post_id,
        'data' => array(
            'id' => $post_id,
            'title' => get_the_title($post_id),
            'status' => get_post_status($post_id)
        )
    );
}
```

## ACF Field Groups Setup

### 1. User Profile ACF Fields (User Meta)
Field Group Name: "User Health Profile"  
Location: User Form

**Fields:**
- `acf_phone_number` (Text)
- `acf_birth_year` (Number)
- `acf_gender` (Select: male, female, other, prefer_not_to_say)
- `acf_city` (Text)
- `acf_current_diseases` (Text/Textarea)
- `acf_current_medications` (Text/Textarea)
- `acf_smoking_status` (Select: never, former, current, occasional)
- `acf_additional_health_info` (Textarea)
- `acf_therapeutic_area` (Text) - Терапевтична област на интерес (от регистрация)
- `disease` (Text) - Конкретно заболяване (опционално, от регистрация)

### 2. Applications CPT ACF Fields
Field Group Name: "Application Details"  
Location: Post Type = applications

**Fields:**
- `acf_applicant_id` (Number) - ID на потребителя
- `acf_target_study_id` (Number) - ID на клиничното проучване
- `acf_phone_number` (Text) - Snapshot
- `acf_birth_year` (Number) - Snapshot
- `acf_gender` (Select) - Snapshot
- `acf_city` (Text) - Snapshot
- `acf_current_diseases` (Textarea) - Snapshot
- `acf_current_medications` (Textarea) - Snapshot
- `acf_smoking_status` (Select) - Snapshot
- `acf_additional_health_info` (Textarea) - Snapshot

## Custom Post Type Registration

```php
function register_applications_cpt() {
    $args = array(
        'labels' => array(
            'name' => 'Applications',
            'singular_name' => 'Application',
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'author', 'custom-fields'),
        'menu_icon' => 'dashicons-clipboard',
    );
    
    register_post_type('applications', $args);
}
add_action('init', 'register_applications_cpt');
```

## Export Functions

### Export by User (Latest Profile Data)
```php
function export_users_with_medical_data() {
    $users = get_users(array('role' => 'site_member'));
    
    $export_data = array();
    foreach ($users as $user) {
        $export_data[] = array(
            'ID' => $user->ID,
            'Email' => $user->user_email,
            'First Name' => $user->first_name,
            'Last Name' => $user->last_name,
            'Phone' => get_field('acf_phone_number', 'user_' . $user->ID),
            'Birth Year' => get_field('acf_birth_year', 'user_' . $user->ID),
            'Gender' => get_field('acf_gender', 'user_' . $user->ID),
            'City' => get_field('acf_city', 'user_' . $user->ID),
            'Current Diseases' => get_field('acf_current_diseases', 'user_' . $user->ID),
            'Current Medications' => get_field('acf_current_medications', 'user_' . $user->ID),
            'Smoking Status' => get_field('acf_smoking_status', 'user_' . $user->ID),
            'Additional Info' => get_field('acf_additional_health_info', 'user_' . $user->ID),
        );
    }
    
    return $export_data;
}
```

### Export by Applications (Historical Snapshots)
```php
function export_applications_with_snapshots() {
    $applications = get_posts(array(
        'post_type' => 'applications',
        'posts_per_page' => -1
    ));
    
    $export_data = array();
    foreach ($applications as $app) {
        $export_data[] = array(
            'Application ID' => $app->ID,
            'Date' => $app->post_date,
            'Applicant ID' => get_field('acf_applicant_id', $app->ID),
            'Target Study ID' => get_field('acf_target_study_id', $app->ID),
            // Snapshot data at time of application
            'Phone' => get_field('acf_phone_number', $app->ID),
            'Birth Year' => get_field('acf_birth_year', $app->ID),
            'Gender' => get_field('acf_gender', $app->ID),
            'City' => get_field('acf_city', $app->ID),
            'Current Diseases' => get_field('acf_current_diseases', $app->ID),
            'Current Medications' => get_field('acf_current_medications', $app->ID),
            'Smoking Status' => get_field('acf_smoking_status', $app->ID),
            'Additional Info' => get_field('acf_additional_health_info', $app->ID),
        );
    }
    
    return $export_data;
}
```

## Notes

1. Custom endpoint `/zdravei/v1/create-application` трябва да създава нов post от тип "applications"
2. Backend обработва mapping-а на полетата към ACF
3. User Profile данните се записват чрез съществуващия `/zdravei/v1/update-profile` endpoint
4. Snapshot данните в Applications позволяват проследяване на промени във времето
