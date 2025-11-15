/**
 * Helper to detect if a link is active
 */
export function isActiveLink(currentPath: string, linkHref: string): boolean {
  if (linkHref === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(linkHref);
}

/**
 * Helper to check if hash matches current section
 */
export function isActiveSection(hash: string): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hash === hash;
}
