export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  readingTime: number;
}

export interface BlogDB {
  posts: BlogPost[];
}
