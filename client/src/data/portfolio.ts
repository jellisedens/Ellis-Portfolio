import type { NavLink, SocialLink } from "../types";

export const siteConfig = {
  name: "Ellis Edens",
  title: "Full-Stack Developer & Digital Marketer",
  description:
    "I build modern web applications and drive digital marketing strategy. From full-stack development to marketing automation, analytics, and campaign optimization — I bridge the gap between code and conversion.",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Projects", href: "/projects" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/jellisedens",
    label: "GitHub Profile",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    label: "LinkedIn Profile",
  },
];