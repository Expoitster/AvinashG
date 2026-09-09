// Single source of truth for all site copy.
// Facts/metrics are sourced from Avinash's resume. Sub-section labels for
// technical architecture (e.g. dialer vendors, bot-builder components) come
// directly from the sitemap specification he provided.

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Journey", href: "/journey" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "Product Thinking", href: "/product-thinking" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];

export const persistentCta: NavItem = { label: "Let's Connect", href: "/contact" };

export const profile = {
  name: "Avinashdev Ravikumar Garudapalli",
  shortName: "Avinash",
  role: "AI Product Manager",
  positioning: "AI × Product × UX × Business",
  email: "avinashdevg09@gmail.com",
  phone: "+91 7303486776",
  linkedin: "https://www.linkedin.com/in/avinashdev09/",
  summary:
    "Associate Product Manager with 2+ years of experience building 0-to-1 AI and SaaS products, including Voice AI and Generative AI solutions. Proven track record of driving measurable outcomes through product strategy, automation, and data-driven execution. Experienced in cross-functional leadership, product roadmapping, UX strategy, and end-to-end business ownership.",
};

export const impactSnapshot = [
  { label: "Voice AI Latency", value: "−50%", detail: "Reduced through AI workflow optimization and noise suppression at Chat360" },
  { label: "MRR Growth", value: "+50%", detail: "Scaled Nosh House's Monthly Recurring Revenue as Founder" },
  { label: "Support Queries", value: "−20%", detail: "Reduced via Voice AI across customer touchpoints at Cordelia Cruises" },
  { label: "Operational Cost", value: "−15%", detail: "Cut by automating customer interactions with Voice AI at Cordelia Cruises" },
  { label: "QA Turnaround", value: "−20%", detail: "Improved through AI-powered Auto QA workflow automation at Cordelia Cruises" },
  { label: "Break-even", value: "9 mo", detail: "Achieved operational break-even at Nosh House as Founder" },
];

export const careerEvolution = [
  { stage: "Leadership", role: "Sponsorship Head, College Fest", period: "Jan’18–Mar’18" },
  { stage: "Business Development", role: "BD Manager, AIESEC", period: "Mar’20–Aug’20" },
  { stage: "UX / Design", role: "UI/UX Designer, Yapita Health", period: "Jun’23–Aug’23" },
  { stage: "Product Management", role: "Product Analyst, Cordelia Cruises", period: "Nov’23–Jan’25" },
  { stage: "AI Product Management", role: "Associate PM, Chat360", period: "Jan’25–Jun’25" },
  { stage: "Business Ownership", role: "Founder, Nosh House Cafe", period: "May’25–Present" },
];

export const capabilityMap = [
  { id: "ai-product", label: "AI Product", description: "Voice AI, GenAI billing, agentic workflows, LLM orchestration" },
  { id: "product-strategy", label: "Product Strategy", description: "Roadmapping, prioritization, MVP scoping, business alignment" },
  { id: "ux", label: "UX", description: "Research, journeys, wireframes, prototypes, usability testing" },
  { id: "analytics", label: "Analytics", description: "Funnel, flow, sentiment and KPI dashboards for decision-making" },
  { id: "technical-product", label: "Technical Product", description: "APIs, webhooks, architecture trade-offs, cross-functional execution" },
  { id: "business-growth", label: "Business / Growth", description: "Acquisition, retention, revenue and operations ownership" },
];

export type Metric = { label: string; value: string };
export type Section = { id: string; heading: string; body: string[] };
export type Initiative = {
  title: string;
  summary: string;
  tags: string[];
  detail: string[];
};

