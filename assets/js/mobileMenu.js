// assets/js/mobileMenu.js
export async function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId);
  if (!element) return;
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    element.innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    element.innerHTML = `<div class="text-red-500 text-sm p-4">Failed to load component</div>`;
  }
}