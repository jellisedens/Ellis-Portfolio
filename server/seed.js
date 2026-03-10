const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("./models/Category");
const Skill = require("./models/Skill");
const Project = require("./models/Project");
const Education = require("./models/Education");
const Experience = require("./models/Experience");
const Admin = require("./models/Admin");
const Service = require("./models/Service");
const SiteSettings = require("./models/SiteSettings");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding...");

    await Category.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Education.deleteMany({});
    await Experience.deleteMany({});
    console.log("Collections cleared.");

    // --- Admin User ---
    await Admin.deleteMany({});
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log(`Admin user created: ${admin.email}`);

    // --- Categories ---
    const categoriesData = [
      { name: "Frontend", slug: "frontend", color: "#3b82f6", icon: "monitor", displayOrder: 1 },
      { name: "Backend", slug: "backend", color: "#10b981", icon: "server", displayOrder: 2 },
      { name: "Database", slug: "database", color: "#f59e0b", icon: "database", displayOrder: 3 },
      { name: "Tools & Platforms", slug: "tools", color: "#8b5cf6", icon: "wrench", displayOrder: 4 },
      { name: "Marketing & Analytics", slug: "marketing", color: "#ec4899", icon: "bar-chart", displayOrder: 5 },
      { name: "Accessibility & Standards", slug: "accessibility", color: "#06b6d4", icon: "shield", displayOrder: 6 },
      { name: "Leadership & Management", slug: "leadership", color: "#f97316", icon: "users", displayOrder: 7 },
    ];

    const categories = await Category.insertMany(categoriesData);
    console.log(`${categories.length} categories created.`);

    const catMap = {};
    categories.forEach((cat) => {
      catMap[cat.slug] = cat._id;
    });

    // --- Skills ---
    const skillsData = [
      // Frontend
      { name: "HTML5", category: catMap["frontend"] },
      { name: "CSS3", category: catMap["frontend"] },
      { name: "JavaScript", category: catMap["frontend"] },
      { name: "React", category: catMap["frontend"] },
      { name: "Responsive Design", category: catMap["frontend"] },

      // Backend
      { name: "Node.js", category: catMap["backend"] },
      { name: "Express", category: catMap["backend"] },
      { name: "PHP", category: catMap["backend"] },
      { name: "Python", category: catMap["backend"] },
      { name: "C#", category: catMap["backend"] },
      { name: ".NET", category: catMap["backend"] },
      { name: "REST API Design", category: catMap["backend"] },

      // Database
      { name: "MongoDB", category: catMap["database"] },
      { name: "Mongoose", category: catMap["database"] },
      { name: "SQL", category: catMap["database"] },

      // Tools
      { name: "Git", category: catMap["tools"] },
      { name: "GitHub", category: catMap["tools"] },
      { name: "Visual Studio", category: catMap["tools"] },
      { name: "Azure", category: catMap["tools"] },
      { name: "Vercel", category: catMap["tools"] },
      { name: "Render", category: catMap["tools"] },
      { name: "WordPress", category: catMap["tools"] },

      // Marketing
      { name: "Google Analytics", category: catMap["marketing"] },
      { name: "HubSpot", category: catMap["marketing"] },
      { name: "SEO/SEM", category: catMap["marketing"] },
      { name: "Slate CRM", category: catMap["marketing"] },
      { name: "Email Marketing Automation", category: catMap["marketing"] },
      { name: "Data Analysis & Reporting", category: catMap["marketing"] },
      { name: "Campaign Attribution Modeling", category: catMap["marketing"] },

      // Accessibility
      { name: "WCAG Accessibility", category: catMap["accessibility"] },
      { name: "W3C Web Standards", category: catMap["accessibility"] },

      // Leadership
      { name: "Agile/Scrum", category: catMap["leadership"] },
      { name: "Sprint Planning", category: catMap["leadership"] },
      { name: "Cross-Functional Team Leadership", category: catMap["leadership"] },
      { name: "Technical Strategy", category: catMap["leadership"] },
      { name: "Project Scoping & Planning", category: catMap["leadership"] },
    ];

    const skills = await Skill.insertMany(skillsData);
    console.log(`${skills.length} skills created.`);

    const skillMap = {};
    skills.forEach((skill) => {
      skillMap[skill.name] = skill._id;
    });

    const getSkillIds = (names) => {
      return names.map((name) => {
        if (!skillMap[name]) {
          console.warn(`Warning: Skill "${name}" not found in skillMap`);
        }
        return skillMap[name];
      }).filter(Boolean);
    };

    // --- Education ---
    const educationData = [
      {
        institution: "Clemson University",
        degree: "B.S. Economics",
        fieldOfStudy: "Economics",
        type: "Degree",
        startDate: new Date("2015-08-01"),
        endDate: new Date("2019-05-01"),
      },
      {
        institution: "Greenville Technical College",
        degree: "A.S. Programming",
        fieldOfStudy: "Computer Programming",
        type: "Degree",
        startDate: new Date("2021-08-01"),
        endDate: new Date("2023-05-01"),
      },
      {
        institution: "Greenville Technical College",
        degree: "Web Developer Certificate",
        fieldOfStudy: "Web Development",
        type: "Certification",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2024-05-01"),
      },
      {
        institution: "Greenville Technical College",
        degree: "Full Stack Developer Certificate",
        fieldOfStudy: "Full Stack Development",
        type: "Certification",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2024-05-01"),
      },
    ];

    const education = await Education.insertMany(educationData);
    console.log(`${education.length} education entries created.`);

    // --- Experience ---
    const experienceData = [
      {
        company: "Anderson University",
        jobTitle: "Digital Architect & Technologist",
        location: "Anderson, SC",
        startDate: new Date("2025-03-01"),
        endDate: null,
        description:
          "Lead technical strategy and implementation for enterprise-level web solutions and marketing technology platforms.",
        highlights: [
          "Architect and implement scalable, compliant full stack web solutions",
          "Lead technical strategy for marketing automation, email solutions, and analytics platforms",
          "Develop data-driven attribution models to measure campaign effectiveness",
          "Drive innovation and integration within the digital marketing technology stack",
          "Manage multi-phase, large-scale digital projects including long-range planning",
          "Supervise and mentor a team of 6 direct reports",
          "Lead sprint planning, agile workflows, and cross-functional project coordination",
        ],
        technologies: getSkillIds([
          "JavaScript",
          "React",
          "Node.js",
          "Express",
          "REST API Design",
          "WordPress",
          "Google Analytics",
          "HubSpot",
          "SEO/SEM",
          "Email Marketing Automation",
          "Data Analysis & Reporting",
          "Campaign Attribution Modeling",
          "Git",
          "Agile/Scrum",
          "Sprint Planning",
          "Cross-Functional Team Leadership",
          "Technical Strategy",
          "Project Scoping & Planning",
        ]),
      },
      {
        company: "Anderson University",
        jobTitle: "Digital Production Manager",
        location: "Anderson, SC",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2025-02-28"),
        description:
          "Managed organization-wide digital production projects from scoping through performance monitoring.",
        highlights: [
          "Managed digital production projects from scoping to planning, execution to performance monitoring",
          "Oversaw and maintained university website using WordPress including updates and new builds",
          "Coordinated project goals, timelines, and deliverables with cross-functional teams",
          "Implemented and monitored SEO, SEM, and design/development best practices",
          "Ensured compliance with W3C Web Standards and accessibility requirements",
        ],
        technologies: getSkillIds([
          "HTML5",
          "CSS3",
          "JavaScript",
          "WordPress",
          "Google Analytics",
          "SEO/SEM",
          "Data Analysis & Reporting",
          "WCAG Accessibility",
          "W3C Web Standards",
          "Git",
          "Cross-Functional Team Leadership",
          "Project Scoping & Planning",
        ]),
      },
    ];

    const experience = await Experience.insertMany(experienceData);
    console.log(`${experience.length} experience entries created.`);

    // --- Projects ---
    const projectsData = [
      {
        title: "Why College Quiz",
        summary:
          "A multi-tenant, 3-phase personality quiz that matches prospective students with college programs.",
        description:
          "Built a full-stack SaaS quiz platform for higher education enrollment marketing. The app guides users through a 3-phase adaptive quiz — bucket discovery, area refinement, and mindset profiling — then uses a scoring engine to match them with relevant programs and personalized result content. Features include dynamic tenant theming (colors, fonts, branding pulled from the database), lead capture with session tracking, an admin panel for managing programs/questions/results, and CSV import tooling for bulk data. Deployed with Vercel frontends, Render API server, and MongoDB Atlas.",
        technologies: getSkillIds([
          "React",
          "Node.js",
          "Express",
          "MongoDB",
          "Mongoose",
          "REST API Design",
          "CSS3",
          "Responsive Design",
          "Vercel",
          "Render",
          "Git",
          "GitHub",
        ]),
        projectType: "Full-Stack",
        githubUrl: "https://github.com/jellisedens/mern-why-college-quiz",
        liveUrl: "https://whycollege.net",
        status: "In Progress",
      },
      {
        title: "Portfolio Website",
        summary:
          "A full-stack portfolio built with React, Express, MongoDB, and Tailwind CSS.",
        description:
          "Personal portfolio website built from the ground up with a React TypeScript frontend and Express API backend. Features a section-based architecture, Tailwind CSS v4 styling, MongoDB data layer with Mongoose schemas, and full CRUD API endpoints for managing content. Designed with a clean separation of concerns and scalable project structure.",
        technologies: getSkillIds([
          "React",
          "Node.js",
          "Express",
          "MongoDB",
          "Mongoose",
          "REST API Design",
          "CSS3",
          "Responsive Design",
          "Git",
          "GitHub",
        ]),
        projectType: "Full-Stack",
        githubUrl: "https://github.com/jellisedens/Ellis-Portfolio",
        liveUrl: "",
        status: "In Progress",
      },
    ];

    const projects = await Project.insertMany(projectsData);
    console.log(`${projects.length} projects created.`);

    // --- Services ---
    await Service.deleteMany({});

     const services = await Service.create([
      {
        title: "Web Development",
        slug: "web-development",
        headline: "Custom websites and web applications built to perform",
        description: "From responsive landing pages to complex full-stack applications, I build fast, accessible, and scalable web experiences using modern technologies like React, Node.js, and MongoDB. Every project is built with clean code, SEO best practices, and your business goals in mind.",
        icon: "code",
        features: [
          "Custom React single-page applications",
          "Node.js and Express REST APIs",
          "MongoDB database design and optimization",
          "Responsive design for all devices",
          "Performance optimization and Core Web Vitals",
          "Third-party API integrations",
        ],
        technologies: getSkillIds(["React", "JavaScript", "HTML5", "CSS3", "Node.js", "Express", "MongoDB", "Mongoose", "Responsive Design"]),
        displayOrder: 1,
        featured: true,
        visible: true,
      },
      {
        title: "E-Commerce & CMS",
        slug: "ecommerce-cms",
        headline: "Online stores and content systems you can manage yourself",
        description: "I build custom e-commerce solutions and content management systems that put you in control. No more waiting on a developer to update your prices or publish a blog post. You get a clean admin interface and a storefront that converts visitors into customers.",
        icon: "shopping-cart",
        features: [
          "Custom e-commerce storefronts",
          "Admin dashboards for content management",
          "Product catalog and inventory management",
          "Payment gateway integration",
          "Order management workflows",
          "Customer account portals",
        ],
        technologies: getSkillIds(["React", "Node.js", "Express", "MongoDB", "REST API Design", "Git", "WordPress"]),
        displayOrder: 2,
        featured: true,
        visible: true,
      },
      {
        title: "Digital Marketing Strategy",
        slug: "digital-marketing",
        headline: "Drive traffic, generate leads, and grow your brand online",
        description: "A great website means nothing without visitors. I develop data-driven digital marketing strategies that bring the right audience to your door. From SEO and paid search to email campaigns and social media, every channel works together toward your business goals.",
        icon: "trending-up",
        features: [
          "SEO audits and on-page optimization",
          "Google Ads and paid search management",
          "Email marketing campaigns and automation",
          "Social media strategy and content planning",
          "Competitor analysis and market research",
          "Content strategy and copywriting",
        ],
        technologies: getSkillIds(["SEO/SEM", "Google Analytics", "HubSpot", "Email Marketing Automation", "Data Analysis & Reporting"]),
        displayOrder: 3,
        featured: true,
        visible: true,
      },
      {
        title: "Analytics & Optimization",
        slug: "analytics-optimization",
        headline: "Know what's working, fix what isn't",
        description: "I set up comprehensive tracking and analytics so you can make decisions based on data, not gut feelings. From Google Analytics configuration to conversion rate optimization, I help you understand your users and continuously improve your results.",
        icon: "bar-chart",
        features: [
          "Google Analytics 4 setup and configuration",
          "Conversion tracking and goal setup",
          "Custom dashboards and reporting",
          "A/B testing and experimentation",
          "User behavior analysis with heatmaps",
          "Monthly performance reporting",
        ],
        technologies: getSkillIds(["Google Analytics", "SEO/SEM", "HubSpot", "Data Analysis & Reporting", "Campaign Attribution Modeling"]),
        displayOrder: 4,
        featured: false,
        visible: true,
      },
      {
        title: "Marketing Automation",
        slug: "marketing-automation",
        headline: "Put your marketing on autopilot",
        description: "Stop doing repetitive marketing tasks manually. I build automated workflows that nurture leads, onboard customers, and re-engage inactive users — all while you focus on running your business. From HubSpot to custom solutions, I make your marketing work while you sleep.",
        icon: "zap",
        features: [
          "HubSpot CRM setup and optimization",
          "Email drip campaigns and sequences",
          "Lead scoring and qualification workflows",
          "Customer onboarding automation",
          "CRM integration with your website",
          "Workflow design and implementation",
        ],
        technologies: getSkillIds(["HubSpot", "Email Marketing Automation", "REST API Design", "Node.js"]),
        displayOrder: 5,
        featured: false,
        visible: true,
      },
    ]);
    console.log("Services seeded");

    // --- Site Settings ---
    await SiteSettings.deleteMany({});
    await SiteSettings.create({
      siteName: "Ellis Eden",
      siteTitle: "Full-Stack Developer & Digital Marketer",
      siteDescription: "I build fast, scalable web applications and drive growth through data-driven digital marketing. From React and Node.js to HubSpot and analytics — I bridge the gap between development and marketing.",
      githubUrl: "https://github.com/jellisedens",
      linkedinUrl: "",
      twitterUrl: "",
      websiteUrl: "",
      colorPrimary: "#2563eb",
      colorPrimaryDark: "#1d4ed8",
      colorPrimaryLight: "#dbeafe",
      colorAccent: "#2563eb",
      colorCharcoal: "#1c1c1c",
      colorCharcoalLight: "#252525",
      colorBackground: "#ffffff",
      colorSurface: "#ffffff",
      colorSurfaceAlt: "#f9fafb",
      colorText: "#1a1a1a",
      colorTextMuted: "#6b7280",
      colorTextLight: "#9ca3af",
      colorTextInverse: "#ffffff",
      fontHeading: "DM Sans",
      fontBody: "Inter",
    });
    console.log("Site settings seeded");

    console.log("\nSeed completed successfully!");
    console.log(`  Categories: ${categories.length}`);
    console.log(`  Skills:     ${skills.length}`);
    console.log(`  Education:  ${education.length}`);
    console.log(`  Experience: ${experience.length}`);
    console.log(`  Projects:   ${projects.length}`);
     console.log(`  Services:   ${services.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();