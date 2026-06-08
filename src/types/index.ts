export interface Lead {
  id?: string;
  name: string;
  company: string;
  segment: string;
  service: string;
  objective: string;
  budget: string;
  deadline: string;
  createdAt: Date;
  whatsappMessage?: string;
}

export interface PortfolioItem {
  id?: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
}

export interface Client {
  id?: string;
  name: string;
  logoUrl: string;
  createdAt: Date;
}

export interface Testimonial {
  id?: string;
  name: string;
  company: string;
  photoUrl: string;
  text: string;
  videoUrl?: string;
  createdAt: Date;
}

export interface Settings {
  whatsapp: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  emails: string[];
}

export interface SiteConfig {
  name: string;
  slogan: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    whatsapp: string;
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
}
