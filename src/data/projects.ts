export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  metrics: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "alumni-association-platform",

    title: "Alumni Association Platform",

    client: "Smart India Hackathon",

    year: "2026",

    role: "Full-Stack Developer",

    summary:
      "A centralized alumni management platform designed to improve communication, networking, event management, donations, and career opportunities between alumni and institutions.",

    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],

    metrics: [
      { label: "Architecture", value: "Full Stack" },
      { label: "Database", value: "MongoDB" },
      { label: "Focus", value: "Community Platform" },
    ],
  },

  {
    slug: "ai-healthcare-system",

    title: "AI Enhanced Healthcare System",

    client: "Academic Project",

    year: "2026",

    role: "Software Developer",

    summary:
      "An AI-powered healthcare platform focused on patient data analysis, symptom monitoring, and intelligent health recommendations using machine learning concepts.",

    stack: [
      "Python",
      "React",
      "Flask",
      "Machine Learning",
      "TensorFlow",
    ],

    metrics: [
      { label: "System", value: "AI Assisted" },
      { label: "Analysis", value: "Real-Time" },
      { label: "Focus", value: "Healthcare Tech" },
    ],
  },

  {
    slug: "career-connect",

    title: "CareerConnect Job Portal",

    client: "Personal Project",

    year: "2025",

    role: "Frontend Developer",

    summary:
      "A modern job portal platform enabling recruiters and applicants to manage job listings, applications, profiles, and hiring workflows efficiently.",

    stack: [
      "React",
      "Firebase",
      "Tailwind CSS",
      "JavaScript",
    ],

    metrics: [
      { label: "Platform", value: "Responsive Web App" },
      { label: "Authentication", value: "Firebase Auth" },
      { label: "UI", value: "Modern Interface" },
    ],
  },

  {
    slug: "nova-dashboard",

    title: "Nova Analytics Dashboard",

    client: "Concept Project",

    year: "2025",

    role: "Frontend Engineer",

    summary:
      "A sleek analytics dashboard designed for visualizing user engagement, traffic metrics, and business insights with dynamic charts and real-time updates.",

    stack: [
      "React",
      "TypeScript",
      "Chart.js",
      "Tailwind CSS",
    ],

    metrics: [
      { label: "Dashboard", value: "Interactive" },
      { label: "Performance", value: "Optimized" },
      { label: "Data", value: "Real-Time Charts" },
    ],
  },

  {
    slug: "nexus-cloud",

    title: "Nexus Cloud Workspace",

    client: "Experimental Project",

    year: "2024",

    role: "Full-Stack Developer",

    summary:
      "A collaborative cloud workspace for managing files, team communication, and project workflows within a unified productivity environment.",

    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Socket.io",
    ],

    metrics: [
      { label: "Collaboration", value: "Live Sync" },
      { label: "Backend", value: "Node.js" },
      { label: "Experience", value: "Realtime Workspace" },
    ],
  },
];
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
