export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}