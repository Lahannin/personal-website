export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/#meetups", label: "Meetups" },
  { href: "/#products", label: "Products" },
  { href: "/#experience", label: "Experience" },
  { href: "/#articles", label: "Articles" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export const sectionIds = navLinks.map((l) => l.href.replace("/#", ""));