export type CaseStudy = {
  slug: string;
  company: string;
  roleTitle: string;
  context: string;
  period: string;
  location: string;
  tagline: string;
  overview: string;
  myRole: string;
  team: string;
  problem: string;
  whyItMattered: string;
  users: string;
  metrics: Metric[];
  initiatives: Initiative[];
  challenges: string[];
  learnings: string[];
  related: string[];
  capabilities: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "chat360",
    company: "Chat360",
    roleTitle: "Associate Product Manager",
    context: "Voice & Gen AI Enterprise Solutions",
    period: "Jan 2025 – Jun 2025",
    location: "Pune",
    tagline: "Taking an enterprise Voice AI platform from 0 to 1",
    overview:
      "Chat360 builds conversational AI infrastructure — Voice, WhatsApp, SMS, Email and RCS — for enterprise customer engagement. I owned the 0-to-1 launch of the Voice AI platform end to end, from architecture decisions through to the analytics that customers use to run their contact centers.",
    myRole:
      "Associate Product Manager, owning Voice AI, Bot Builder, GenAI billing, omnichannel expansion, enterprise RBAC and product analytics.",
    team: "Coordinated an 8–10 member cross-functional team spanning engineering, design and QA.",
    problem:
      "Enterprises running high-volume outbound and inbound calling needed a Voice AI layer that could sit on top of their existing telephony and dialer stack without breaking latency, tone, or turn-taking — the parts of a phone conversation that make it feel human rather than robotic.",
    whyItMattered:
      "Voice is the highest-trust, highest-friction channel in enterprise support and sales. Getting it wrong (laggy responses, talking over the customer, robotic TTS) directly costs conversions and support satisfaction, so the platform's credibility depended on this launch working well.",
    users: "Enterprise contact-center teams, their agents, and the end customers calling in or being called.",
    metrics: [
      { label: "Voice latency", value: "−50%" },
      { label: "Omnichannel coverage", value: "5 channels" },
      { label: "Cross-functional team", value: "8–10 people" },
    ],
    capabilities: ["ai-product", "technical-product", "analytics", "ux", "product-strategy"],
    initiatives: [
      {
        title: "Voice AI",
        summary:
          "Core conversational voice pipeline: telephony, dialers, speech-to-text, the LLM, text-to-speech, voice-activity detection and noise suppression working together in real time.",
        tags: ["AI", "Technical Product", "UX", "Analytics"],
        detail: [
          "Architecture spanned telephony, dialers, STT, LLM, TTS, VAD and noise suppression — each stage adds latency, so the platform had to be reasoned about as a pipeline, not a single model call.",
          "Dialer integrations covered Ozonetel, Tubelight, SIP and NEOX Dialer, each with different call-control and webhook behavior that Bot Builder flows needed to account for.",
          "Voice experience decisions centered on latency, turn-taking, handling interruptions gracefully, and giving customers a TTS preview before committing to a voice.",
          "Model management spanned GPT-4o and Azure GPT-4.1 Mini, balancing response quality against cost and latency per use case.",
          "Vendor ecosystem included Murf AI and Narration BOX for TTS, and Uniphore and Kore.ai for adjacent conversational AI capability.",
        ],
      },
      {
        title: "Latency Optimization",
        summary: "Reduced voice latency by 50% by finding and fixing the real bottleneck in the pipeline.",
        tags: ["Technical Product", "Root Cause Analysis"],
        detail: [
          "Problem: end-to-end response time was too slow for a natural phone conversation — customers noticed the pause before the AI replied.",
          "Root cause analysis traced the delay across the STT → LLM → TTS chain rather than assuming any single vendor was at fault.",
          "Optimization combined AI workflow tuning with noise suppression, cutting wasted processing on noisy audio before it reached the model.",
          "Outcome: a 50% reduction in voice latency, directly improving how natural the conversation felt to callers.",
        ],
      },
      {
        title: "Bot Builder",
        summary: "A visual flow builder enterprises use to design their own conversational flows.",
        tags: ["Product Design", "APIs", "Enterprise SaaS"],
        detail: [
          "Component library: Name, Email, Phone, OTP/Date capture, Webhook calls, Conditional branching, GenAI nodes and Informational messages.",
          "Supported variables and branching logic so flows could adapt based on what the customer said or entered.",
          "Every node could call out via API/webhooks, letting enterprises connect flows to their own backend systems.",
          "UX focus was on making a technically complex flow graph usable by non-engineers on the customer side.",
        ],
      },
      {
        title: "GenAI Billing",
        summary: "Usage-based billing model for AI-consuming features across the platform.",
        tags: ["Business Model", "Technical Product"],
        detail: [
          "Modeled usage economics around a wallet system, supporting both query-based and per-call billing.",
          "Designed deduction, refund and retry/failure-handling logic so customers were never charged for failed AI calls.",
        ],
      },
      {
        title: "Omnichannel",
        summary: "Scaled support from voice-only to 5 channels: Voice, WhatsApp, SMS, Email and RCS.",
        tags: ["Product Strategy", "Enterprise Adoption"],
        detail: [
          "Each channel required its own delivery and fallback logic while sharing the same underlying bot flows and analytics.",
          "This expansion was central to broader enterprise adoption — customers could meet their users on whichever channel converted best.",
        ],
      },
      {
        title: "Campaign Management",
        summary: "Tooling for enterprises to run outbound campaigns at scale.",
        tags: ["Product Design"],
        detail: [
          "Covered campaign creation, contact management, agent mapping, scheduling, retry logic and callback logic.",
        ],
      },
      {
        title: "Enterprise RBAC",
        summary: "Role-based access control for large enterprise teams.",
        tags: ["Enterprise SaaS"],
        detail: [
          "Covered role management, granular permissions, dynamic RBAC and a Super Admin tier for platform-level control.",
        ],
      },
      {
        title: "Product Analytics",
        summary: "Custom analytics dashboards for KPI tracking and decision-making.",
        tags: ["Analytics"],
        detail: [
          "Dashboards covered call analytics, funnel analytics, flow analytics, keyword analytics, sentiment, lead journey, AHT, call score, cost per call and time-based trends.",
          "Designed so enterprise customers could self-serve the answer to “is this campaign working” without asking their AE.",
        ],
      },
      {
        title: "UX Strategy",
        summary: "Directed research, wireframes and prototypes for the platform.",
        tags: ["UX", "Research"],
        detail: [
          "Delivered wireframes and prototypes via Figma, Lovable and Claude AI, iterating quickly with engineering.",
        ],
      },
      {
        title: "Product Strategy",
        summary: "Defined the 1-year product roadmap.",
        tags: ["Product Strategy", "Business Impact"],
        detail: [
          "Balanced roadmap prioritization, MVP scoping, API integrations and cross-functional execution against business impact.",
        ],
      },
    ],
    challenges: [
      "Coordinating an 8–10 person cross-functional team across a platform with many moving technical parts (dialers, models, billing, RBAC) at once.",
      "Diagnosing latency issues that could have originated in any one of five pipeline stages, not just the obvious one.",
    ],
    learnings: [
      "In voice products, perceived quality is a systems problem — no single vendor swap fixes latency; the whole pipeline has to be instrumented.",
      "Enterprise billing and RBAC are not “back office” concerns for an AI product — they shape which use cases customers trust enough to scale.",
    ],
    related: ["cordelia-cruises", "product-thinking"],
  },
  {
    slug: "cordelia-cruises",
    company: "Cordelia Cruises",
    roleTitle: "Product Analyst",
    context: "AI Initiatives & Platform Revamps",
    period: "Nov 2023 – Jan 2025",
    location: "Mumbai",
    tagline: "0-to-1 mobile app, a centralized CMS, and Voice AI across customer touchpoints",
    overview:
      "Cordelia Cruises needed a modern, customer-facing digital layer — a mobile app, a CMS to manage content across channels, and AI to reduce the operational load on support. I worked across all three, from discovery through to launch.",
    myRole:
      "Product Analyst, leading the 0-to-1 mobile app build and owning the CMS, Voice AI and AI Auto QA initiatives.",
    team: "Collaborated directly with engineering and design teams to ship the mobile application.",
    problem:
      "Customers booking and managing cruises had no dedicated mobile experience, content across digital channels was managed inconsistently, and support queries were consuming disproportionate operational time.",
    whyItMattered:
      "A cruise booking is a high-consideration, multi-touchpoint purchase — customers need a reliable app before and during the trip, and the business needed to serve that without linearly scaling support headcount.",
    users: "Cruise customers booking, managing and traveling with Cordelia, plus internal content and support teams.",
    metrics: [
      { label: "Support queries", value: "−20%" },
      { label: "Operational costs", value: "−15%" },
      { label: "QA turnaround time", value: "−20%" },
    ],
    capabilities: ["technical-product", "ux", "ai-product", "business-growth"],
    initiatives: [
      {
        title: "Mobile Application",
        summary: "Led the 0-to-1 development of a customer-facing mobile app.",
        tags: ["0→1 Launch", "UX"],
        detail: [
          "Discovery mapped the end-to-end customer journey from booking through onboard experience.",
          "Translated journey insights into UX flows and product requirements alongside engineering and design.",
          "Shipped as a 0→1 launch — the company's first dedicated customer-facing mobile app.",
        ],
      },
      {
        title: "Centralized CMS",
        summary: "Built a CMS to streamline content management across multiple digital channels.",
        tags: ["Technical Product", "Operations"],
        detail: [
          "Problem: content for the app, web and marketing channels was managed separately, creating inconsistency and duplicated work.",
          "Designed a CMS workflow that let the content team publish once and distribute across channels.",
          "Reduced operational overhead for the team maintaining multi-channel content.",
        ],
      },
      {
        title: "Voice AI",
        summary: "Implemented Voice AI across customer touchpoints, cutting support queries by 20%.",
        tags: ["AI", "Business Impact"],
        detail: [
          "Automated common customer interactions that previously required a human agent.",
          "Reduced operational costs by 15% by shifting routine interactions to Voice AI.",
        ],
      },
      {
        title: "AI Auto QA",
        summary: "Delivered an AI-powered Auto QA solution, improving turnaround time by 20%.",
        tags: ["AI", "Process Optimization"],
        detail: [
          "The existing QA process relied on manual review, creating a bottleneck as volume grew.",
          "Automated the workflow with AI, cutting QA turnaround time by 20% without sacrificing quality.",
        ],
      },
    ],
    challenges: [
      "Shipping a first-ever mobile app while simultaneously standing up the CMS it would depend on for content.",
      "Introducing Voice AI into an existing support workflow without degrading customer experience during the transition.",
    ],
    learnings: [
      "0-to-1 products succeed or fail on the discovery work done before a single screen is designed.",
      "Automation initiatives (Voice AI, Auto QA) land best when scoped to the highest-volume, lowest-judgment interactions first.",
    ],
    related: ["chat360", "nosh-house"],
  },
  {
    slug: "nosh-house",
    company: "Nosh House Cafe",
    roleTitle: "Founder",
    context: "Family Business",
    period: "May 2025 – Present",
    location: "Mumbai",
    tagline: "From family cafe to a 50% MRR-growth, break-even business",
    overview:
      "Taking on a family cafe as Founder meant owning every layer of the business — acquisition, digital ordering, operations and retention — not just the product layer. It's the clearest evidence of end-to-end business ownership in my background.",
    myRole: "Founder, owning strategy, growth, operations and the digital product end to end.",
    team: "Worked directly with on-ground operations staff and external tools (Reelo, Petpooja) rather than a dedicated product team.",
    problem:
      "The business needed to become self-sustaining — acquiring customers efficiently, converting them through a fast digital ordering flow, and retaining them without relying on discounting alone.",
    whyItMattered:
      "As Founder, every metric (AOV, margins, service speed, capital efficiency) is a personal outcome, not a dashboard someone else owns — it's the highest-accountability project in my career so far.",
    users: "Walk-in and delivery customers, plus repeat customers targeted through loyalty and WhatsApp campaigns.",
    metrics: [
      { label: "MRR growth", value: "+50%" },
      { label: "Break-even", value: "9 months" },
    ],
    capabilities: ["business-growth", "product-strategy", "technical-product"],
    initiatives: [
      {
        title: "Business Transformation",
        summary: "Achieved operational break-even within 9 months of taking over.",
        tags: ["Business Impact"],
        detail: [
          "Business context spanned customer acquisition cost, average order value, margins, service speed and capital efficiency — all had to move together to reach break-even.",
        ],
      },
      {
        title: "Digital Ordering",
        summary: "Digital product covering QR ordering, cart and payments.",
        tags: ["Digital Product"],
        detail: [
          "Customer journey redesigned across discovery, visit, menu, order, payment, fulfilment and retention.",
          "Integrated Petpooja for point-of-sale and order management alongside the customer-facing ordering flow.",
        ],
      },
      {
        title: "Growth",
        summary: "Integrated Reelo to automate WhatsApp marketing campaigns.",
        tags: ["Growth", "Automation"],
        detail: [
          "Combined WhatsApp automation with loyalty programs to boost customer retention.",
          "Growth loop covered acquisition, WhatsApp, campaigns, loyalty and retention as one connected system rather than one-off promotions.",
        ],
      },
      {
        title: "Operations",
        summary: "Optimized delivery operations with revenue-increasing SOPs.",
        tags: ["Operations", "SOP Design"],
        detail: [
          "Redesigned delivery and service SOPs specifically to increase revenue per order, not just to cut cost.",
          "Process optimization work directly supported the MRR growth and break-even outcomes above.",
        ],
      },
    ],
    challenges: [
      "Balancing short-term cash flow needs against investments (like Reelo and Petpooja integration) that only pay off over months.",
      "Improving service speed and margins simultaneously — two metrics that usually trade off against each other.",
    ],
    learnings: [
      "Owning a full P&L changes how you prioritize — every roadmap decision gets weighed against cash flow, not just user value.",
      "Automation (WhatsApp via Reelo) only compounds retention when paired with an operational reason for customers to come back (loyalty, service speed).",
    ],
    related: ["chat360", "cordelia-cruises"],
  },
  {
    slug: "yapita-health",
    company: "Yapita Health",
    roleTitle: "UI/UX Designer",
    context: "Internship",
    period: "Jun 2023 – Aug 2023",
    location: "Gurugram",
    tagline: "Designing an AI healthcare chatbot from concept to working product",
    overview:
      "My foundation in UX — taking an AI healthcare chatbot from a rough concept through user research, journeys and prototypes to a working, tested product.",
    myRole: "UI/UX Designer, owning research, journey mapping, wireframes and prototypes.",
    team: "Internship within Yapita Health's product team.",
    problem:
      "Patients needed an approachable way to interact with an AI healthcare chatbot, but early concepts hadn't been validated with real users.",
    whyItMattered:
      "Healthcare interfaces carry higher trust and clarity requirements than most products — getting onboarding and comprehension wrong has real consequences for users.",
    users: "Patients onboarding to an AI healthcare chatbot for the first time.",
    metrics: [{ label: "Engagement & inbound leads", value: "Increased" }],
    capabilities: ["ux", "ai-product"],
    initiatives: [
      {
        title: "AI Healthcare Chatbot",
        summary: "Designed the chatbot experience from concept to working product.",
        tags: ["UX Design"],
        detail: [
          "Created user journeys, wireframes and prototypes focused on improving onboarding and overall customer experience.",
        ],
      },
      {
        title: "User Research",
        summary: "Conducted research and usability analysis to find UX improvement opportunities.",
        tags: ["Research"],
        detail: [
          "Findings directly informed iteration on the onboarding flow and chatbot interaction patterns.",
        ],
      },
      {
        title: "Landing Page",
        summary: "Optimized landing pages using customer feedback and interaction analytics.",
        tags: ["Growth", "UX"],
        detail: ["Increased engagement and inbound leads as a direct result of the optimization."],
      },
    ],
    challenges: ["Designing trust and clarity into an AI healthcare product for first-time users with no prior mental model for it."],
    learnings: ["Usability testing early — even on a rough concept — surfaces onboarding problems that are far cheaper to fix before build than after."],
    related: ["chat360", "product-thinking"],
  },
  {
    slug: "events-fusion",
    company: "Events Fusion",
    roleTitle: "UI/UX Designer",
    context: "Project",
    period: "Sep 2025 – Mar 2026",
    location: "Remote",
    tagline: "Executive-ready B2B pitch decks and sharper sales operations",
    overview:
      "A design-and-operations project: building pitch decks that hold up in front of enterprise stakeholders, and tightening the sales process around them.",
    myRole: "UI/UX Designer, responsible for deck design and sales operations improvements.",
    team: "Worked directly with sales stakeholders across industries.",
    problem:
      "Generic pitch decks were slowing down enterprise deal cycles and weakening client engagement.",
    whyItMattered:
      "In enterprise sales, the deck is often the first tangible artifact a stakeholder judges the company by — clarity and information architecture directly affect deal velocity.",
    users: "Enterprise stakeholders evaluating a B2B pitch, and the internal sales team presenting it.",
    metrics: [{ label: "Client engagement", value: "Strengthened" }, { label: "Deal closures", value: "Accelerated" }],
    capabilities: ["ux", "business-growth"],
    initiatives: [
      {
        title: "B2B Pitch Decks",
        summary: "Created executive-ready decks tailored to diverse industries.",
        tags: ["Executive Storytelling"],
        detail: ["Applied information architecture principles to structure decks for how executives actually skim and decide."],
      },
      {
        title: "Sales Operations",
        summary: "Optimized sales operations to improve stakeholder communication.",
        tags: ["Sales Operations"],
        detail: ["Streamlined the handoff between deck delivery and stakeholder follow-up to accelerate enterprise deal closures."],
      },
    ],
    challenges: ["Tailoring the same core narrative credibly across industries with very different buying criteria."],
    learnings: ["Deck information architecture is a UX problem — the same hierarchy and clarity principles apply as in product design."],
    related: ["chat360", "yapita-health"],
  },
];

