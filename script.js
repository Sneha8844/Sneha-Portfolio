/* ==============================
   PAGE NAVIGATION (HOME ↔ PROJECTS)
================================ */

const pages = document.getElementById("pages");
const pageSections = document.querySelectorAll(".page");
const dots = document.querySelectorAll(".dot");
const homeBtn = document.getElementById("homeBtn");

let currentPage = 0;

function updatePages() {

  pages.style.transform = `translateX(-${currentPage * 100}%)`;

  pageSections.forEach((page, i) => {
    page.classList.toggle("active", i === currentPage);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentPage);
  });

  /* show home button only on projects page */
  if (homeBtn) {
    if (currentPage === 1) {
      homeBtn.classList.add("visible");
    } else {
      homeBtn.classList.remove("visible");
    }
  }

}

/* Scroll wheel → page change (only vertical) */
window.addEventListener("wheel", (e) => {
  if (e.target.closest(".projects")) return; // allow project interaction

  if (e.deltaY > 0) currentPage = Math.min(1, pageSections.length - 1);
  if (e.deltaY < 0) currentPage = Math.max(0, 0);

  updatePages();
});

/* Click anywhere → next page (except projects) */
pages.addEventListener("click", (e) => {
  if (
    e.target.closest(".projects") ||
    e.target.closest("button") ||
    e.target.closest(".project-card") ||

    e.target.closest(".intro-content") ||
    e.target.closest(".ui-preview") ||
    e.target.closest(".cv-btn") ||
    e.target.closest(".page-dots")
  ) return;

  currentPage = Math.min(currentPage + 1, pageSections.length - 1);
  updatePages();
});

/* Dots navigation */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentPage = i;
    updatePages();
  });
});

/* Touch swipe (outside projects only) */
let startX = 0;

pages.addEventListener("touchstart", (e) => {
  if (e.target.closest(".projects")) return;
  startX = e.touches[0].clientX;
});

pages.addEventListener("touchend", (e) => {
  if (e.target.closest(".projects")) return;

  const diff = startX - e.changedTouches[0].clientX;

  if (diff > 60) currentPage = Math.min(1, pageSections.length - 1);
  if (diff < -60) currentPage = Math.max(0, 0);

  updatePages();
});

/* ==============================
   PROJECT SLIDER (HORIZONTAL)
================================ */

const track = document.getElementById("track");
const viewport = document.querySelector(".projects-viewport");
const cards = document.querySelectorAll(".project-card");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let sliderIndex = 0;

function updateSlider() {
  if (!cards.length) return;

  const cardWidth = cards[0].offsetWidth + 32; // card + gap
  const visibleCards = Math.floor(viewport.offsetWidth / cardWidth);
  const maxIndex = Math.max(0, cards.length - visibleCards);

  sliderIndex = Math.max(0, Math.min(sliderIndex, maxIndex));
  track.style.transform = `translateX(-${sliderIndex * cardWidth}px)`;
}

/* Arrow navigation */
next.addEventListener("click", (e) => {
  e.stopPropagation();
  sliderIndex++;
  updateSlider();
});

prev.addEventListener("click", (e) => {
  e.stopPropagation();
  sliderIndex--;
  updateSlider();
});

/* Trackpad / mouse wheel horizontal scroll */
viewport.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    viewport.scrollLeft += e.deltaY;
  },
  { passive: false }
);

/* Resize safety */
window.addEventListener("resize", updateSlider);

/* ==============================
   VIDEO PREVIEW
================================ */

document.querySelectorAll(".project-card video").forEach((video) => {
  video.addEventListener("mouseenter", () => video.play());
  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

/* ==============================
   OPEN CASE STUDY
================================ */

function openOverlay(url) {
  const overlay = document.getElementById("projectOverlay");
  const frame = document.getElementById("projectFrame");

  frame.src = url;
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  const overlay = document.getElementById("projectOverlay");
  const frame = document.getElementById("projectFrame");

  frame.src = "";
  overlay.style.display = "none";
  document.body.style.overflow = "hidden";
}

/* ==============================
   HOME BUTTON
================================ */

if (homeBtn) {
  homeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentPage = 0;
    updatePages();
  });
}

/* INIT */
updatePages();
updateSlider();

/* ==============================
   CONTACT POP-UP
================================ */
function toggleConnect(){
  document.getElementById("connectMenu").classList.toggle("active");
}

/* ==============================
   CURSOR GUIDE
================================ */

const cursorGuide = document.getElementById("cursorGuide");

function isDesktop() {
  return window.innerWidth > 1024; // only laptop/desktop
}

document.addEventListener("mousemove", (e) => {
  if (!cursorGuide) return;

  // ❌ Disable on small devices
  if (!isDesktop()) {
    cursorGuide.classList.remove("show");
    return;
  }

  // ❌ Only show on HOME page
  if (currentPage !== 0) {
    cursorGuide.classList.remove("show");
    return;
  }

  const buffer = 50;

  const elements = [
    document.querySelector(".intro-content"),
    document.querySelector(".ui-preview"),
    document.querySelector(".connect-wrapper"),
    document.querySelector(".cv-btn"),
    document.querySelector(".page-dots")
  ];

  function isNear(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();

    return (
      e.clientX >= rect.left - buffer &&
      e.clientX <= rect.right + buffer &&
      e.clientY >= rect.top - buffer &&
      e.clientY <= rect.bottom + buffer
    );
  }

  const isBlocked = elements.some(el => isNear(el));

  if (isBlocked) {
    cursorGuide.classList.remove("show");
  } else {
    cursorGuide.classList.add("show");
  }

  cursorGuide.style.left = e.clientX + "px";
  cursorGuide.style.top = e.clientY + "px";
});