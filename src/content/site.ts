export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);

export const theme = {
  colors: {
    ink: "#171514",
    paper: "#f7f4ee",
    paperSoft: "#fffdf8",
    paperMuted: "#ebe5da",
    line: "#d7cec0",
    muted: "#756f66",
    signal: "#6f8d78",
    pulse: "#b96a53",
    steel: "#65737e",
  },
};

export const siteContent = {
  en: {
    metadata: {
      title: "Avarra",
      description:
        "Avarra builds technical systems, products, and hardware for ambitious operators.",
    },
    nav: {
      home: "Avarra home",
      services: "Services",
      work: "Work",
      proposal: "Request proposal",
    },
    contact: {
      label: "Start a build",
      heading: "Bring us the messy system.",
      body: "We turn rough operations, product ideas, and hardware concepts into products that holds together under real use.",
      email: "hello@avarra.dev",
    },
    home: {
      hero: {
        title: "Interfaces for ambitious operators.",
        body: "Avarra designs and builds internal systems, web & mobile products, and connected hardware workflows for teams that need momentum without mess.",
        primaryCta: "Request proposal",
        secondaryCta: "See work",
        pills: ["Internal systems", "Web & mobile", "Hardware"],
      },
      ticker: "Only 2 spots left",
      metrics: [
        { value: "03", label: "Core build tracks" },
        { value: "24h", label: "Signal response window" },
        { value: "01", label: "Focused team per build" },
      ],
      process: [
        {
          title: "Diagnose",
          text: "Map the real workflow, the bottlenecks, and the constraints before the interface gets polished.",
        },
        {
          title: "Prototype",
          text: "Shape the first working model quickly, then test the riskiest assumptions in the open.",
        },
        {
          title: "Integrate",
          text: "Connect the product to the tools, devices, data, and teams it needs to serve.",
        },
        {
          title: "Scale",
          text: "Harden the system, refine the operating loops, and leave room for the next release.",
        },
      ],
      featuredWorkHeading: "Selected systems in motion",
      partnersHeading: "Built with operators, founders, and product teams",
    },
    servicesPage: {
      metadataTitle: "Services | Avarra",
      metadataDescription:
        "Avarra builds product-led systems, web platforms, apps, and hardware solutions that scale.",
      heroTitle: "We build tools and apps people actually use and love.",
      heroBody:
        "Product-led systems, elegant mobile apps, and web platforms that scale. We help teams ship faster, reduce operational cost, and turn work into outcomes.",
      testimonial:
        "Avarra is the best agency I have worked with for software and hardware development. They took my idea and turned it into a clean, high-performing product that exceeded expectations.",
      diagramAlt:
        "Avarra service diagram covering hardware solutions, internal systems, and web & mobile products",
    },
    workPage: {
      metadataTitle: "Work | Avarra",
      metadataDescription:
        "Selected work, collaborations, and build logs from the Avarra team.",
      introPrefix: "Our team members",
      introSuffix:
        "have collectively and individually collaborated with a wide range of clients and partners.",
      projectsHeading: "Project index",
      buildLogHeading: "Build log",
      partnerHeading: "Partner signals",
    },
    services: [
      {
        title: "Internal systems",
        slug: "internal-systems",
        image: "/services1.png",
        imageAlt: "A team celebrating around a planning table",
        text: "Custom platforms that streamline operations, automate repetitive tasks, and connect workflows into one smooth ecosystem.",
      },
      {
        title: "Hardware solutions",
        slug: "hardware-solutions",
        image: "/services2.png",
        imageAlt: "An engineer working on a circuit board",
        text: "Devices, embedded systems, and smart technology designed for real-world reliability and seamless software integration.",
      },
      {
        title: "Mobile and web products",
        slug: "mobile-web-products",
        image: "/services3.png",
        imageAlt: "A person using a mobile app",
        text: "Fast, modern, scalable apps with clean functionality and strong long-term product foundations.",
      },
    ],
    projects: [
      {
        title: "Fundl",
        category: "Growth platform",
        year: "2021",
        status: "Past system",
        image: "/work1.png",
        imageAlt: "Selected Fundl campaign work",
        href: "/fundl",
        tags: ["Mobile product", "Go-to-market", "Automation"],
        summary:
          "A launch-ready product surface and growth workflow for a focused fintech offer.",
      },
      {
        title: "Operator Console",
        category: "Internal system",
        year: "2026",
        status: "Draft case study",
        image: "/work2.png",
        imageAlt: "Selected go-to-market toolkit work",
        href: "/work",
        tags: ["Dashboards", "Workflow", "Reporting"],
        summary:
          "A configurable control surface for teams that need operational clarity without spreadsheet sprawl.",
      },
      {
        title: "Connected Device Loop",
        category: "Hardware workflow",
        year: "2026",
        status: "Concept",
        image: "/diagram.png",
        imageAlt: "Technical diagram for connected device workflow",
        href: "/work",
        tags: ["Hardware", "Telemetry", "Interface"],
        summary:
          "A device-to-dashboard workflow for prototyping connected products and service operations.",
      },
    ],
    partners: [
      "Early-stage founders",
      "Operations teams",
      "Hardware labs",
    ],
    team: [
      { name: "Aiken", image: "/aiken.png" },
      { name: "Matej", image: "/matej.png" },
      { name: "Tim", image: "/tim.png" },
    ],
    buildLog: [
      {
        title: "Case study shell",
        text: "A structured format for future project pages with challenge, system, release, and outcome sections.",
      },
      {
        title: "Partner index",
        text: "A compact surface for trusted collaborators, client categories, and future logos.",
      },
      {
        title: "Signal graphics",
        text: "Reusable technical textures and particles that can support future campaign pages.",
      },
    ],
  },
} as const;

export const getSiteContent = (locale: Locale = defaultLocale) =>
  siteContent[locale];