export const journeyStages = [
  {
    id: "leadership",
    title: "Leadership & Business",
    period: "2018 – 2020",
    entries: [
      {
        org: "College Fest",
        role: "Sponsorship Head",
        period: "Jan’18–Mar’18",
        location: "Pune",
        points: [
          "Secured 7–8 sponsors and onboarded 20 stalls for the university's inaugural engineering fest",
          "End-to-end stakeholder management and event execution",
        ],
      },
      {
        org: "AIESEC",
        role: "Business Development Manager",
        period: "Mar’20–Aug’20",
        location: "Pune",
        points: [
          "Ranked #2 in Pune driving digital customer acquisition through data-driven outreach during COVID-19",
          "Built partnerships with corporate stakeholders, gathering requirements and ensuring seamless cross-functional execution",
        ],
      },
    ],
  },
  {
    id: "ux-foundation",
    title: "UX & Design Foundation",
    period: "2023",
    entries: [
      {
        org: "Yapita Health",
        role: "UI/UX Designer",
        period: "Jun’23–Aug’23",
        location: "Gurugram",
        points: [
          "Designed an AI Healthcare Chatbot from concept to working product",
          "Created user journeys, wireframes and prototypes to improve onboarding and customer experience",
        ],
      },
    ],
  },
  {
    id: "product-foundation",
    title: "Product Foundation",
    period: "2023 – 2025",
    entries: [
      {
        org: "Cordelia Cruises",
        role: "Product Analyst",
        period: "Nov’23–Jan’25",
        location: "Mumbai",
        points: [
          "Led the 0-to-1 development of a customer-facing mobile application",
          "Built a centralized CMS and delivered Voice AI plus AI Auto QA initiatives",
        ],
      },
    ],
  },
  {
    id: "ai-pm",
    title: "AI Product Management",
    period: "2025",
    entries: [
      {
        org: "Chat360",
        role: "Associate Product Manager",
        period: "Jan’25–Jun’25",
        location: "Pune",
        points: [
          "Led the 0-to-1 launch of an enterprise Voice AI platform, coordinating an 8–10 member cross-functional team",
          "Reduced voice latency by 50% and scaled omnichannel support to 5 channels",
        ],
      },
    ],
  },
  {
    id: "business-ownership",
    title: "Business Ownership",
    period: "2025 – Present",
    entries: [
      {
        org: "Nosh House Cafe",
        role: "Founder",
        period: "May’25–Present",
        location: "Mumbai",
        points: [
          "Achieved operational break-even within 9 months and scaled MRR by 50%",
          "Automated WhatsApp marketing via Reelo and optimized delivery operations",
        ],
      },
    ],
  },
  {
    id: "current-direction",
    title: "Current Direction",
    period: "Present →",
    entries: [
      {
        org: "AI / Agentic Product Management",
        role: "Post Graduate Program, Masters’ Union",
        period: "2026–Present",
        location: "Gurugram",
        points: ["Studying Technology and Business Management, building toward agentic AI product management"],
      },
    ],
  },
];

