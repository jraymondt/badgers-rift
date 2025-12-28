import type { Page } from "astro";

// Slide a window of page numbers around the current page, keeping it inside the available range.
export function getPageNumbers(page: Page<any>, windowSize: number = 5): number[] {
  const totalPages = page.lastPage;
  const currentPage = page.currentPage;
  
  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const halfWindow = Math.floor(windowSize / 2);
  let start = currentPage - halfWindow;
  let end = currentPage + halfWindow;
  
  // Nudge the window right if it would dip before page 1.
  if (start < 1) {
    end += Math.abs(start) + 1;
    start = 1;
  }
  
  // Nudge the window left if it would run past the last page.
  if (end > totalPages) {
    start -= end - totalPages;
    end = totalPages;
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}