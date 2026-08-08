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

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.querySelector(".filter-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((current) => {
      current.setAttribute("aria-pressed", String(current === button));
    });

    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;

      if (visible) {
        visibleCount += 1;
      }
    });

    if (filterStatus) {
      filterStatus.textContent = visibleCount === 0
        ? `No ${filter === "all" ? "" : `${filter} `}projects published yet.`
        : "";
    }
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
