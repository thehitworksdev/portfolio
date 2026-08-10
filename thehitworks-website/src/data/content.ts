import {
  Bot,
  Code2,
  Smartphone,
  Layers,
  Palette,
  Cloud,
  Server,
  GitBranch,
  Cpu,
  Workflow,
  Heart,
  GraduationCap,
  ShoppingCart,
  Factory,
  Landmark,
  Building2,
  Truck,
  BedDouble,
  Search,
  ClipboardList,
  ShieldCheck,
  Rocket,
  LifeBuoy,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
  { id: "portfolio", label: "Portfolio" },
  // { id: "case-studies", label: "Case Studies" },
  { id: "technologies", label: "Technologies" },
  { id: "about", label: "About" },
  // { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const SERVICES = [
  { id: "ai", icon: Bot, title: "AI Development", tagline: "Turn data into decisions",
    overview: "Custom AI models and intelligent systems that turn your data into decisions  from predictive analytics to computer vision.",
    benefits: ["Faster decisions with predictive models", "Automates manual analysis work", "Scales with your data, not your headcount", "Built on production-grade ML pipelines"],
    process: ["Data audit", "Model selection", "Training & tuning", "Integration", "Monitoring"],
    tech: ["Python", "PyTorch", "TensorFlow", "OpenAI API", "LangChain"],
    useCases: ["Demand forecasting", "Fraud detection", "Recommendation engines"],
    startingFrom: "₹75,000" },
  { id: "web", icon: Code2, title: "Web Development", tagline: "Built to handle real traffic",
    overview: "Fast, responsive web applications built on modern frameworks, engineered to handle real traffic and grow with you.",
    benefits: ["Sub-2s load times", "SEO-ready architecture", "Built for scale from day one", "Clean, handover-ready codebase"],
    process: ["Wireframing", "UI build", "API integration", "QA", "Launch"],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    useCases: ["Company websites", "Internal tools", "Customer portals"],
    startingFrom: "₹35,000" },
  { id: "mobile", icon: Smartphone, title: "Mobile Development", tagline: "One codebase, two platforms",
    overview: "Native-feeling iOS and Android apps from a single Flutter codebase, or fully native builds when performance demands it.",
    benefits: ["One codebase, two platforms", "App Store & Play Store ready", "Offline-first where it matters", "Push notifications & analytics built in"],
    process: ["Prototyping", "UI design", "Development", "Device testing", "Store submission"],
    tech: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
    useCases: ["Customer apps", "Field service apps", "On-demand platforms"],
    startingFrom: "₹60,000" },
  { id: "saas", icon: Layers, title: "SaaS Development", tagline: "Ready for your first customer",
    overview: "Multi-tenant SaaS platforms with billing, auth, and dashboards built in  ready to onboard your first paying customer.",
    benefits: ["Multi-tenant from the ground up", "Billing built in (Stripe/Razorpay)", "Role-based access control", "Usage analytics dashboard"],
    process: ["Product scoping", "Architecture", "MVP build", "Beta testing", "Scale-up"],
    tech: ["Next.js", "PostgreSQL", "Stripe", "AWS", "Redis"],
    useCases: ["B2B platforms", "Vertical SaaS", "Internal tools gone external"],
    startingFrom: "₹1,50,000" },
  // { id: "uiux", icon: Palette, title: "UI/UX Design", tagline: "Tested before it's built",
  //   overview: "Interfaces people actually enjoy using  researched, wireframed, and tested before a single line of code is written.",
  //   benefits: ["User research before design", "Clickable prototypes", "Design systems for consistency", "Accessibility built in"],
  //   process: ["Research", "Wireframes", "Visual design", "Prototype", "Handoff"],
  //   tech: ["Figma", "Framer", "Adobe XD"],
  //   useCases: ["Product redesigns", "New app UI", "Design systems"],
  //   startingFrom: "₹25,000" },
  { id: "cloud", icon: Cloud, title: "Cloud Deployment", tagline: "Infrastructure that stays up",
    overview: "Reliable infrastructure on AWS or Azure  provisioned, secured, and monitored so your app stays up.",
    benefits: ["Auto-scaling infrastructure", "Daily automated backups", "99.9% uptime target", "Cost-optimized architecture"],
    process: ["Infra audit", "Architecture design", "Migration", "Monitoring setup", "Handover"],
    tech: ["AWS", "Azure", "Docker", "Terraform", "Kubernetes"],
    useCases: ["App migrations", "New deployments", "Disaster recovery"],
    startingFrom: "₹20,000" },
  { id: "api", icon: Server, title: "API Development", tagline: "Documented and versioned",
    overview: "Documented, versioned APIs that your team  or your partners  can build on with confidence.",
    benefits: ["OpenAPI/Swagger documented", "Rate-limited & secured", "Versioned for safe upgrades", "Webhook support"],
    process: ["Spec design", "Development", "Testing", "Documentation", "Deployment"],
    tech: ["Node.js", "FastAPI", "GraphQL", "REST", "PostgreSQL"],
    useCases: ["Partner integrations", "Mobile app backends", "Third-party connectors"],
    startingFrom: "₹30,000" },
  { id: "devops", icon: GitBranch, title: "DevOps", tagline: "Ship daily, not quarterly",
    overview: "CI/CD pipelines and automated deployments so your team ships daily, not quarterly.",
    benefits: ["Automated testing on every push", "One-click rollbacks", "Infrastructure as code", "Deployment time cut by up to 90%"],
    process: ["Pipeline audit", "CI/CD setup", "Automation", "Monitoring", "Training"],
    tech: ["GitHub Actions", "Docker", "Kubernetes", "Terraform"],
    useCases: ["Release automation", "Environment management", "Monitoring & alerting"],
    startingFrom: "₹25,000" },
  { id: "agents", icon: Cpu, title: "AI Agents", tagline: "Handles the routine work",
    overview: "Autonomous agents that handle support tickets, data entry, and research  so your team handles the exceptions, not the routine.",
    benefits: ["Handles multi-step tasks unattended", "Connects to your existing tools", "Human-in-the-loop where it counts", "Learns from your documentation"],
    process: ["Use-case mapping", "Agent design", "Tool integration", "Testing", "Rollout"],
    tech: ["LangChain", "OpenAI API", "Claude API", "Vector DBs"],
    useCases: ["Support automation", "Research agents", "Data entry agents"],
    startingFrom: "₹90,000" },
  { id: "automation", icon: Workflow, title: "Business Automation", tagline: "Fewer hours on busywork",
    overview: "Automated workflows that eliminate repetitive manual work across your sales, ops, and finance teams.",
    benefits: ["Often saves 100+ hours/month", "Fewer manual errors", "Connects tools you already use", "No-code options for simple flows"],
    process: ["Process mapping", "Tool selection", "Automation build", "Testing", "Training"],
    tech: ["Zapier", "n8n", "Python", "REST APIs"],
    useCases: ["Invoice processing", "Lead routing", "Report generation"],
    startingFrom: "₹15,000" },
];

