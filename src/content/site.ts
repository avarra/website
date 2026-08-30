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
      title: "Avarra | Software and Hardware Agency",
      description:
        "Avarra designs and builds software, web and mobile products, internal systems, and hardware solutions for teams that need reliable products shipped well.",
    },
    nav: {
      home: "Avarra home",
      services: "Services",
      work: "Work",
      booking: "Book a meeting",
    },
    contact: {
      label: "Start a build",
      heading: "Bring us the messy system.",
      body: "We turn rough workflows, product ideas, and hardware concepts into products that hold together under real use.",
      email: "hello@avarra.dev",
    },
    home: {
      hero: {
        title: "Products built properly.",
        body: "Avarra designs and builds internal systems, web and mobile products, and connected hardware workflows for teams that need reliable products shipped well.",
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
      partnersHeading: "Built with founders, product teams, and hardware labs",
    },
    servicesPage: {
      metadataTitle: "Services | Avarra",
      metadataDescription:
        "Avarra is a software and hardware agency building web platforms, mobile apps, internal systems, and hardware solutions that scale.",
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
        "Selected software, hardware, web, mobile, and internal systems work from the Avarra team.",
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
        slug: "fundl",
        title: "Fundl",
        category: "Growth platform",
        year: "2021",
        status: "Client build",
        image: "/work1.png",
        imageAlt: "Selected Fundl campaign work",
        href: "/work/fundl",
        tags: ["Mobile app", "Dashboard", "Go-to-market"],
        summary:
          "A discount platform for Gen Z shoppers, built end to end: backend, mobile app, and merchant dashboard.",
        detail: {
          paragraphs: [
            "Fundl was a large-scale project, targeted at Generation Z. It intended to bring the younger generation closer to companies and incentivize them to go buy at a certain brand or store, by providing them with discounts that came from partnerships with the brands.",
            "We were a key part of the company, as we were in charge of the entire technological aspect as well as the main idea engine, providing the platform with new and exciting ideas.",
            "Fundl consisted of three software parts: the backend, mobile app, and dashboard. The dashboard was used to create new coupons/discounts, add new stores, and assist users with simple issues.",
          ],
          gallery: [
            { src: "/fundl-app-home.png", alt: "Fundl mobile app home screen", width: 375, height: 812 },
            { src: "/fundl-app-wheel-of-fortune.png", alt: "Fundl mobile app spin & win screen", width: 375, height: 812 },
            { src: "/fundl-app-deal.png", alt: "Fundl mobile app deal screen", width: 375, height: 812 },
            { src: "/fundl-app-profile.png", alt: "Fundl mobile app profile screen", width: 375, height: 812 },
            { src: "/fundl-panel-login.png", alt: "Fundl merchant dashboard login screen", width: 1920, height: 1080 },
            { src: "/fundl-panel-users.png", alt: "Fundl merchant dashboard users list", width: 1920, height: 1080 },
            { src: "/fundl-panel-user.png", alt: "Fundl merchant dashboard user detail", width: 1920, height: 1080 },
            { src: "/fundl-panel-discounts.png", alt: "Fundl merchant dashboard discounts list", width: 1920, height: 1080 },
            { src: "/fundl-panel-shops.png", alt: "Fundl merchant dashboard shops list", width: 1920, height: 1080 },
            { src: "/fundl-panel-media-with-add.png", alt: "Fundl merchant dashboard media manager", width: 1920, height: 1080 },
          ],
        },
      },
      {
        slug: "go-to-market-toolkit",
        title: "Go-to-market toolkit",
        category: "Web platform",
        year: "2024",
        status: "Draft case study",
        image: "/work2.png",
        imageAlt: "Go-to-market toolkit displayed across digital devices",
        href: "/work/go-to-market-toolkit",
        tags: ["Web platform", "Go-to-market", "Growth"],
        summary:
          "A focused build that turns a complex challenge into a clear, useful product people can rely on.",
      },
      {
        slug: "glcharge",
        title: "GL Charge",
        category: "Mobile app",
        status: "Client build",
        image: "/glcharge-screen-saver.png",
        imageAlt: "GL Charge EV charger pay app screen saver",
        href: "/work/glcharge",
        tags: ["Embedded UI", "Payments", "EV hardware"],
        summary:
          "The on-charger application EV drivers use to connect, pay, and track a public charging session.",
        detail: {
          paragraphs: [
            "GL Charge is a company that produces chargers for electric vehicles.",
            "Since they provide chargers for public use, they needed an application to run on the charger, that would allow users to control and oversee the charging process (initialization, payment, status, …).",
          ],
          gallery: [
            { src: "/glcharge-screen-saver.png", alt: "GL Charge screen saver prompting vehicle connection", width: 1024, height: 600 },
            { src: "/glcharge-connection-status.png", alt: "GL Charge vehicle connected confirmation screen", width: 1024, height: 600 },
            { src: "/glcharge-payment-instructions.png", alt: "GL Charge add payment card screen", width: 1024, height: 600 },
            { src: "/glcharge-payment-status.png", alt: "GL Charge card approved screen", width: 1024, height: 600 },
            { src: "/glcharge-charging-data.png", alt: "GL Charge live charging data screen", width: 1024, height: 600 },
            { src: "/glcharge-charging-completion.png", alt: "GL Charge charging complete screen", width: 1024, height: 600 },
            { src: "/glcharge-disconnection.png", alt: "GL Charge vehicle disconnected screen", width: 1024, height: 600 },
            { src: "/glcharge-invoice.png", alt: "GL Charge invoice and QR code screen", width: 1024, height: 600 },
          ],
        },
      },
      {
        slug: "yourflare",
        title: "YourFlare",
        category: "IoT platform",
        status: "Client build",
        image: "/yourflare-1.png",
        imageAlt: "YourFlare tracker mobile app map screen",
        href: "/work/yourflare",
        tags: ["Mobile app", "Admin panel", "IoT"],
        summary:
          "Mobile app and admin panel for a family of connected trackers, from live location to device operations.",
        detail: {
          paragraphs: [
            "Projects: Mobile app, Admin panel (dashboard)",
            "YFLab d.o.o. was an IoT company, providing trackers for specific use-cases. Before going under, they made a reflective device that helps parents keep track of their younger kids while keeping them safe and visible in traffic, and a bike tracker, that slides into the bike handle.",
            "At the company, we worked on several iterations of the mobile applications required to use their product. Aside from the mobile application, we worked on the admin panel, which was used to oversee day-to-day operations over the device statuses and other information, as well as multiple website iterations and internal tools like firmware flashers.",
          ],
          gallery: [
            { src: "/yourflare-1.png", alt: "YourFlare app live location map", width: 1125, height: 2437 },
            { src: "/yourflare-2.png", alt: "YourFlare app device details and battery status", width: 1125, height: 2437 },
            { src: "/yourflare-3.png", alt: "YourFlare app settings and geofence history", width: 1125, height: 2437 },
            { src: "/yourflare-4.png", alt: "YourFlare app device switcher and logout", width: 1125, height: 2437 },
          ],
        },
      }
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
