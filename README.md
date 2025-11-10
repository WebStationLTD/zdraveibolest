This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# SEO и Performance Оптимизации

Този проект включва множество оптимизации за SEO и производителност, които подобряват скоростта на зареждане и видимостта в търсачките:

## Performance Оптимизации

1. **Кеширане на данни**:

   - Използване на `cache` функцията от React за всички API заявки
   - Добавяне на `revalidate` параметър за Incremental Static Regeneration (ISR) с продължителност от 3600 секунди (1 час)

2. **Динамично зареждане на компоненти**:

   - Използване на `next/dynamic` за разделяне на кода (code splitting)
   - Lazy loading на компоненти, които не са необходими за първоначалното рендериране
   - Приоритетно зареждане само на компонентите във видимата част

3. **Оптимизация на изображения**:

   - Използване на `fetchPriority="high"` за LCP (Largest Contentful Paint) изображения
   - Зареждане на различни размери изображения според устройството чрез `<link rel="preload">` с `media` атрибут
   - Lazy loading за изображения извън видимата част на екрана
   - Използване на формат WebP за по-малък размер на файловете
   - Задаване на декодиране на изображения с `decoding="async"` за незабавно показване на страницата

4. **Оптимизация за първоначално зареждане**:

   - Критичен CSS вграден директно в `<head>` за моментално прилагане на стилове
   - Предварително зареждане на критични ресурси чрез `<link rel="preconnect">` и `<link rel="dns-prefetch">`
   - Отлагане на незадължителни скриптове с `strategy="afterInteractive"`

5. **Използване на Suspense и IntersectionObserver**:
   - Fallback UI по време на зареждане на компоненти за по-добро потребителско изживяване
   - Мониторинг и зареждане на съдържание само когато то е във видимата част на екрана

## SEO Оптимизации

1. **Метаданни**:

   - Добавяне на подробни заглавия и описания за всяка страница
   - Добавяне на ключови думи, специфични за всяка страница
   - Оптимизирани Open Graph метаданни за споделяне в социални мрежи

2. **Schema.org структурирани данни**:

   - Добавяне на JSON-LD за услуги, описващи съдържанието им семантично
   - Структурирани данни за организацията и списъка с услуги
   - Включване на информация за предлагания, описания и връзки

3. **Езикови оптимизации**:

   - Добавяне на `lang="bg"` и поддръжка за кирилица в шрифтовете
   - Използване на `locale: "bg_BG"` в метаданните

4. **Технически SEO**:
   - Канонични URL адреси
   - Оптимизирани robot метаданни за търсачките
   - Правилно задаване на заглавия и описания на страниците

## Мониторинг на Web Vitals

- Добавяне на компонент `WebVitals` за следене на метрики като LCP, FID и CLS
- Изпращане на данни към Google Analytics за анализ на производителността
- Ръчно измерване и запис на метрики за производителност

Тези оптимизации значително подобряват потребителското изживяване, скоростта на зареждане и SEO класирането на сайта в търсачките.