export const aiLab = [
  {
    slug: "travel-discovery",
    title: "Travel Discovery Platform",
    status: "Prototype",
    problem:
      "Travel research is fragmented across Instagram, Reddit and Google Reviews, forcing travelers to piece together trustworthy recommendations manually.",
    approach:
      "Explored pulling signal from Instagram, Reddit and Google Reviews into one personalization layer combining location intelligence with a recommendation engine, tackling the underlying data fragmentation problem directly.",
    components: ["Data Fragmentation", "Personalization", "Location Intelligence", "Recommendation Engine"],
  },
  {
    slug: "courier-ai",
    title: "Courier AI",
    status: "Concept",
    problem:
      "Estimating shipping dimensions and weight manually is slow and error-prone for courier and logistics use cases.",
    approach:
      "Prototyped using image input and computer vision to estimate package dimensions and weight, feeding into a shipping recommendation step.",
    components: ["Image Input", "Computer Vision", "Dimension Estimation", "Weight Estimation", "Shipping Recommendation"],
  },
  {
    slug: "workforce-intelligence",
    title: "Workforce Intelligence",
    status: "Prototype",
    problem:
      "Understanding a team's real capability coverage against business requirements is hard when employee data lives across disconnected tools.",
    approach:
      "Built a capability matrix and intelligence log against business requirements, orchestrating ClickUp, Google Sheets, Gemini and Make.com to keep a live view of capability health.",
    components: ["Capability Matrix", "Intelligence Log", "Capability Health", "ClickUp", "Google Sheets", "Gemini", "Make.com"],
  },
];