const INDUSTRIES = [
  { icon: Heart, title: "Healthcare",
    problems: ["Patient records scattered across systems", "Manual appointment scheduling", "No visibility into history at point of care"],
    solution: "Unified patient management platforms with EHR integration, automated scheduling, and secure record access.",
    benefits: ["Faster patient intake", "Fewer scheduling conflicts", "Careful, structured data handling"] },
  { icon: GraduationCap, title: "Education",
    problems: ["Fragmented learning tools", "No central view of student progress", "Manual grading and reporting"],
    solution: "LMS platforms and student portals that bring courses, grading, and communication into one place.",
    benefits: ["Higher course completion", "Automated progress tracking", "Parent & teacher visibility"] },
  { icon: ShoppingCart, title: "Retail",
    problems: ["Inventory out of sync across channels", "Manual order processing", "Limited customer insight"],
    solution: "E-commerce platforms with real-time inventory sync, automated order flows, and customer analytics.",
    benefits: ["Fewer stockouts", "Faster order fulfillment", "Personalized customer experience"] },
  { icon: Factory, title: "Manufacturing",
    problems: ["Manual production tracking", "No real-time equipment visibility", "Disconnected supply chain data"],
    solution: "IoT-connected dashboards and ERP integrations for real-time production and inventory visibility.",
    benefits: ["Reduced downtime", "Accurate production forecasting", "Streamlined supply chain"] },
  { icon: Landmark, title: "Finance",
    problems: ["Manual reconciliation", "Heavy compliance reporting overhead", "Fragmented financial data"],
    solution: "Secure financial platforms with automated reconciliation, reporting, and audit trails.",
    benefits: ["Faster month-end close", "Reduced compliance risk", "Real-time financial visibility"] },
  { icon: Building2, title: "Real Estate",
    problems: ["Manual listing management", "No centralized lead tracking", "Slow client communication"],
    solution: "Property management platforms with listing sync, CRM, and automated client updates.",
    benefits: ["Faster lead response", "Centralized property data", "Better client retention"] },
  { icon: Truck, title: "Logistics",
    problems: ["No real-time shipment visibility", "Manual route planning", "Disconnected fleet data"],
    solution: "Fleet tracking and route-optimization platforms with real-time shipment visibility.",
    benefits: ["Reduced delivery times", "Lower fuel costs", "Real-time customer updates"] },
  { icon: BedDouble, title: "Hospitality",
    problems: ["Manual booking management", "No unified guest view", "Disconnected POS and booking systems"],
    solution: "Booking and property management systems with integrated POS and guest CRM.",
    benefits: ["Fewer booking conflicts", "Higher repeat bookings", "Streamlined front-desk operations"] },
];

