import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
  FaNewspaper,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/** Single source for social URLs and icons (footer + desktop rail). */
export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/robinrawat007",
    Icon: FaGithub,
    placeholder: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/robinrawat1/",
    Icon: FaLinkedin,
    placeholder: false,
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    href: "https://x.com/robinrawat37",
    Icon: FaXTwitter,
    placeholder: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/robinrawat01/",
    Icon: FaInstagram,
    placeholder: false,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/919416149624",
    Icon: FaWhatsapp,
    placeholder: false,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "#",
    Icon: FaYoutube,
    placeholder: true,
  },
  {
    id: "newsletter",
    label: "AI Dispatch Newsletter",
    href: "https://aidispatch1.beehiiv.com/",
    Icon: FaNewspaper,
    placeholder: false,
  },
];
