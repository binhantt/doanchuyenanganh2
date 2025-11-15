export interface NavItem {
  label: string;
  href: string;
  scrollTo: string | null; // Section ID to scroll to on homepage
}

export interface NavbarProps {
  currentPath?: string;
}
