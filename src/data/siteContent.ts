/**
 * Central content config — single source of truth.
 * Import from components; do not hardcode copy in UI.
 */
export const site = {
  name: "Muhammad Ahmad Faseeh",
  shortName: "Ahmad Faseeh",
  title: "Full-Stack Backend Developer & WordPress Expert",
  specialties: [
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "PHP",
    "SaaS Architect",
    "AI Integration",
    "NestJS",
    "System Designer",
    "AI Automation",
  ],
  location: "Lahore, Punjab, Pakistan",
  address: "Jeevan Hanan, Barkat Market, Garden Town, Lahore",
  email: "muhammadahmadfaseeh5@gmail.com",
  altEmail: "webdeveloperinshallah@gmail.com",
  phoneDisplay: "03206493816",
  phoneTel: "+923206493816",
  role: "Full-Stack Developer | Backend Engineer | AI Builder",
  github: "https://github.com/AhmadFaseeh",
  linkedin: "https://linkedin.com/in/muhammadahmadfaseeh",
  cvPath: "/Muhammad Ahmad Faseeh CV.pdf",

  bio: {
    headline: "WHO I AM",
    paragraphs: [
      "Passionate Full-Stack & Backend Developer with hands-on experience building scalable SaaS applications, AI-driven systems, and high-performance APIs. I design RESTful & GraphQL APIs with secure authentication, build AI-driven pipelines using OpenAI, RAG, and Embeddings, manage PostgreSQL databases with complex schema design & optimization, integrate payment systems (Stripe, PayPal) with webhook management, optimize web applications for Core Web Vitals & Lighthouse performance, and develop full-stack solutions combining Node.js backend with React frontend. Currently exploring advanced AI architectures, LLM integrations, serverless computing, and real-time data processing systems.",
    ],
  },

  aboutOneLiner:
    "I build scalable backend systems and AI-powered products. Based in Lahore, currently studying Software Engineering at PMAS Arid University.",

  funFacts: [
    "Based in Lahore, Pakistan",
    "English (Professional) + Urdu (Native)",
    "Full-time dev while studying",
    "Passionate about AI automation",
  ],

  education: [
    {
      place: "PMAS Arid Agriculture University — Lahore",
      degree: "Bachelor of Science in Computer Software Engineering",
      period: "October 2023 – August 2027 (ongoing)",
    },
    {
      place: "Superior College Piplan — Mianwali",
      degree: "Intermediate in Computer Science (ICS)",
      period: "September 2021 – September 2023",
    },
  ],

  stats: [
    { target: 1, suffix: "+", text: " Year of Professional Experience" },
    { target: 10, suffix: "+", text: " Projects Delivered" },
    { target: 20, suffix: "+", text: " Technologies Mastered" },
  ],

  experience: [
    {
      id: "fs",
      title: "Full-Stack / Backend Developer",
      company: "IT Kumail — ITK Online Solutions",
      type: "On-site",
      location: "Lahore District, Punjab, Pakistan",
      period: "July 2025 – Present",
      duration: "10 months",
      live: true,
      points: [
        "Architect and maintain scalable backend services using TypeScript and Node.js, applying clean architecture and SOLID principles to ensure long-term maintainability across multiple SaaS products.",
        "Design and develop high-performance RESTful and GraphQL APIs with JWT/OAuth2 secure authentication, handling complex business logic and asynchronous workflows.",
        "Lead PostgreSQL database management including complex schema design, relationship mapping, indexing strategies, and query optimization achieving up to 40% performance improvements.",
        "Integrate automated payment systems via Stripe and PayPal, managing full subscription lifecycles, webhook event handling, secure transaction retries, and failure recovery flows.",
        "Build and deploy AI-driven pipelines (RAG, Embeddings) using OpenAI GPT-4 and Gemini API to power intelligent chatbot features and document retrieval systems.",
        "Implement background job queues, concurrency handling, and real-time monitoring of server health and API response times.",
        "Conduct code reviews, establish coding standards, and maintain technical documentation for team onboarding.",
      ],
      stack: ["TypeScript", "Node.js", "PostgreSQL", "GraphQL", "REST APIs", "Stripe", "OpenAI", "NestJS", "Docker"],
    },
    {
      id: "wp",
      title: "WordPress & Systems Developer",
      company: "IT Kumail — ITK Online Solutions",
      type: "Remote",
      location: "Lahore, Punjab, Pakistan",
      period: "July 2025 – Present",
      duration: "10 months",
      live: true,
      points: [
        "Optimize large-scale web applications for Core Web Vitals (LCP, CLS, FID), consistently achieving 90+ Lighthouse scores through advanced caching and render-blocking resolution.",
        "Customize PHP backend logic and integrate third-party REST APIs to extend platform functionality, ensuring seamless CRM tool synchronization with internal databases.",
        "Develop interactive UI components using React.js and GSAP animation library.",
        "Configure Redis caching layers and WordPress object caching to reduce server load for high-traffic applications.",
        "Conduct technical SEO audits, implement structured data, meta optimization, and sitemap strategies.",
      ],
      stack: ["PHP", "WordPress", "React.js", "GSAP", "Redis", "Core Web Vitals", "SEO"],
    },
    {
      id: "upwork",
      title: "Freelance Full-Stack Developer",
      company: "Upwork",
      type: "Remote / Freelance",
      location: "Lahore, Punjab, Pakistan",
      period: "February 2025 – July 2025",
      duration: "6 months",
      live: false,
      points: [
        "Delivered custom web projects for international clients: portfolios, landing pages, e-commerce storefronts using React.js, Next.js, and Node.js.",
        "Built and deployed RESTful API integrations connecting client platforms to payment gateways and email automation tools.",
        "Maintained high client satisfaction by delivering on time with clean, documented code.",
      ],
      stack: ["React.js", "Next.js", "Node.js", "REST APIs"],
    },
    {
      id: "intern",
      title: "Frontend Developer (JavaScript Internship)",
      company: "Freelance / Self-directed",
      type: "Internship",
      location: "Lahore District, Punjab, Pakistan",
      period: "October 2024 – June 2025",
      duration: "9 months",
      live: false,
      points: [
        "Developed UI components, portfolio websites, and e-commerce front-ends using HTML, CSS, JavaScript, and React.js.",
        "Built reusable component libraries and collaborated on practice projects to sharpen frontend engineering skills.",
        "Gained expertise in responsive design, browser compatibility, and accessibility best practices.",
      ],
      stack: ["HTML", "CSS", "JavaScript", "React.js"],
    },
    {
      id: "massive",
      title: "Web Developer",
      company: "Massive",
      type: "On-site",
      location: "Lahore, Punjab, Pakistan",
      period: "April 2024 – October 2024",
      duration: "7 months",
      live: false,
      points: [
        "Developed and maintained client websites using modern HTML/CSS and JavaScript, delivering responsive cross-browser interfaces.",
        "Assisted in backend integrations, connecting frontend UI to server-side logic and third-party APIs.",
        "Contributed to performance optimization improving initial page load times for deployed client projects.",
      ],
      stack: ["HTML", "CSS", "JavaScript", "APIs"],
    },
  ],

  projects: [
    {
      name: "AI-Driven SaaS Ecosystem",
      stack: ["TypeScript", "Node.js", "PostgreSQL", "OpenAI", "Gemini API", "n8n", "Vector DB"],
      period: "October 2025 – Present",
      status: "active" as const,
      github: "https://github.com/AhmadFaseeh",
      description:
        "Comprehensive multi-tenant SaaS backend automating complex business workflows with n8n automation engine and custom AI behavior via OpenClaw Gateway and Gemini API.",
      bullets: [
        "Architected multi-tenant SaaS backend automating complex workflows using n8n and custom AI via OpenClaw Gateway and Gemini API.",
        "Implemented a vector-based RAG retrieval system for an AI chatbot, improving contextual accuracy for festival-based client data queries and dynamic FAQ handling.",
        "Built secure Shopify CRM integration module to synchronize product catalogs, inventory, and user accounts in real-time via bidirectional REST APIs.",
        "Designed multi-layered authentication with role-based access control (RBAC) and JWT refresh token rotation to secure all tenant data.",
      ],
    },
    {
      name: "AI Content Humanizer Tool",
      stack: ["Next.js", "Node.js", "PostgreSQL", "AI Detection APIs", "Rate Limiting"],
      period: "April 2026 – Present",
      status: "active" as const,
      github: "https://github.com/AhmadFaseeh",
      description:
        "Production-ready tool for detecting and humanizing AI-generated text with high-volume API processing, PostgreSQL analytics backend, and subscription-based access model.",
      bullets: [
        "Architected tool for identifying and humanizing AI-generated text, with PostgreSQL backend for data persistence, user history, and analytics dashboards.",
        "Designed scalable API layer for high-volume text processing with error handling, retry logic, and per-user rate limiting.",
        "Integrated multiple AI detection APIs to cross-validate content scores, improving accuracy and reducing false positives.",
        "Built Next.js frontend with real-time processing feedback, user authentication, and subscription-based access model.",
      ],
    },
    {
      name: "E-Commerce & Portfolio Projects",
      stack: ["React.js", "Next.js", "HTML/CSS", "JavaScript", "Node.js", "Express"],
      period: "October 2024 – July 2025",
      status: "completed" as const,
      github: "https://github.com/AhmadFaseeh",
      description:
        "Freelance delivery of 5+ client portfolio websites and a full-stack e-commerce storefront with reusable component libraries.",
      bullets: [
        "Designed and developed 5+ client portfolio websites with custom animations, responsive layouts, and optimized performance.",
        "Built full-stack e-commerce storefront with product catalog, cart management, and payment checkout flow.",
        "Delivered reusable component libraries used across multiple client projects, reducing development time on subsequent engagements.",
      ],
    },
  ],

  skills: {
    clusters: {
      backend: ["Node.js", "Express.js", "NestJS", "TypeScript", "REST APIs", "GraphQL APIs", "Clean Architecture", "SOLID Principles"],
      frontend: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "GSAP Animations", "Responsive Design"],
      data: ["PostgreSQL", "MongoDB", "Vector Databases", "Redis", "Complex Schema Design", "Query Optimization"],
      ai: ["OpenAI GPT-4 API", "RAG Pipelines", "Embeddings", "n8n", "Gemini API", "OpenClaw Gateway", "LLM Integration"],
      devops: ["Docker", "Git", "GitHub", "Webhooks", "Stripe Integration", "PayPal Integration", "CI/CD"],
      seo: ["Core Web Vitals", "Lighthouse Optimization", "Redis/WP Caching", "Technical SEO", "Structured Data"],
    },
    tags: [
      "TypeScript", "JavaScript", "SQL", "PHP", "HTML/CSS",
      "Node.js", "Express", "NestJS", "Next.js", "React",
      "PostgreSQL", "MongoDB", "Vector DBs", "Redis",
      "Docker", "Git/GitHub", "OpenAI API", "RAG Pipelines",
      "Embeddings", "n8n", "Stripe", "PayPal", "Webhooks",
      "Core Web Vitals", "Lighthouse", "SEO", "Caching",
    ],
  },

  proficiency: [
    { name: "Backend Development", value: 90 },
    { name: "Database Management", value: 88 },
    { name: "WordPress / PHP", value: 85 },
    { name: "Frontend / React", value: 80 },
    { name: "AI / Automation", value: 75 },
    { name: "DevOps / Docker", value: 62 },
  ],

  learning: [
    { title: "Deep diving into Rust for systems-level backend performance" },
    { title: "Exploring LLM fine-tuning and custom model deployment pipelines" },
    { title: "Building production-grade microservices with Docker + Kubernetes" },
  ],

  certifications: [
    {
      name: "AI/ML Fundamentals & Practical Applications",
      issuer: "Coursera / DeepLearning.AI",
      year: "2024",
      id: "AI-ML-2024",
    },
    {
      name: "JavaScript Advanced Internship Program",
      issuer: "Freelance Training Program",
      year: "Oct 2024 – Jun 2025",
      id: null,
    },
    {
      name: "Node.js & Backend Development",
      issuer: "Udemy / Self-Directed Learning",
      year: "2024",
      id: null,
    },
    {
      name: "OpenAI API & AI Integration Specialist",
      issuer: "OpenAI Documentation & Practical Projects",
      year: "2025",
      id: null,
    },
    {
      name: "PostgreSQL Database Administration & Optimization",
      issuer: "PostgreSQL Official Training / Hands-on Projects",
      year: "2025",
      id: null,
    },
  ],

  languages: [
    { lang: "English", level: "Professional / Fluent" },
    { lang: "Urdu", level: "Native" },
  ],
} as const;

