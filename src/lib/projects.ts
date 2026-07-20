export type ProjectStatus = "shipped" | "concept";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  accent: string; // hex, used for the per-project theme accent
  accentDim: string;
  role: string;
  stack: string[];
  summary: string;
  problem: string;
  solution: string;
  security?: string;
  results: string;
  // Real, working page to click through to - only set for genuinely shipped demos
  // (never for concept cases, so a live link never implies more reality than exists).
  demoHref?: string;
  // Real screenshots of the actual running project, browsable in the overlay gallery.
  // Only set for "shipped" projects - concept cases fall back to the single abstract
  // ProjectVisual, since there is no real product to screenshot honestly.
  images?: string[];
};

export const projects: Project[] = [
  {
    slug: "bonus-shop",
    title: "Bonus Shop",
    tagline: "3D-печать на заказ с оформлением заказа через WhatsApp",
    status: "shipped",
    accent: "#f97316",
    accentDim: "#c2410c",
    role: "Студия: архитектура, бэкенд, фронтенд",
    stack: [
      "Next.js 16 (App Router)",
      "TypeScript",
      "Prisma + PostgreSQL/SQLite",
      "Tailwind CSS v4",
      "Zustand",
      "TanStack Query",
      "React Three Fiber",
      "Framer Motion",
    ],
    summary:
      "Магазин 3D-печати на заказ: физические напечатанные изделия и приватные цифровые модели (STL/OBJ/3MF). Без онлайн-оплаты: корзина собирает сообщение и открывает диалог в WhatsApp с менеджером.",
    problem:
      "Клиенту нужен был витринный каталог с быстрой конверсией в заявку, без сложностей эквайринга и без хранения платежных данных, ведь целевая аудитория привыкла договариваться в WhatsApp.",
    solution:
      "Next.js 16 + Prisma поверх Postgres-совместимой схемы (портируемая с SQLite для разработки), каталог с фильтрами и пагинацией, 3D-хиро с react-three-fiber с graceful-деградацией до статичной картинки при reduced-motion, темная/светлая тема без мигания через next-themes.",
    security:
      "Цифровые файлы (`storage/models`) физически не раздаются статикой, только через приватный путь с проверкой доступа. Это закрывает очевидный вектор: раздать прямую ссылку на файл.",
    results:
      "Рабочий MVP: каталог, карточка товара, корзина, оформление в WhatsApp. Готов к продакшн-деплою (Docker + docker-compose в комплекте).",
    images: [
      "/screenshots/bonus-shop/01-home.png",
      "/screenshots/bonus-shop/02-catalog.png",
      "/screenshots/bonus-shop/03-product.png",
      "/screenshots/bonus-shop/04-cart.png",
    ],
  },
  {
    slug: "techcore",
    title: "TechCore",
    tagline: "Лендинг магазина цифровой техники: премиум-минимализм без 3D",
    status: "shipped",
    accent: "#2563eb",
    accentDim: "#1d4ed8",
    role: "Студия: дизайн, верстка, моушн",
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS v4", "Motion"],
    demoHref: "/demo/techcore",
    summary:
      "Работа студии: магазин техники в инженерной эстетике Nothing и Teenage Engineering. Светлый лист с тонкой сеткой, каталог-таблица с mono-индексами TC-01…TC-06, товар показан габаритным чертежом с размерными линиями. Работает выбор цвета корпуса.",
    problem:
      "Магазины техники соревнуются в глянцевых 3D-рендерах, и в итоге все выглядят одинаково. Покупателю при этом нужны размеры, камера и цена, а их из вращающейся сцены не достать.",
    solution:
      "Продукт показан как чертеж: габаритные линии 158.2 × 74.6 мм, выноска на камеру, спецификация отдельной таблицей с hairline-линейками. Селектор цвета корпуса меняет подпись чертежа и цветовую пробу через обычный React-стейт, без единого вызова WebGL.",
    results:
      "Кликается прямо с этого сайта: каталог с индексами и чертеж вместо рендера переносятся на любой продуктовый лендинг, где важны характеристики, а не глянец.",
    images: ["/screenshots/techcore/01-hero.png", "/screenshots/techcore/02-catalog.png"],
  },
  {
    slug: "pixelforge",
    title: "Pixelforge Studio",
    tagline: "Портфолио-лендинг игровой студии: витрина проектов",
    status: "shipped",
    accent: "#a855f7",
    accentDim: "#7e22ce",
    role: "Студия: дизайн, верстка, моушн",
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS v4", "Motion"],
    demoHref: "/demo/pixelforge",
    summary:
      "Работа студии: игровая студия из Остина в духе Annapurna Interactive. Тикер из названий игр, флагманский постер на всю ширину, каталог собран как нумерованный индекс, где цвет проекта проявляется при наведении. Пресс-цитаты и подписка честно помечены как демо.",
    problem:
      "Портфолио студий часто превращаются в свалку постеров без иерархии: непонятно, какой проект флагманский, какие еще поддерживаются, а какие давно в архиве.",
    solution:
      "Один флагман занимает всю ширину, остальные идут строками нумерованного индекса с крупной типографикой. Цвет каждой игры появляется только на ховере, ритм страницы задает бегущий тикер. Автоплей-видео на странице нет вообще.",
    results:
      "Открывается прямо с этого сайта: связка флагман плюс индекс подходит любому портфолио, где работ меньше десяти и каждой нужен вес.",
    images: ["/screenshots/pixelforge/01-hero.png", "/screenshots/pixelforge/02-grid.png"],
  },
  {
    slug: "uzel",
    title: "Узел",
    tagline: "Маркетплейс хендмейд-товаров с модерацией продавцов",
    status: "shipped",
    accent: "#d97706",
    accentDim: "#b45309",
    role: "Студия: дизайн, верстка, моушн",
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS v4", "Motion"],
    demoHref: "/demo/uzel",
    summary:
      "Работа студии: маркетплейс мастеров из Алматы в теплой Etsy/Flowwow-эстетике. Пастельные плитки товаров с line-art иконками, рукописные подписи продавцов, статус модерации на карточке, работающее избранное со счетчиком в шапке.",
    problem:
      "На хендмейд-площадках продавцы публикуются сами, без видимой проверки. Покупатель не может на глаз отличить мастера с историей от аккаунта, созданного вчера.",
    solution:
      "Продавец и его статус («проверено» / «на модерации») стоят прямо на карточке товара, рядом с ценой. Плюс живые мелочи маркетплейса: избранное на React-стейте, категории-чипсы, блок «Мастер недели» с цитатой.",
    results:
      "Карточка с товаром, продавцом и статусом модерации переносится на любой мультивендорный каталог без переделки данных под капотом.",
    images: ["/screenshots/uzel/01-hero.png", "/screenshots/uzel/02-catalog.png"],
  },
  {
    slug: "dastarkhan",
    title: "Dastarkhan",
    tagline: "Цифровое меню ресторана с бронированием столиков",
    status: "shipped",
    accent: "#be3c28",
    accentDim: "#a5321f",
    role: "Студия: дизайн, верстка, моушн",
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS v4", "Motion"],
    demoHref: "/demo/dastarkhan",
    summary:
      "Работа студии: ресторан казахской кухни в эстетике вечерней бразери: темный холст, один лимонный акцент, editorial-меню тремя колонками с золотыми линейками и шаңырақ гравюрой. Виджет брони работает: гости, время, кнопка активируется после выбора слота.",
    problem:
      "Часть гостей просто не любит звонить. А типичная форма брони с одной датой оставляет вопрос: время-то подтверждено или как повезет?",
    solution:
      "Бронь собирается на самой странице: количество гостей, конкретный слот, кнопка заблокирована, пока слот не выбран. Неполную заявку физически нельзя отправить.",
    results:
      "Виджет брони (число гостей плюс слот) живет отдельно от меню, поэтому переносится в любой ресторанный проект как есть.",
    images: [
      "/screenshots/dastarkhan/01-hero.png",
      "/screenshots/dastarkhan/02-menu.png",
      "/screenshots/dastarkhan/03-booking-filled.png",
    ],
  },
  {
    slug: "fitpulse",
    title: "FitPulse",
    tagline: "Запись на групповые тренировки с живым остатком мест",
    status: "shipped",
    accent: "#ff4d5a",
    accentDim: "#b3202c",
    role: "Студия: дизайн, верстка, моушн",
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS v4", "Motion"],
    demoHref: "/demo/fitpulse",
    summary:
      "Работа студии: boutique-студия из Лос-Анджелеса в красно-черной эстетике Barry's. Расписание сделано таймтейбл-строками: тренер, остаток мест и вкладки «Сегодня/Завтра». Запись и отмена работают, снизу выезжает бар с итогом.",
    problem:
      "Расписание групповых тренировок часто висит статичной картинкой без остатка мест. Гость узнает, что группа набрана, уже в раздевалке.",
    solution:
      "Каждая строка таймтейбла держит счетчик мест и состояние записи в React-стейте. Когда мест не остается, кнопка гаснет и показывает статус «Мест нет», а перезаписаться в полную группу нельзя. Записи по дням не пересекаются: бронь на сегодня не всплывает во вкладке «завтра».",
    results:
      "Строка занятия с лимитом мест и статусом записи подходит любому расписанию: от йоги до автосервиса.",
    images: [
      "/screenshots/fitpulse/01-hero.png",
      "/screenshots/fitpulse/02-schedule.png",
      "/screenshots/fitpulse/03-booked.png",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
