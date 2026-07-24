export const locales = ["ru", "kz", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export type Dictionary = {
  nav: {
    projects: string;
    services: string;
    faq: string;
    team: string;
    about: string;
    contact: string;
    blog: string;
    menu: string;
  };
  hero: {
    badge: string;
    headline: string;
    highlightWord: string;
    lead: string;
    ctaProjects: string;
    ctaContact: string;
  };
  why: {
    title: string;
    intro: string;
    cta: string;
  };
  process: {
    title: string;
    intro: string;
  };
  projects: {
    title: string;
    intro: string;
    statusShipped: string;
    statusConcept: string;
    realProject: string;
    realShot: string;
    openDemo: string;
    prevShot: string;
    nextShot: string;
    goToShot: string;
    role: string;
    stack: string;
    problem: string;
    solution: string;
    security: string;
    results: string;
    close: string;
    prev: string;
    next: string;
    goTo: string;
    info: string;
  };
  services: {
    title: string;
    intro: string;
    comparisonTitle: string;
    comparisonUs: string;
    comparisonThem: string;
    pricingTitle: string;
    pricingNote: string;
    priceFrom: string;
    ctaOrder: string;
  };
  faq: {
    title: string;
  };
  team: {
    title: string;
    intro: string;
    stackLabel: string;
    securityLabel: string;
  };
  about: {
    title: string;
  };
  contact: {
    title: string;
    lead: string;
    formName: string;
    formContact: string;
    formMessage: string;
    formSubmit: string;
    formSending: string;
    formSuccess: string;
    formError: string;
    formOr: string;
  };
  ctaBand: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    tagline: string;
    note: string;
  };
  theme: {
    toggleToDark: string;
    toggleToLight: string;
  };
  language: {
    label: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ru: {
    nav: { projects: "Проекты", services: "Услуги", faq: "Вопросы", team: "Команда", about: "О студии", contact: "Контакты", blog: "Блог", menu: "Меню" },
    hero: {
      badge: "OSCP · security-first разработка",
      headline: "Строим современные сайты, которые еще и выдержат аудит",
      highlightWord: "современные",
      lead: "Команда фуллстек-разработчиков и пентестеров. Проектируем и строим сайты под задачу заказчика: рестораны, маркетплейсы, SaaS, корпоративные сервисы. Каждый проект собираем индивидуально, а ниже показываем код и скриншоты живых страниц.",
      ctaProjects: "Смотреть проекты",
      ctaContact: "Написать",
    },
    why: {
      title: "Зачем бизнесу красивый и безопасный сайт в 2026",
      intro: "Клиент знакомится с вами в браузере раньше, чем по телефону. То, что он увидит, решает дизайн. То, что заметит взломщик, решает безопасность. Мы отвечаем за оба.",
      cta: "Обсудить проект",
    },
    process: {
      title: "Как мы работаем",
      intro: "Без сюрпризов в середине проекта: объем и цена фиксируются до старта, security-ревью стоит в плане с первого дня.",
    },
    projects: {
      title: "Проекты",
      intro: "Каждый проект показывает реальный код: продакшн-магазин Bonus Shop и пять живых витрин студии открываются прямо с этого сайта. Скриншоты сняты с работающих страниц.",
      statusShipped: "рабочий проект",
      statusConcept: "концепт-кейс",
      realProject: "Реальный проект",
      realShot: "Реальный скриншот",
      openDemo: "Открыть демо",
      prevShot: "Предыдущий скриншот",
      nextShot: "Следующий скриншот",
      goToShot: "Скриншот",
      role: "Роль",
      stack: "Стек",
      problem: "Задача",
      solution: "Решение",
      security: "Безопасность",
      results: "Результат",
      close: "Закрыть",
      prev: "Предыдущий проект",
      next: "Следующий проект",
      goTo: "Показать проект",
      info: "Информация о проекте",
    },
    services: {
      title: "Услуги и стоимость",
      intro: "Небольшая команда сама закрывает весь цикл: дизайн, фронтенд, бэкенд и security-ревью. Один и тот же человек ведет задачу от макета до деплоя.",
      comparisonTitle: "vs типичная студия",
      comparisonUs: "megaumka.dev",
      comparisonThem: "Типичная студия",
      pricingTitle: "Тарифы",
      pricingNote: "Цена фиксируется в договоре до старта работ и не растет по ходу проекта.",
      priceFrom: "от",
      ctaOrder: "Обсудить проект",
    },
    faq: { title: "Частые вопросы" },
    team: {
      title: "Команда",
      intro: "Нас четверо. Достаточно мало, чтобы вы знали всех по именам, и достаточно, чтобы закрыть проект целиком: дизайн, фронтенд, бэкенд и проверку безопасности.",
      stackLabel: "Стек",
      securityLabel: "Безопасность и сертификаты",
    },
    about: { title: "О студии" },
    contact: {
      title: "Контакты",
      lead: "Форма ниже отправляет сообщение напрямую в наш Telegram, минуя CRM и обещания «мы вам перезвоним». Либо пишите на почту.",
      formName: "Имя",
      formContact: "Telegram, телефон или email",
      formMessage: "Коротко о проекте",
      formSubmit: "Отправить заявку",
      formSending: "Отправляем…",
      formSuccess: "Заявка отправлена. Ответим в течение рабочего дня.",
      formError: "Не отправилось: напишите напрямую на почту ниже.",
      formOr: "или",
    },
    ctaBand: {
      title: "Есть проект?",
      subtitle: "Напишите пару строк. Ответит тот, кто будет писать ваш код. Оценка объема и сроков бесплатная.",
      button: "Обсудить проект",
    },
    footer: {
      tagline: "megaumka.dev: веб-разработка и security-first подход",
      note: "Все скриншоты сняты с реально работающих страниц.",
    },
    theme: { toggleToDark: "Темная тема", toggleToLight: "Светлая тема" },
    language: { label: "Язык" },
  },
  kz: {
    nav: { projects: "Жобалар", services: "Қызметтер", faq: "Сұрақтар", team: "Команда", about: "Студия туралы", contact: "Байланыс", blog: "Блог", menu: "Мәзір" },
    hero: {
      badge: "OSCP · security-first әзірлеу",
      headline: "Аудиттен өтетін заманауи сайттар жасаймыз",
      highlightWord: "заманауи",
      lead: "Фуллстек-әзірлеушілер мен пентестерлер командасы. Тапсырыс берушінің міндетіне сай сайттар жасаймыз: мейрамханалардан бастап маркетплейс пен SaaS-сервистерге дейін жұмыс істейміз, әр жобаны үлгі бойынша емес, жеке жасаймыз. Төменде макет емес, жұмыс істейтін өнімді көрсетеміз: нақты код және тірі беттерден түсірілген скриншоттар.",
      ctaProjects: "Жобаларды көру",
      ctaContact: "Жазу",
    },
    why: {
      title: "2026 жылы бизнеске әдемі және қауіпсіз сайт не үшін керек",
      intro: "Клиент сізбен телефоннан бұрын браузерде танысады. Ол не көретіні дизайнға байланысты. Бұзушы не көретіні қауіпсіздікке байланысты. Біз екеуіне де жауап береміз.",
      cta: "Жобаны талқылау",
    },
    process: {
      title: "Біз қалай жұмыс істейміз",
      intro: "Жоба ортасында тосынсыйсыз: көлем мен баға стартқа дейін бекітіледі, security-ревью бірінші күннен жоспарда тұрады.",
    },
    projects: {
      title: "Жобалар",
      intro: "Әр жоба нақты кодты көрсетеді: Bonus Shop продакшн-дүкені және осы сайттан тікелей ашылатын студияның бес тірі витринасы. Скриншоттар жұмыс істеп тұрған беттерден түсірілген.",
      statusShipped: "жұмыс істейтін жоба",
      statusConcept: "концепт-кейс",
      realProject: "Нақты жоба",
      realShot: "Нақты скриншот",
      openDemo: "Демоны ашу",
      prevShot: "Алдыңғы скриншот",
      nextShot: "Келесі скриншот",
      goToShot: "Скриншот",
      role: "Рөл",
      stack: "Стек",
      problem: "Міндет",
      solution: "Шешім",
      security: "Қауіпсіздік",
      results: "Нәтиже",
      close: "Жабу",
      prev: "Алдыңғы жоба",
      next: "Келесі жоба",
      goTo: "Жобаны көрсету",
      info: "Жоба туралы ақпарат",
    },
    services: {
      title: "Қызметтер мен құны",
      intro: "Шағын команда толық циклді өзі жабады: дизайн, фронтенд, бэкенд және security-ревью. Бір адам тапсырманы макеттен деплойға дейін жүргізеді.",
      comparisonTitle: "vs әдеттегі студия",
      comparisonUs: "megaumka.dev",
      comparisonThem: "Әдеттегі студия",
      pricingTitle: "Тарифтер",
      pricingNote: "Баға жұмыс басталғанға дейін шартта бекітіледі және жоба барысында өспейді.",
      priceFrom: "бастап",
      ctaOrder: "Жобаны талқылау",
    },
    faq: { title: "Жиі қойылатын сұрақтар" },
    team: {
      title: "Команда",
      intro: "Біз төртеуміз. Барлығын атымен білетіндей аз, және жобаны толық жабатындай жеткілікті: дизайн, фронтенд, бэкенд және қауіпсіздік тексерісі.",
      stackLabel: "Стек",
      securityLabel: "Қауіпсіздік және сертификаттар",
    },
    about: { title: "Студия туралы" },
    contact: {
      title: "Байланыс",
      lead: "Төмендегі форма хабарламаңызды тікелей біздің Telegram-ға жібереді, CRM қабатынсыз. Немесе поштаға жазыңыз.",
      formName: "Аты",
      formContact: "Telegram, телефон немесе email",
      formMessage: "Жоба туралы қысқаша",
      formSubmit: "Өтінім жіберу",
      formSending: "Жіберілуде…",
      formSuccess: "Өтінім жіберілді. Жұмыс күні ішінде жауап береміз.",
      formError: "Жіберілмеді: төмендегі поштаға тікелей жазыңыз.",
      formOr: "немесе",
    },
    ctaBand: {
      title: "Жоба бар ма?",
      subtitle: "Бірнеше жол жазыңыз. Кодыңызды жазатын адам жауап береді. Көлем мен мерзімді бағалау тегін.",
      button: "Жобаны талқылау",
    },
    footer: {
      tagline: "megaumka.dev: веб-әзірлеу және security-first тәсіл",
      note: "Барлық скриншоттар нақты жұмыс істейтін беттерден түсірілген.",
    },
    theme: { toggleToDark: "Қараңғы тема", toggleToLight: "Ашық тема" },
    language: { label: "Тіл" },
  },
  en: {
    nav: { projects: "Projects", services: "Services", faq: "FAQ", team: "Team", about: "Studio", contact: "Contact", blog: "Blog", menu: "Menu" },
    hero: {
      badge: "OSCP · security-first development",
      headline: "We build modern sites that can survive an audit",
      highlightWord: "modern",
      lead: "A team of full-stack developers and pentesters. We build sites to the client's brief: we take on restaurants, marketplaces, SaaS, and corporate platforms, and build every project individually instead of from a template. What you see below isn't mockups. It's a working product: real code and screenshots taken from live pages.",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
    },
    why: {
      title: "Why a business needs a beautiful, secure site in 2026",
      intro: "A client meets you in the browser before they ever call. What they see there is a design question. What an attacker sees is a security question. We answer for both.",
      cta: "Discuss the project",
    },
    process: {
      title: "How we work",
      intro: "No mid-project surprises: scope and price are locked before we start, and the security review is on the plan from day one.",
    },
    projects: {
      title: "Projects",
      intro: "Every project is real code: the Bonus Shop production store and five live studio showcases you can open right from this site. Screenshots are captured from the running pages.",
      statusShipped: "shipped project",
      statusConcept: "concept case",
      realProject: "Real project",
      realShot: "Real screenshot",
      openDemo: "Open demo",
      prevShot: "Previous screenshot",
      nextShot: "Next screenshot",
      goToShot: "Screenshot",
      role: "Role",
      stack: "Stack",
      problem: "Problem",
      solution: "Solution",
      security: "Security",
      results: "Results",
      close: "Close",
      prev: "Previous project",
      next: "Next project",
      goTo: "Show project",
      info: "Project information",
    },
    services: {
      title: "Services & pricing",
      intro: "A small team covers the whole cycle themselves: design, frontend, backend, and a security review. The same person carries your project from the first mockup to deploy.",
      comparisonTitle: "vs a typical studio",
      comparisonUs: "megaumka.dev",
      comparisonThem: "Typical studio",
      pricingTitle: "Pricing",
      pricingNote: "The price is fixed in the contract before work starts and doesn't grow mid-project.",
      priceFrom: "from",
      ctaOrder: "Discuss the project",
    },
    faq: { title: "FAQ" },
    team: {
      title: "The team",
      intro: "There are four of us. Few enough that you'll know everyone by name, and enough to cover a project end to end: design, frontend, backend, and a security pass.",
      stackLabel: "Stack",
      securityLabel: "Security & certifications",
    },
    about: { title: "The studio" },
    contact: {
      title: "Contact",
      lead: "The form below sends your message straight to our Telegram, skipping the CRM layer. Or just email us.",
      formName: "Name",
      formContact: "Telegram, phone, or email",
      formMessage: "A few words about the project",
      formSubmit: "Send request",
      formSending: "Sending…",
      formSuccess: "Sent. We'll reply within a business day.",
      formError: "Couldn't send it: email us directly below.",
      formOr: "or",
    },
    ctaBand: {
      title: "Have a project?",
      subtitle: "Write a couple of lines. The person who'll write your code answers. Scoping and estimates are free.",
      button: "Discuss the project",
    },
    footer: {
      tagline: "megaumka.dev: web development with a security-first approach",
      note: "Every screenshot is captured from a real running page.",
    },
    theme: { toggleToDark: "Dark theme", toggleToLight: "Light theme" },
    language: { label: "Language" },
  },
};
