"use strict";

/**
 * Load reusable HTML components.
 */
async function loadIncludes() {
  const includeElements = document.querySelectorAll("[data-include]");

  const requests = [...includeElements].map(async (element) => {
    const filePath = element.dataset.include;

    if (!filePath) {
      return;
    }

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(
          `Failed to load ${filePath}: ${response.status} ${response.statusText}`,
        );
      }

      const html = await response.text();
      element.outerHTML = html;
    } catch (error) {
      console.error(error);

      element.innerHTML = `
        <p class="include-error">
          Failed to load this component.
        </p>
      `;
    }
  });

  await Promise.all(requests);
}

/**
 * Mobile navigation.
 
function initializeMobileMenu() {
  const menuButton = document.querySelector(".header__menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");

  if (!menuButton || !mobileMenu) {
    return;
  }

  function openMenu() {
    menuButton.classList.add("is-active");
    mobileMenu.classList.add("is-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "メニューを閉じる");
    mobileMenu.setAttribute("aria-hidden", "false");

    document.body.classList.add("is-menu-open");
  }

  function closeMenu() {
    menuButton.classList.remove("is-active");
    mobileMenu.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
    mobileMenu.setAttribute("aria-hidden", "true");

    document.body.classList.remove("is-menu-open");
  }

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      closeMenu();
    }
  });
}*/

/**
 * Add a class to the header after scrolling.

function initializeHeaderScroll() {
  const header = document.querySelector(".header");

  if (!header) {
    return;
  }

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });
} */

/**
 * Display the current year in the footer.
 */
function initializeCurrentYear() {
  const yearElements = document.querySelectorAll("[data-current-year]");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

/**
 * Smooth scrolling for internal anchor links.
 */
function initializeSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

/**
 * Initialize common components after header and footer are loaded.
 */
async function initializeCommonComponents() {
  await loadIncludes();

  /**initializeMobileMenu();*/
  /**initializeHeaderScroll();*/
  initializeCurrentYear();
  initializeSmoothScroll();

  document.dispatchEvent(new CustomEvent("commonComponentsLoaded"));
}

document.addEventListener("DOMContentLoaded", initializeCommonComponents);
