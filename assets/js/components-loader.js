async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(`./components/${file}`);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.error(`❌ Failed loading ${file}:`, err);

    el.innerHTML = `
      <div style="padding:20px;color:red;">
        Failed to load ${file}
      </div>
    `;
  }
}

async function initComponents() {
  await loadComponent("navbar", "navbar.html");
  await loadComponent("hero", "hero.html");
  await loadComponent("mission", "mission.html");
  await loadComponent("expertise", "expertise.html");
  await loadComponent("testimonials", "testimonials.html");
  await loadComponent("partners", "partners.html");
  await loadComponent("contact", "contact.html");
  await loadComponent("footer", "footer.html");

  window.dispatchEvent(new Event("components:loaded"));
}

document.addEventListener("DOMContentLoaded", initComponents);