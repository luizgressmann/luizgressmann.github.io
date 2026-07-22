const sidebar = document.querySelector(".sidebar");
const sidebarOpenButtons = document.querySelectorAll(".sidebar-open");
const sidebarCloseButtons = document.querySelectorAll(".sidebar-close");

function setSidebar(open) {
  if (!sidebar) {
    return;
  }

  sidebar.classList.toggle("is-open", open);
  document.body.classList.toggle("sidebar-open-state", open);

  sidebarOpenButtons.forEach((button) => {
    button.setAttribute("aria-expanded", String(open));
  });
}

function showSidebar() {
  setSidebar(true);
}

function hideSidebar() {
  setSidebar(false);
}

sidebarOpenButtons.forEach((button) => {
  button.addEventListener("click", showSidebar);
});

sidebarCloseButtons.forEach((button) => {
  button.addEventListener("click", hideSidebar);
});

if (sidebar) {
  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", hideSidebar);
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-pressed", "false");
    });

    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.opacity = "0";
      card.style.transform = "translateY(6px)";

      if (!match) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
        requestAnimationFrame(() => {
          card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });
      }
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideSidebar();
  }
});

const topButton = document.createElement("button");
topButton.className = "top-button";
topButton.type = "button";
topButton.textContent = "top";
topButton.setAttribute("aria-label", "Back to top");
document.body.appendChild(topButton);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateTopButton() {
  topButton.classList.toggle("visible", window.scrollY > 320);
}

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
});

window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();
