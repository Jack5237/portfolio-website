/**
 * Represents a showcase entry for the featured projects grid.
 */
export interface Project {
  /**
   * Primary label for the spotlighted work.
   */
  readonly title: string;
  /**
   * Describes the engagement format or category.
   */
  readonly category: string;
  /**
   * Supports describing the craft behind the project.
   */
  readonly discipline: string;
  /**
   * External link visitors can follow to learn more.
   */
  readonly href: string;
}

/**
 * Represents a technology or skill that has been learned.
 */
export interface Technology {
  /**
   * Name of the technology, framework, or tool.
   */
  readonly name: string;
  /**
   * Optional category grouping (e.g., "Languages", "Frameworks", "Tools").
   */
  readonly category?: string;
}

/**
 * Represents a company or organization where work has been completed.
 */
export interface Company {
  /**
   * Company name or brand.
   */
  readonly name: string;
  /**
   * Optional description of the role or engagement type.
   */
  readonly description?: string;
  /**
   * Optional URL to company website or work showcase.
   */
  readonly href?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    title: "Z3D.AI ",
    category: "AI Model Maker",
    discipline: "Full Stack Development",
    href: "#",
  },
  {
    title: "Rust-central",
    category: "Game-Server Management",
    discipline: "Full Stack Development",
    href: "#",
  },
  {
    title: "byte.com - Course Maker",
    category: "Educational Platform",
    discipline: "Full Stack Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
];

export const TECHNOLOGIES_LEARNED: Technology[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "Go", category: "Languages" },
  { name: "Node.js", category: "Runtime" },
  { name: "Next.js", category: "Frameworks" },
  { name: "React", category: "Frameworks" },
  { name: "Express.js", category: "Frameworks" },
  { name: "FastAPI", category: "Frameworks" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Redis", category: "Databases" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Git", category: "Tools" },
  { name: "REST APIs", category: "Architecture" },
  { name: "GraphQL", category: "Architecture" },
  { name: "Microservices", category: "Architecture" },
  { name: "WebSockets", category: "Protocols" },
  { name: "Message Queues", category: "Architecture" },
];

export const COMPANIES_WORKED_WITH: Company[] = [
  {
    name: "Tech Startup Alpha",
    description: "Built scalable backend infrastructure",
    href: "https://example.com",
  },
  {
    name: "Enterprise Solutions Inc",
    description: "Developed microservices architecture",
    href: "https://example.com",
  },
  {
    name: "Digital Agency Beta",
    description: "Created high-performance APIs",
    href: "https://example.com",
  },
  {
    name: "FinTech Innovations",
    description: "Secure payment processing systems",
    href: "https://example.com",
  },
  {
    name: "Cloud Services Co",
    description: "Infrastructure automation and scaling",
    href: "https://example.com",
  },
];

/**
 * Represents an item in the masonry background gallery.
 */
export interface MasonryItem {
  /**
   * Unique identifier for the masonry item.
   */
  readonly id: string;
  /**
   * Image URL or path for the masonry item.
   */
  readonly img: string;
  /**
   * Optional URL to link to when item is clicked.
   */
  readonly url?: string;
  /**
   * Height of the masonry item in pixels.
   */
  readonly height: number;
}

/**
 * Collection of website screenshots for the hero section masonry background.
 * Replace these placeholder images with actual screenshots of websites you've built.
 */
export const MASONRY_ITEMS: MasonryItem[] = [
  {
    id: "1",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    url: "https://www.afrotype.com/danfo",
    height: 400,
  },
  {
    id: "2",
    img: "https://picsum.photos/id/1011/600/750?grayscale",
    url: "https://www.pithafrica.com/",
    height: 250,
  },
  {
    id: "3",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://2022.madebynull.com/",
    height: 600,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1025/600/500?grayscale",
    url: "https://fayemi.design/",
    height: 350,
  },
  {
    id: "5",
    img: "https://picsum.photos/id/1035/600/700?grayscale",
    url: "https://paystack.com/terminal/dash/",
    height: 450,
  },
  {
    id: "6",
    img: "https://picsum.photos/id/1043/600/600?grayscale",
    url: "https://www.afrotype.com/tac",
    height: 300,
  },
  {
    id: "7",
    img: "https://picsum.photos/id/1048/600/850?grayscale",
    url: "https://kortyeo.madebynull.com/",
    height: 500,
  },
  {
    id: "8",
    img: "https://picsum.photos/id/1050/600/550?grayscale",
    height: 280,
  },
  {
    id: "9",
    img: "https://picsum.photos/id/1052/600/650?grayscale",
    height: 380,
  },
  {
    id: "10",
    img: "https://picsum.photos/id/1060/600/720?grayscale",
    height: 420,
  },
  {
    id: "11",
    img: "https://picsum.photos/id/1062/600/480?grayscale",
    height: 320,
  },
  {
    id: "12",
    img: "https://picsum.photos/id/1067/600/590?grayscale",
    height: 360,
  },
];
