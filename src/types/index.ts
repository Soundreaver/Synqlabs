export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  service_interest: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  author_bio?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  featured_image?: string;
  is_published: boolean;
  read_time_minutes: number;
  seo_title?: string;
  seo_description?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ContactSubmission extends ContactForm {
  id: string;
  created_at: string;
  status: 'new' | 'contacted' | 'converted';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}
