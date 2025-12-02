# 🔐 ИНСТРУКЦИИ ЗА НАСТРОЙКА НА AUTHENTICATION SYSTEM

## ВАЖНО! ПРОЧЕТИ ВНИМАТЕЛНО! ⚠️

Това е пълна система за регистрация и ограничаване на съдържание. Следвай стъпките внимателно!

---

## 📋 СТЪПКА 1: WordPress Plugin - JWT Authentication

### 1.1. Инсталирай JWT Authentication Plugin

1. Влез в WordPress Admin
2. Отиди на **Plugins → Add New**
3. Търси: **"JWT Authentication for WP REST API"**
4. Инсталирай plugin-а от **Useful Team**
5. **Активирай** plugin-а

### 1.2. Конфигурирай JWT Secret Key

Отвори `wp-config.php` файла (в root папката на WordPress) и добави **ПРЕДИ** реда `/* That's all, stop editing! Happy publishing. */`:

```php
// JWT Authentication Secret Key
define('JWT_AUTH_SECRET_KEY', 'твой-супер-секретен-ключ-тук-минимум-32-символа');
define('JWT_AUTH_CORS_ENABLE', true);
```

**ВАЖНО:** Промени `твой-супер-секретен-ключ-тук` с **уникален случаен низ** минимум 32 символа!

Можеш да генерираш random ключ от: https://api.wordpress.org/secret-key/1.1/salt/

---

## 📋 СТЪПКА 2: Добави Custom Code във functions.php

### 2.1. Отвори functions.php

1. В WordPress Admin отиди на: **Appearance → Theme File Editor**
2. От дясно избери **Theme Functions (functions.php)**

**ИЛИ**

1. Използвай FTP/cPanel File Manager
2. Отиди на: `/wp-content/themes/твоята-тема/functions.php`

### 2.2. Копирай кода

1. Отвори файла: `wordpress-setup/functions-code.php`
2. **КОПИРАЙ ЦЕЛИЯ КОД** (без `<?php` тага в началото ако functions.php вече има `<?php`)
3. **ЗАЛЕПИ В КРАЯ** на твоя `functions.php` файл
4. **ЗАПАЗИ** файла

---

## 📋 СТЪПКА 3: Настрой CORS (Ако е нужно)

Ако при тестване получиш CORS грешки в конзолата, добави това в `.htaccess` файла (в root папката на WordPress):

```apache
# CORS Headers for REST API
<IfModule mod_headers.c>
    SetEnvIf Origin "^http(s)?://(.+\.)?(zdraveibolest\.vercel\.app|localhost:3000)$" AccessControlAllowOrigin=$0
    Header set Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Authorization, Content-Type, X-WP-Nonce"
    Header set Access-Control-Allow-Credentials "true"
</IfModule>
```

---

## 📋 СТЪПКА 4: Environment Variables (.env.local)

Провери че имаш правилен `.env.local` файл в root папката на Next.js проекта:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://zdraveibolest.admin-panels.com/wp-json/wp/v2
```

---

## 📋 СТЪПКА 5: Test Registration Flow

### 5.1. Стартирай Next.js проекта

```bash
npm run dev
```

### 5.2. Тествай регистрацията

1. Отвори: `http://localhost:3000/register`
2. Попълни формата (избери терапевтична област!)
3. Натисни "Регистрирай се"
4. Трябва да видиш: "Регистрацията е успешна!"

### 5.3. Провери в WordPress Admin

1. Влез в WordPress Admin
2. Отиди на: **Users → All Users**
3. Трябва да видиш новия потребител
4. Кликни **Edit** на потребителя
5. Скролни надолу до **"Информация за здраве"**
6. Трябва да видиш избраната терапевтична област

---

## 📋 СТЪПКА 6: Test Protected Content

### 6.1. Test като GUEST (нерегистриран)

1. Отвори: `http://localhost:3000/terapevtichni-oblasti/pulmologia`
2. Трябва да видиш:
   - ✅ Първите ~450px от съдържанието
   - ✅ Gradient blur overlay
   - ✅ "Регистрирай се за пълен достъп" бокс

### 6.2. Test като LOGGED IN (регистриран)

1. Регистрирай се или влез: `http://localhost:3000/login`
2. Отиди на: `http://localhost:3000/terapevtichni-oblasti/pulmologia`
3. Трябва да видиш:
   - ✅ ПЪЛНОТО съдържание (без ограничение)
   - ✅ БЕЗ "Регистрирай се" бокс

---

## 🎉 ГОТОВО!

Ако всичко работи правилно, системата е готова!

### Какво имаме:

✅ Пълна регистрационна система  
✅ Login/Logout функционалност  
✅ JWT authentication  
✅ Protected content (400-500px preview)  
✅ Custom user meta (therapeutic_area)  
✅ Динамичен избор на терапевтични области

---

## 🐛 Troubleshooting

### Грешка: "Registration failed"

- Провери че JWT plugin-ът е активиран
- Провери че `JWT_AUTH_SECRET_KEY` е дефиниран в `wp-config.php`
- Провери че custom endpoints са регистрирани (`/wp-json/zdravei/v1/register`)

### Грешка: CORS errors

- Добави CORS headers в `.htaccess` (виж Стъпка 3)
- Провери че `JWT_AUTH_CORS_ENABLE` е `true` в `wp-config.php`

### Грешка: "Token validation failed"

- Изтрий localStorage в браузъра (F12 → Application → Local Storage → Clear)
- Login отново

### Protected content не работи

- Провери че си logged in (виж в конзолата: `isAuthenticated: true`)
- Изчисти кеша на браузъра
- Рестартирай Next.js dev сървъра

---

## 📞 Контакт

Ако имаш проблеми, провери:

1. WordPress error log
2. Browser console (F12)
3. Next.js terminal output

Успех! 🚀
