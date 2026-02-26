import type { NavLink, SocialLink } from "../types";

export const siteConfig = {
  name: "Ellis",
  title: "Full-Stack Developer",
  description:
    "I build modern web applications with React, Node.js, and MongoDB.",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/yourusername",
    label: "GitHub Profile",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    label: "LinkedIn Profile",
  },
];