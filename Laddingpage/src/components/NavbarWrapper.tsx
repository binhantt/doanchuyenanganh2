'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/src/features/landing/navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  return <Navbar currentPath={pathname} />;
}
