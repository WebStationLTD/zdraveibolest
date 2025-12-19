<?php
/**
 * ОПРАВЕНА ВЕРСИЯ на zdravei_add_custom_user_fields
 * Копирай това и замени функцията във functions.php
 */

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