/** Tech constellation nodes + edges for Canvas2D constellation */
export const constellation = {
  nodes: [
    // Backend — cyan
    { id: "ts",      label: "TypeScript",  cluster: "backend"  as const, confidence: 0.95 },
    { id: "node",    label: "Node.js",     cluster: "backend"  as const, confidence: 0.95 },
    { id: "express", label: "Express",     cluster: "backend"  as const, confidence: 0.90 },
    { id: "nest",    label: "NestJS",      cluster: "backend"  as const, confidence: 0.88 },
    // Frontend — amber
    { id: "react",   label: "React",       cluster: "frontend" as const, confidence: 0.90 },
    { id: "next",    label: "Next.js",     cluster: "frontend" as const, confidence: 0.90 },
    { id: "tw",      label: "Tailwind",    cluster: "frontend" as const, confidence: 0.85 },
    // Data — green
    { id: "pg",      label: "PostgreSQL",  cluster: "data"     as const, confidence: 0.92 },
    { id: "mongo",   label: "MongoDB",     cluster: "data"     as const, confidence: 0.82 },
    { id: "vec",     label: "Vector DB",   cluster: "data"     as const, confidence: 0.80 },
    { id: "redis",   label: "Redis",       cluster: "data"     as const, confidence: 0.78 },
    // AI — purple
    { id: "oai",     label: "OpenAI",      cluster: "ai"       as const, confidence: 0.90 },
    { id: "rag",     label: "RAG",         cluster: "ai"       as const, confidence: 0.88 },
    { id: "emb",     label: "Embeddings",  cluster: "ai"       as const, confidence: 0.86 },
    { id: "n8n",     label: "n8n",         cluster: "ai"       as const, confidence: 0.84 },
    // DevOps — gray
    { id: "docker",  label: "Docker",      cluster: "devops"   as const, confidence: 0.72 },
    { id: "git",     label: "Git/GitHub",  cluster: "devops"   as const, confidence: 0.90 },
  ],
  edges: [
    ["ts",      "node"],
    ["node",    "express"],
    ["node",    "nest"],
    ["react",   "next"],
    ["next",    "tw"],
    ["pg",      "mongo"],
    ["mongo",   "vec"],
    ["vec",     "redis"],
    ["oai",     "rag"],
    ["rag",     "emb"],
    ["emb",     "n8n"],
    ["ts",      "react"],
    ["node",    "next"],
    ["nest",    "pg"],
    ["pg",      "redis"],
    ["oai",     "vec"],
    ["docker",  "git"],
    ["nest",    "docker"],
  ],
} as const;

export const navItems: { href: string; label: string }[] = [
  { href: "/",           label: "Home"              },
  { href: "/about",      label: "About Me"          },
  { href: "/experience", label: "Work Experience"   },
  { href: "/projects",   label: "Projects"          },
  { href: "/skills",     label: "Skills"            },
  { href: "/contact",    label: "Contact"           },
];

export type PagePath = (typeof navItems)[number]["href"];
