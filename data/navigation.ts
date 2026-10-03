export interface NavLinkItem {
  name: string;
  href: string;
  id: string;
}

export const navLinks: NavLinkItem[] = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Yearbook', href: '#academic', id: 'academic' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Work', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Availability', href: '#availability', id: 'availability' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];