const PROJECTS = [
  {
    name: "BrightMinds Arena",
    category: "Education",
    tags: ["React", "Django", "Supabase"],
    problem:
      "Schools and teachers needed a centralized platform to manage students, learning materials, and restricted online assessments.",
    solution:
      "A school management platform with student management, teaching materials, tests, leaderboards, and high-restriction assessment controls.",
    result:
      "Centralized student management · Secure online assessments",
  },

  {
    name: "AwareNet",
    category: "Mobile",
    tags: ["Flutter", "Firebase", "Node.js"],
    problem:
      "A college hackathon required a connected mobile solution for farmer drought alerts and student scheme eligibility.",
    solution:
      "A Flutter Android MVP connected to Firebase Realtime Database and Node.js Cloud Functions with drought-alert, scheme-eligibility, and SMS workflows.",
    result:
      "Hackathon MVP · Real-time Firebase integration",
  },

  {
    name: "Clinical Guidance System",
    category: "AI / ML",
    tags: ["Python", "Flask", "Scikit-learn"],
    problem:
      "Users needed a way to analyze symptoms and receive structured health guidance based on multiple factors.",
    solution:
      "An AI-powered web platform using machine learning for symptom analysis, disease prediction, location and seasonal factors, and personalized guidance.",
    result:
      "19,000+ symptom records · Real-time predictions",
  },

  {
    name: "C-SARNet",
    category: "AI / ML",
    tags: ["React", "Django", "Deep Learning"],
    problem:
      "Synthetic Aperture Radar imagery is difficult to interpret without specialized visualization and analysis tools.",
    solution:
      "A deep-learning platform for analyzing and colorizing SAR imagery with an interactive React interface, Django API, and dedicated ML model.",
    result:
      "Interactive SAR analysis · Deep-learning image processing",
  },
  {
  name: "UDHAYAM 26",
  category: "Web",
  tags: ["React", "Event Platform", "Registration"],
  problem:
    "A college technical and cultural fest needed a digital platform to present the event, communicate its activities, manage passes, and provide participants with essential information.",
  solution:
    "A dedicated event platform for UDHAYAM 26 featuring fest information, event highlights, pass selection, registration details, gallery, coordinator contacts, and event countdown.",
  result:
    "Event information centralized · Online pass registration · Complete participant information hub",
},
];

const TESTIMONIALS = [
  { name: "Ananya Rao", role: "Operations Head, Vertex Health Clinics",
    quote: "They asked about our clinic's workflow before writing a single line of code. Our staff actually enjoy using the new system." },
  { name: "Karthik Subramaniam", role: "Founder, ShelfSense Retail",
    quote: "They shipped our MVP faster than we expected and were upfront every time a timeline shifted. That honesty mattered more than the speed." },
  { name: "Priya Menon", role: "COO, RouteWise Logistics",
    quote: "Our dispatch team stopped fighting spreadsheets within the first month. Support has stayed just as strong after launch as it was during development." },
];

