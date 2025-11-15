'use client';

import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  scrollTo?: string | null;
}

export function NavLink({ href, label, isActive = false, scrollTo }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (scrollTo) {
      e.preventDefault();
      const element = document.getElementById(scrollTo);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      role="menuitem"
      className={`
        relative px-4 py-2 text-gray-700 font-medium rounded-lg 
        hover:bg-pink-100 hover:text-pink-600 
        focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
        transition-all duration-200
        ${isActive ? 'text-pink-600 bg-pink-50' : ''}
      `}
    >
      {label}
      {/* Active underline animation */}
      <span
        className={`
          absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full
          transition-all duration-300 ease-out
          ${isActive ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}
        `}
        aria-hidden="true"
      />
    </Link>
  );
}
