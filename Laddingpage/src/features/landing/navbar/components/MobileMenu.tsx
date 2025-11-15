'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { X } from 'lucide-react';
import { NavItem } from '../types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavItem[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  currentPath,
}: MobileMenuProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavItem) => {
    if (link.scrollTo) {
      e.preventDefault();
      const element = document.getElementById(link.scrollTo);
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
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 
            data-[state=open]:animate-in data-[state=closed]:animate-out 
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />

        {/* Content Panel */}
        <Dialog.Content
          id="mobile-menu"
          className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-50 
            data-[state=open]:animate-in data-[state=closed]:animate-out 
            data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right 
            duration-300 focus:outline-none"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-pink-100">
              <Dialog.Title className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Menu
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="p-2 rounded-lg hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-600" aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto p-6" role="menu">
              <ul className="space-y-2" role="none">
                {navLinks.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      role="menuitem"
                      className="block px-4 py-3 text-lg font-medium rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button */}
            <div className="p-6 border-t border-pink-100">
              <Link
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('booking');
                  if (element) {
                    const navbarHeight = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                  onClose();
                }}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-center rounded-full 
                  hover:shadow-lg hover:scale-[1.02] 
                  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                  transition-all duration-200"
              >
                Đặt lịch ngay
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