export const productFramework = [
  { step: "01", name: "Discover", detail: "User research, customer insights, market research, problem discovery" },
  { step: "02", name: "Define", detail: "Problem statement, personas, jobs-to-be-done, success criteria" },
  { step: "03", name: "Prioritize", detail: "Impact, effort, business value, strategic alignment" },
  { step: "04", name: "Design", detail: "Customer journey, user flow, wireframes, prototypes" },
  { step: "05", name: "Build", detail: "PRDs, user stories, acceptance criteria, APIs, integrations, QA" },
  { step: "06", name: "Launch", detail: "MVP, go-to-market, adoption, monitoring" },
  { step: "07", name: "Measure", detail: "KPIs, funnel, retention, revenue, business impact" },
];

export const certifications = [
  { name: "Product Management with Generative & Agentic AI", org: "BITS Pilani", period: "May 2026", note: "Building AI Products and Products with AI from first-principles perspective" },
  { name: "Design for the 21st Century with Don Norman", org: "IXDF — The Interaction Design Foundation", period: "May 2023", note: "Mastering humanity-centered design, systems thinking, and complex sociotechnical problem-solving" },
  { name: "UI UX Design Mastery", org: "Designerss Academy", period: "Apr 2023", note: "Developed design muscle memory and conducted usability testing to streamline user journeys" },
  { name: "User Experience: The Beginner’s Guide", org: "IXDF — The Interaction Design Foundation", period: "Nov 2022", note: "Mastering human-centered design, user research, and design thinking frameworks" },
];