const PROCESS_STEPS = [
  { level: "01", title: "Discovery", icon: Search, desc: "We dig into your business goals, users, and constraints before proposing a single feature." },
  { level: "02", title: "Planning", icon: ClipboardList, desc: "Scope, timeline, and architecture get locked into a roadmap you can see and approve." },
  { level: "03", title: "UI/UX", icon: Palette, desc: "Wireframes and prototypes get tested before development starts  surprises happen on paper." },
  { level: "04", title: "Development", icon: Code2, desc: "Built in sprints with regular check-ins, so you see progress every week, not just at the end." },
  { level: "05", title: "Testing", icon: ShieldCheck, desc: "Manual and automated testing across devices and edge cases before anything ships." },
  { level: "06", title: "Deployment", icon: Rocket, desc: "Released to production with monitoring in place from day one." },
  { level: "07", title: "Support", icon: LifeBuoy, desc: "We stay on after launch  monitoring, fixing, and improving as real users show up." },
];

const TECH_GROUPS = [
  { title: "Frontend", items: [{n:"React",p:95},{n:"Next.js",p:92},{n:"Flutter",p:88},{n:"Tailwind CSS",p:96}] },
  { title: "Backend", items: [{n:"Python",p:94},{n:"Django",p:88},{n:"FastAPI",p:90},{n:"Node.js",p:93}] },
  { title: "Database", items: [{n:"PostgreSQL",p:92},{n:"MongoDB",p:87},{n:"Firebase",p:89},{n:"Redis",p:85}] },
  { title: "AI", items: [{n:"OpenAI",p:93},{n:"Gemini",p:88},{n:"LangChain",p:90},{n:"Ollama",p:84},{n:"HuggingFace",p:86}] },
  { title: "Cloud & DevOps", items: [{n:"Docker",p:91},{n:"GitHub Actions",p:89},{n:"AWS",p:90},{n:"Azure",p:85},{n:"Linux",p:93},{n:"Kubernetes",p:83}] },
];

const FAQS_HOME = [
  { q: "How is pricing decided?", a: "Every project is scoped individually based on features, timeline, and integrations. We share a fixed quote before any work begins  not an hourly guess." },
  { q: "How long does a typical project take?", a: "A marketing website usually takes 3-4 weeks. A full SaaS MVP typically takes 8-14 weeks depending on scope." },
  { q: "Who owns the code once the project is done?", a: "You do, fully. Once final payment clears, all source code and IP transfer to you." },
  { q: "What happens after launch?", a: "Every project includes a support window post-launch. Ongoing plans are available after that for updates and monitoring." },
  { q: "Do you handle hosting and deployment?", a: "We can set up and manage hosting on AWS, Azure, or your platform of choice, or hand it off to your internal team." },
  { q: "Do you build MVPs for early-stage startups?", a: "Yes  it's a significant part of what we do, scoped tightly to test your core hypothesis first." },
];

const FAQS_FULL = [
  { cat: "Pricing", q: "How is pricing decided?", a: "Every project is scoped individually based on features, timeline, and integrations. We share a fixed quote before any work begins  not an hourly guess." },
  { cat: "Pricing", q: "Do you offer fixed-price or hourly billing?", a: "Both. Most projects run on fixed-price milestones; ongoing support and small changes can run hourly." },
  { cat: "Timeline", q: "How long does a typical project take?", a: "A marketing website usually takes 3-4 weeks. A full SaaS MVP typically takes 8-14 weeks depending on scope." },
  { cat: "Timeline", q: "What causes timelines to slip?", a: "Mostly late feedback or scope changes mid-build. We flag both immediately and re-quote the timeline rather than let it slide silently." },
  { cat: "Ownership", q: "Who owns the code once the project is done?", a: "You do, fully. Once final payment clears, all source code and IP transfer to you." },
  { cat: "Ownership", q: "Can I take the project to another developer later?", a: "Yes  we hand over a clean, documented codebase specifically so that's possible." },
  { cat: "Support", q: "What happens after launch?", a: "Every project includes a support window post-launch. Ongoing plans are available after that for updates and monitoring." },
  { cat: "Support", q: "How fast do you respond to support requests?", a: "Standard requests within 24 hours on business days. Critical issues get same-day attention." },
  { cat: "Maintenance", q: "Do you offer ongoing maintenance plans?", a: "Yes. Monthly retainers cover updates, security patches, and small feature requests." },
  { cat: "Hosting", q: "Do you handle hosting and deployment?", a: "We can set up and manage hosting on AWS, Azure, or your platform of choice, or hand it off to your internal team." },
  { cat: "Source Code", q: "Will I get access to the repository during development?", a: "Yes  you get access to a private repo from day one, not just at delivery." },
  { cat: "Payment", q: "What payment schedule do you use?", a: "Typically 50% upfront, milestone payments through development, and the final balance at delivery." },
  { cat: "Payment", q: "What payment methods do you accept?", a: "Bank transfer, UPI, and major cards through our payment processor." },
  { cat: "General", q: "Do you sign NDAs?", a: "Yes, before any detailed discussion, if you'd like one in place." },
  { cat: "General", q: "Can you work with our existing team?", a: "Yes  we regularly plug into existing teams as an extension, not just a standalone vendor." },
  { cat: "General", q: "Do you build MVPs for early-stage startups?", a: "Yes  it's a significant part of what we do, scoped tightly to test your core hypothesis first." },
];

