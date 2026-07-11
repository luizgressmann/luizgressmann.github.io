function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.style.display = "flex";
  }
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.style.display = "none";
  }
}

window.showSidebar = showSidebar;
window.hideSidebar = hideSidebar;

document.querySelectorAll(".sidebar-open").forEach((button) => {
  button.addEventListener("click", showSidebar);
});

document.querySelectorAll(".sidebar-close").forEach((button) => {
  button.addEventListener("click", hideSidebar);
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

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

const searchIndex = [
  {
    title: "About",
    url: "index.html",
    description: "Academic profile, research interests, and quantitative finance interests.",
    keywords: "about physics astrophysics neutron stars finance Goethe University Frankfurt"
  },
  {
    title: "CV",
    url: "cv.html",
    description: "Education, certificates, skills, coursework, experience, and independent work.",
    keywords: "cv curriculum vitae education certificates skills coursework experience"
  },
  {
    title: "Projects",
    url: "projects.html",
    description: "Finance, physics, and computational projects.",
    keywords: "projects python factor investing physics numerical methods astrophysics"
  },
  {
    title: "Publications",
    url: "publications.html",
    description: "Papers, preprints, notes, and research write-ups.",
    keywords: "publications papers preprints notes research"
  },
  {
    title: "Contact",
    url: "contact.html",
    description: "Email, LinkedIn, and GitHub.",
    keywords: "contact email linkedin github"
  }
];

const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");

function renderSearchResults(query, target) {
  if (!target) {
    return;
  }

  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? searchIndex.filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
        return normalized.split(/\s+/).every((term) => haystack.includes(term));
      })
    : searchIndex;

  target.innerHTML = results.map((item) => `
    <a class="search-result" href="${item.url}">
      <strong>${item.title}</strong>
      <span>${item.description}</span>
    </a>
  `).join("");

  if (!results.length) {
    target.innerHTML = '<p class="search-empty">No matching pages found.</p>';
  }
}

if (searchInput && searchResults) {
  renderSearchResults("", searchResults);
  searchInput.addEventListener("input", () => renderSearchResults(searchInput.value, searchResults));
}

let searchModal;
let modalSearchInput;
let modalSearchResults;

function createSearchModal() {
  if (searchModal) {
    return;
  }

  searchModal = document.createElement("div");
  searchModal.className = "search-modal";
  searchModal.hidden = true;
  searchModal.innerHTML = `
    <div class="search-modal-backdrop" data-search-close></div>
    <section class="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title">
      <div class="search-dialog-header">
        <h2 id="search-dialog-title">Search</h2>
        <button class="search-close" type="button" aria-label="Close search" data-search-close>&times;</button>
      </div>
      <label class="search-label" for="modal-search">Search this website</label>
      <input id="modal-search" class="search-input" type="search" placeholder="Try physics, finance, certificates..." autocomplete="off">
      <div class="search-results" data-modal-search-results></div>
    </section>
  `;

  document.body.appendChild(searchModal);
  modalSearchInput = searchModal.querySelector("#modal-search");
  modalSearchResults = searchModal.querySelector("[data-modal-search-results]");

  searchModal.querySelectorAll("[data-search-close]").forEach((element) => {
    element.addEventListener("click", closeSearch);
  });

  modalSearchInput.addEventListener("input", () => {
    renderSearchResults(modalSearchInput.value, modalSearchResults);
  });
}

function openSearch(event) {
  if (event) {
    event.preventDefault();
  }

  createSearchModal();
  hideSidebar();
  searchModal.hidden = false;
  document.body.classList.add("modal-open");
  modalSearchInput.value = "";
  renderSearchResults("", modalSearchResults);
  modalSearchInput.focus();
}

function closeSearch() {
  if (!searchModal || searchModal.hidden) {
    return;
  }

  searchModal.hidden = true;
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-search-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", openSearch);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearch();
    hideSidebar();
  }
});

const topButton = document.createElement("button");
topButton.className = "top-button";
topButton.type = "button";
topButton.textContent = "top";
topButton.setAttribute("aria-label", "Back to top");
document.body.appendChild(topButton);

function updateTopButton() {
  topButton.classList.toggle("visible", window.scrollY > 320);
}

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();