export const education = [
  { school: "Masters’ Union", program: "Post Graduate Program in Technology and Business Management", period: "2026–Present", location: "Gurugram" },
  { school: "Maharashtra Institute of Technology Art, Design & Technology", program: "B.Tech in Computer Science", period: "2017–2022", location: "Pune" },
  { school: "Sri Chaitanya", program: "Telangana State Board, Class 12", period: "2015–2017", location: "Hyderabad" },
];

export const skills = {
  business: [
    "Competitive Analysis", "Product Market Research", "KPI Tracking", "Funnel Analysis", "Root Cause Analysis",
    "Customer Acquisition", "Revenue Growth", "Cross-Functional Execution", "Project Management", "Process Optimization",
    "SOP Design", "Automation", "Stakeholder Management", "Customer Insights", "Product Strategy",
    "Feature Prioritization", "Product Roadmap", "User Journey",
  ],
  technical: [
    "Figma", "JIRA", "Confluence", "Google Analytics", "Canva", "Vibe Coding", "Agentic AI", "Generative AI",
    "Voice AI", "AI Workflow", "Prompt Engineering", "Automation", "AI Product Development",
  ],
};

export const beyondProduct = [
  "Completed a 4-day, 14,000-ft Himalayan trek carrying 20–25 kg, showcasing resilience and perseverance",
  "Certified in UCMAS Abacus (Level 4) with International Grade 10 Distinction",
  "Recognized for securing 1st place in Tug of War and 3rd place in the 400m race on the same day",
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
