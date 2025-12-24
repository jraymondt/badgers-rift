import type { Page } from "astro";

export function getPageNumbers(page: Page<any>, windowSize: number = 5): number[] {
  const totalPages = page.lastPage;
  const currentPage = page.currentPage;
  
  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const halfWindow = Math.floor(windowSize / 2);
  let start = currentPage - halfWindow;
  let end = currentPage + halfWindow;
  
  if (start < 1) {
    end += Math.abs(start) + 1;
    start = 1;
  }
  
  if (end > totalPages) {
    start -= end - totalPages;
    end = totalPages;
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}