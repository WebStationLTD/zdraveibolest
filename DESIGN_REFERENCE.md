# Design Reference - Zdraveibolest.bg

## Цветова палитра

### Основни цветове
- **Teal Primary (Тюркоазен)**: `#178D9D`
  - Използван за: Hero секция фон, CTA бутони (border), ховър ефекти
  
- **Teal Dark (Тъмен циан)**: `#0F5F6B`
  - Използван за: Stats секция фон
  
- **Orange Primary (Оранжев)**: `#FF9642`
  - Използван за: Основни CTA бутони, декоративни елементи
  
- **Orange Hover (Оранжев ховър)**: `#FF8C42`
  - Използван за: Hover състояния на оранжевите бутони

## Типография

### Шрифт
- **Font Family**: Lora (Google Fonts)
- **Weights**: 400 (normal), 500, 600, 700 (bold)
- **Styles**: normal, italic
- **Cyrillic**: Включена поддръжка за кирилица
- **Display**: swap (за оптимизация на производителността)
- **Fallback**: Georgia, serif

### Размери
- **Hero заглавие**: 
  - Mobile: 2xl (text-2xl)
  - Tablet: 4xl (text-4xl)
  - Desktop: 2.75rem (text-[2.75rem])

- **Stats числа**: 
  - Mobile: 4xl (text-4xl)
  - Tablet: 5xl (text-5xl)
  - Desktop: 6xl (text-6xl)

## Структура и отстояния

### Контейнери
- **Desktop (≥768px)**: 80% широчина
- **Mobile (<768px)**: 95% широчина

### Секции отстояния
- **Horizontal padding**: 20px (px-5)
- **Vertical spacing**: Различно за всяка секция

### Заоблени ъгли (Border Radius)
- **Mobile**: rounded-2xl (16px)
- **Desktop**: rounded-3xl (24px)

## Компоненти

### 1. Header (Navigation)
- **Височина**: 80px (h-20)
- **Layout**: 
  - Лого вляво
  - Меню в центъра (скрито на мобилни)
  - CTA бутон вдясно (скрит на мобилни)
- **Sticky**: Залепва се отгоре при скролване

### 2. Hero Section
- **Background**: #178D9D
- **Min Height**: 
  - Mobile: 500px
  - Desktop: 600px
- **Layout**: Grid (1 колона на мобилни, 2 колони на десктоп)
- **Декоративни елементи**: 
  - Концентрични кръгове (долу вляво)
  - Растително лого (горе вдясно)
- **Контактна форма**: Позиционирана отляво (само десктоп)

### 3. Stats Section
- **Background**: #0F5F6B
- **Layout**: Grid
  - Mobile: 1 колона
  - Tablet: 2 колони
  - Desktop: 4 колони
- **Разделители**: Вертикални линии между колоните (само десктоп)

## Responsive Breakpoints

- **Mobile**: < 768px (95% контейнер)
- **Tablet**: ≥ 768px
- **Desktop**: ≥ 1024px (80% контейнер)
- **Large Desktop**: ≥ 1280px

## SEO оптимизация

### Шрифтове
- **Font Display**: swap (намалява CLS - Cumulative Layout Shift)
- **Preload**: Активиран
- **Fallback fonts**: Дефинирани (Georgia, serif)

### Изображения
- **Format**: AVIF и WebP
- **Loading**: eager за hero изображения, lazy за останалите
- **Alt tags**: Задължителни за всички изображения

## Забележки

- Всички текстове в трите секции (Header, Hero, Stats) започват от една вертикална линия
- Декоративните SVG елементи са оптимизирани за по-малка прозрачност на мобилни устройства
- Контактната форма се показва само на десктоп устройства (≥1024px)

