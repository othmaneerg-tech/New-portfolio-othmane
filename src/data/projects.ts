export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  logo?: string;
  images: string[];
  videos?: string[];
  videoUrl?: string;
  videoDescription?: string;
  galleryCaption?: string;
  results: string;
  metrics?: {
    value: string;
    label: string;
  }[];
  year: string;
}

export const projects: Project[] = [
  {
    slug: "lougha-institute-social-media",
    title: "Lougha Institute",
    category: "Social Media Management",
    description:
      "Managed the entire social media presence for Lougha Institute, an English teaching center in El Jadida, Morocco. Created engaging reels, feed posts, and story content that grew the account to 41.8K followers. Handled content strategy, community engagement, and WhatsApp client communications to drive student enrollment.",
    thumbnail: "/images/projects/lougha/lougha-logo.png",
    logo: "/images/projects/lougha/Lougha institute.png",
    images: [
      "/images/projects/lougha/lougha-thumbnail.png",
      "/images/projects/lougha/Lougha institute (2).jpg",
      "/images/projects/lougha/Lougha institute (3).jpg",
      "/images/projects/lougha/Lougha institute (4).jpg",
    ],
    videos: [
      "/images/projects/lougha/Lougha institute (2).mp4",
      "/images/projects/lougha/Lougha institute.mp4",
      "/images/projects/lougha/good match.MP4",
    ],
    videoUrl: "/images/projects/lougha/Lougha institute (2).mp4",
    results: "41.8K followers · Full SM management",
    metrics: [
      { value: "41.8K Followers", label: "Audience Growth" },
      { value: "3 Platforms", label: "Instagram • TikTok • Facebook" },
      { value: "120+ Posts", label: "Reels, Stories, and Posts" },
      { value: "8–12% Avg.", label: "Audience Interaction" },
    ],
    year: "2024",
  },
  {
    slug: "artgallery-website",
    title: "ArtGallery — Web Development",
    category: "Website Design & SEO",
    description:
      "Built a full showcase website from scratch for an art gallery as an academic project using WordPress. Thoroughly analyzed every aspect of site development — from planning and structure to content creation and visual design. Achieved fast upload speeds through strategic optimizations, lightweight theme selection, and caching. Optimized user experience with clean, intuitive layouts.",
    thumbnail: "/images/projects/artgallery/artgallery-logo.jpg",
    images: [
      "/images/projects/artgallery/artgallery-thumbnail.png",
      "/images/projects/artgallery/seo-optimization.png",
      "/images/projects/artgallery/yoast-results.webp",
    ],
    videoUrl: "/images/projects/artgallery/artgallery-demo.mp4",
    videoDescription: "This is a site that I built locally with WordPress from scratch.",
    results: "Fast load times · Optimized UX & SEO",
    metrics: [
      { value: "WordPress", label: "Custom Development" },
      { value: "SEO", label: "Data-Driven Strategy" },
      { value: "UX Design", label: "Optimized Experience" },
      { value: "Performance", label: "Core Web Vitals" },
    ],
    year: "2024",
  },
  {
    slug: "tribal-ddb-challenge",
    title: "Tribal DDB — Talent Factory",
    category: "Strategy 360",
    description:
      "Reached the finals and secured 4th place in the prestigious DDB Talent Factory Challenge in Casablanca, Morocco. Developed a comprehensive 360° marketing strategy for CIH Bank alongside a team of talented peers. The challenge involved preparing a brief response including strategy, creative direction, and a full communication plan, presented to a jury of senior advertising professionals from DDB Morocco.",
    thumbnail: "/images/projects/tribal-ddb/talent-factory.jpg",
    images: [
      "/images/projects/tribal-ddb/talent-factory.jpg",
      "/images/projects/tribal-ddb/tribal-1.jpg",
      "/images/projects/tribal-ddb/tribal-2.jpg",
      "/images/projects/tribal-ddb/tribal-3.jpg",
      "/images/projects/tribal-ddb/tribal-4.jpg",
      "/images/projects/tribal-ddb/tribal-5.jpg",
      "/images/projects/tribal-ddb/tribal-6.jpg",
    ],
    results: "4th Place Finalist · CIH Bank strategy 360",
    year: "2025",
  },
  {
    slug: "bcp-internship",
    title: "BCP Internship Project",
    category: "Product Marketing & Data",
    description:
      "Contributed to the development and evolution of Business Card offerings for SMEs. Designed and analyzed client satisfaction surveys to evaluate service quality, and tracked commercial performance through key indicators on electronic payment dashboards. Developed product sheets and sales support materials for the BPR network, while participating in product communication and deployment strategies.",
    thumbnail: "/images/projects/bcp/bcp-hq.webp",
    images: [
      "/images/projects/bcp/tableau-bpr-1.jpg",
      "/images/projects/bcp/tableau-bpr-2.jpg",
      "/images/projects/bcp/tableau-bpr-3.png",
      "/images/projects/bcp/tableau-bpr-4.jpg",
    ],
    galleryCaption: "I have modified all data and figures shown in these dashboards to maintain the confidentiality and security of the organization's sensitive information.",
    results: "SME Product Evolution · Performance Tracking",
    year: "2025",
  },
];
