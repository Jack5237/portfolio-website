export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  slug: string;
  bannerImage: string;
}