const PRICING_TIERS = [
  { name: "Starter", price: "15000", note: "onwards", desc: "Landing pages & simple websites",
    features: ["Up to 5 pages", "Responsive design", "1 yr free domain", "2 rounds of revisions", "~2 weeks delivery"] },
  { name: "Professional", price: "50000", note: "onwards", desc: "Web apps & business platforms", popular: true,
    features: ["Custom web application", "API integrations", "Admin dashboard", "~6 weeks delivery", "30 days post-launch support"] },
  { name: "Enterprise", price: "100000", note: "onwards", desc: "Complex platforms & SaaS products",
    features: ["Multi-tenant architecture", "Dedicated project team", "Advanced security practices", "Scalable cloud infrastructure", "90 days post-launch support"] },
  { name: "Custom Quote", price: "Let's talk", note: "", desc: "AI systems, agents & unique builds",
    features: ["Tailored scope & timeline", "Flexible engagement models", "Dedicated technical lead", "Ongoing retainer options", "NDA available on request"] },
];

const BLOG_POSTS = [
  { title: "Top AI Trends Shaping Business Software in 2026", cat: "AI", read: "6 min",
    excerpt: "A look at where AI is actually delivering ROI for businesses right now  and where the hype still outpaces the results." },
  { title: "Why Every Business Needs Automation, Not Just AI", cat: "Automation", read: "5 min",
    excerpt: "Automation quietly saves more hours than most AI pilots ever will. Here's where to start looking in your own operations." },
  { title: "React vs Flutter: Picking the Right Stack for Your App", cat: "Mobile", read: "7 min",
    excerpt: "Two of the most popular ways to ship a mobile app, compared on cost, performance, and long-term maintainability." },
  { title: "Choosing the Right Database for Your Next Project", cat: "Backend", read: "6 min",
    excerpt: "SQL or NoSQL isn't really the question. Here's how we actually decide it for client projects." },
  { title: "How AI Can Reduce Operational Costs Without Cutting Corners", cat: "AI", read: "5 min",
    excerpt: "Practical, unglamorous ways teams are using AI to cut costs  beyond the chatbot everyone already tried." },
  { title: "Cloud vs Traditional Hosting: What Actually Matters", cat: "Cloud", read: "4 min",
    excerpt: "Uptime, cost, and scaling  a practical comparison for teams deciding where to host their next product." },
];

const JOBS = [
  { title: "Frontend Developer (React)", type: "Full-time", loc: "Remote / Coimbatore" },
  { title: "AI/ML Engineer", type: "Full-time", loc: "Remote" },
  { title: "UI/UX Designer", type: "Full-time", loc: "Coimbatore" },
  { title: "DevOps Engineer", type: "Contract", loc: "Remote" },
];

const TEAM = [
  { name: "Founder & CEO", role: "Product strategy & client partnerships" },
  { name: "Lead Engineer", role: "Architecture & technical delivery" },
  { name: "Design Lead", role: "UI/UX & design systems" },
  { name: "Client Success Lead", role: "Onboarding & ongoing support" },
];

export {
  NAV_ITEMS,
  SERVICES,
  INDUSTRIES,
  PROJECTS,
  TESTIMONIALS,
  PROCESS_STEPS,
  TECH_GROUPS,
  FAQS_HOME,
  FAQS_FULL,
  PRICING_TIERS,
  BLOG_POSTS,
  JOBS,
  TEAM,
};
