/**
 * Central content config — import from components; do not hardcode copy in UI.
 * Colors: use CSS variables in styles; data here is text/structure only.
 */
export const site = {
  name: "Muhammad Ahmad Faseeh",
  shortName: "Ahmad Faseeh",
  location: "Lahore, Punjab, Pakistan",
  email: "muhammadahmadfaseeh5@gmail.com",
  phoneDisplay: "03206493816",
  phoneTel: "+923206493816",
  role: "Full-Stack Developer | Backend Engineer | AI Builder",
  github: "https://github.com/AhmadFaseeh",
  linkedin: "https://www.linkedin.com/in/muhammadahmadfaseeh",
  cvPath: "/Muhammad Ahmad Faseeh CV.pdf",
  bio: {
    headline: "WHO I AM",
    paragraphs: [
      "I'm Ahmad — a backend engineer who loves building systems that scale. Currently studying Software Engineering at PMAS Arid University Lahore while working full-time at IT KUMAIL. I specialize in Node.js backends, PostgreSQL systems, and AI-powered product pipelines.",
    ],
  },
  aboutOneLiner:
    "I build scalable backend systems and AI-powered products. Based in Lahore, currently studying Software Engineering at PMAS Arid University.",
  funFacts: [
    "Based in Lahore, Pakistan",
    "English (Professional) + Urdu",
    "Full-time dev while studying",
    "Passionate about AI automation",
  ],
  education: [
    { place: "PMAS Arid University", detail: "B.Sc. Software Engineering — in progress" },
    { place: "Superior College Piplan", detail: "Intermediate & foundational studies" },
  ],
  stats: [
    { target: 1, suffix: "+", text: " Year of Professional Experience" },
    { target: 10, suffix: "+", text: " Projects Delivered" },
    { target: 5, suffix: "+", text: " Technologies Mastered" },
  ],
  experience: [
    {
      id: "fs",
      title: "Full-Stack / Backend Developer",
      company: "IT KUMAIL",
      period: "July 2025 – Present",
      live: true,
      points: [
        "TypeScript + Node.js backend services (clean architecture)",
        "RESTful & GraphQL APIs for SaaS applications",
        "PostgreSQL schema design + query optimization",
        "Stripe & PayPal payment integration",
        "AI pipelines: RAG + Embeddings using OpenAI",
        "Background jobs, concurrency, real-time monitoring",
      ],
      stack: ["TypeScript", "Node.js", "PostgreSQL", "GraphQL", "OpenAI", "Stripe"],
    },
    {
      id: "wp",
      title: "WordPress & Systems Developer",
      company: "IT KUMAIL",
      period: "July 2025 – Present",
      live: true,
      points: [
        "Core Web Vitals optimization (high Lighthouse scores)",
        "PHP backend + third-party API integrations (CRM sync)",
        "React.js + GSAP UI components",
        "Advanced caching + render-blocking resolution",
      ],
      stack: ["PHP", "WordPress", "React", "GSAP", "REST"],
    },
  ],
  projects: [
    {
      name: "AI-Driven SaaS Ecosystem",
      stack: ["TypeScript", "Node.js", "PostgreSQL", "OpenAI", "n8n"],
      period: "Oct 2025 – Present",
      description:
        "Comprehensive SaaS backend automating workflows with n8n and AI. Vector-based chatbot for festival clients. Shopify CRM integration via REST APIs.",
      longDescription:
        "End-to-end API design, job queues for heavy workloads, and observability hooks. Integrates with CRM and commerce stacks while keeping Core Web Vitals in check on the surface.",
      github: "https://github.com/AhmadFaseeh",
    },
    {
      name: "AI Content Humanizer Tool",
      stack: ["Next.js", "Node.js", "PostgreSQL", "AI Detection APIs"],
      period: "April 2026 – Present",
      description:
        "Tool for detecting and humanizing AI-generated text. High-volume text processing with rate limiting and PostgreSQL analytics backend.",
      longDescription:
        "User-facing app with strict rate limits, abuse protection, and analytics in PostgreSQL. Batch-friendly APIs for large paste workflows.",
      github: "https://github.com/AhmadFaseeh",
    },
  ],
  skills: {
    tags: [
      "TypeScript",
      "JavaScript (ES6+)",
      "SQL",
      "PHP",
      "Python",
      "HTML/CSS",
      "Node.js",
      "Express",
      "NestJS",
      "Next.js",
      "React",
      "Tailwind CSS",
      "REST",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
      "Vector DBs",
      "Docker",
      "Redis",
      "Git/GitHub",
      "OpenAI API",
      "RAG Pipelines",
      "Embeddings",
      "n8n",
      "Stripe",
      "PayPal",
      "Webhooks",
      "Core Web Vitals",
      "Lighthouse",
      "SEO",
      "Caching",
    ],
  },
  proficiency: [
    { name: "Backend Development", value: 90 },
    { name: "Frontend / React", value: 80 },
    { name: "Database Management", value: 88 },
    { name: "AI / Automation", value: 72 },
    { name: "DevOps / Docker", value: 60 },
    { name: "WordPress / PHP", value: 85 },
  ],
  learning: [
    {
      title: "Deep diving into Rust for systems-level backend work",
    },
    {
      title: "Exploring LLM fine-tuning and custom model deployment",
    },
    {
      title: "Building production-grade microservices with Docker + Kubernetes",
    },
  ],
} as const;

/** Tech constellation: edges define relationships; clusters for coloring */
export const constellation = {
  nodes: [
    { id: "ts", label: "TypeScript", cluster: "backend" as const, confidence: 0.95 },
    { id: "node", label: "Node.js", cluster: "backend" as const, confidence: 0.95 },
    { id: "express", label: "Express", cluster: "backend" as const, confidence: 0.9 },
    { id: "nest", label: "NestJS", cluster: "backend" as const, confidence: 0.88 },
    { id: "react", label: "React", cluster: "frontend" as const, confidence: 0.9 },
    { id: "next", label: "Next.js", cluster: "frontend" as const, confidence: 0.9 },
    { id: "tw", label: "Tailwind", cluster: "frontend" as const, confidence: 0.85 },
    { id: "pg", label: "PostgreSQL", cluster: "data" as const, confidence: 0.92 },
    { id: "mongo", label: "MongoDB", cluster: "data" as const, confidence: 0.82 },
    { id: "vec", label: "Vector DB", cluster: "data" as const, confidence: 0.8 },
    { id: "oai", label: "OpenAI", cluster: "ai" as const, confidence: 0.9 },
    { id: "rag", label: "RAG", cluster: "ai" as const, confidence: 0.88 },
    { id: "emb", label: "Embeddings", cluster: "ai" as const, confidence: 0.86 },
    { id: "n8n", label: "n8n", cluster: "ai" as const, confidence: 0.84 },
  ],
  edges: [
    ["ts", "node"],
    ["node", "express"],
    ["node", "nest"],
    ["react", "next"],
    ["next", "tw"],
    ["pg", "mongo"],
    ["mongo", "vec"],
    ["oai", "rag"],
    ["rag", "emb"],
    ["emb", "n8n"],
    ["ts", "react"],
    ["node", "next"],
    ["nest", "pg"],
  ],
} as const;

export const navItems: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/experience", label: "Work Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills & Technologies" },
  { href: "/contact", label: "Contact" },
];

export type PagePath = (typeof navItems)[number]["href"];
