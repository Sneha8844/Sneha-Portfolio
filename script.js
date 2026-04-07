/* ==============================
   PAGE NAVIGATION (HOME ↔ PROJECTS)
================================ */

const pages = document.getElementById("pages");
const dots = document.querySelectorAll(".dot");
const homeBtn = document.getElementById("homeBtn");

/* go to page */
function goToPage(index) {
  pages.scrollTo({
    left: index * window.innerWidth,
    behavior: "smooth"
  });
}

/* dots click */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => goToPage(i));
});

/* home button */
homeBtn.addEventListener("click", () => goToPage(0));

/* ==============================
   SCROLL SYNC (IMPORTANT)
================================ */

pages.addEventListener("scroll", () => {
  const scrollLeft = pages.scrollLeft;
  const pageWidth = window.innerWidth;

  const index = Math.floor((scrollLeft + pageWidth / 2) / pageWidth); 

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  function isDesktop() {
  return window.innerWidth > 1024;
}

pages.addEventListener("scroll", () => {
  const scrollLeft = pages.scrollLeft;
  const pageWidth = window.innerWidth;

  const index = Math.floor((scrollLeft + pageWidth / 2) / pageWidth); 

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  /* ✅ Only control home button on desktop */
  if (isDesktop()) {
    homeBtn.classList.toggle("visible", index === 1);
  }
});

});
/* ==============================
   PROJECT SLIDER (CLEAN)
================================ */

const viewport = document.querySelector(".projects-viewport");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

next.addEventListener("click", () => {
  viewport.scrollBy({ left: 400, behavior: "smooth" });
});

prev.addEventListener("click", () => {
  viewport.scrollBy({ left: -400, behavior: "smooth" });
});

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
  document.body.style.overflow = "auto";
}

/* ==============================
   CONTACT POP-UP
================================ */

function toggleConnect() {
  document.getElementById("connectMenu").classList.toggle("active");
}

/* ==============================
   CURSOR GUIDE (FIXED)
================================ */

const cursorGuide = document.getElementById("cursorGuide");

function isDesktop() {
  return window.innerWidth > 1024;
}

document.addEventListener("mousemove", (e) => {
  if (!cursorGuide) return;

  if (!isDesktop()) {
    cursorGuide.classList.remove("show");
    return;
  }

  /* ✅ get current page index */
  const index = Math.round(pages.scrollLeft / window.innerWidth);

  if (index !== 0) {
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