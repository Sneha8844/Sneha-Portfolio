document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
     STICKY ROLE TABS
  ------------------------------ */

  const stageTabs = document.querySelectorAll(".stage-tab");

  const sectionMap = {
    research: document.getElementById("research"),
    define: document.getElementById("define"),
    ideate: document.getElementById("ideate"),
    design: document.getElementById("design")
  };

  stageTabs.forEach((tab) => {
    tab.addEventListener("click", () => {

      const sectionId = tab.getAttribute("data-section");
      const targetSection = sectionMap[sectionId];

      if (targetSection) {

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        stageTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      }

    });
  });


  /* ------------------------------
     AUTO HIGHLIGHT TAB ON SCROLL
  ------------------------------ */

  let lastActiveSection = "";

  window.addEventListener("scroll", () => {

    let currentSection = "";

    Object.entries(sectionMap).forEach(([key, section]) => {

      if (!section) return;

      const rect = section.getBoundingClientRect();

      if (rect.top <= 120 && rect.bottom > 120) {
        currentSection = key;
      }

    });

    if (currentSection && currentSection !== lastActiveSection) {

      lastActiveSection = currentSection;

      stageTabs.forEach((tab) => {

        const isActive = tab.dataset.section === currentSection;
        tab.classList.toggle("active", isActive);

      });

    }

  });


  /* ------------------------------
     THANK YOU FOOTER REVEAL
  ------------------------------ */

  window.addEventListener("scroll", () => {

    const footer = document.querySelector('.thank-you-footer');

    if (!footer) return;

    const rect = footer.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      footer.classList.add('visible');
    }

  });


  /* ------------------------------
     FOOTER YEAR
  ------------------------------ */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ------------------------------
     SCROLL PROGRESS + BACK TO TOP
  ------------------------------ */

  const scrollBtn = document.getElementById('scrollProgressBtn');
  const circle = document.querySelector('.progress-ring__circle');
  const arrow = document.querySelector('.arrow-up');

  if (scrollBtn && circle) {

    const radius = 26;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    window.addEventListener('scroll', () => {

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(scrollPercent);

      if (scrollTop > 40) {
        arrow.classList.add('visible');
      } else {
        arrow.classList.remove('visible');
      }

    });

    scrollBtn.addEventListener('click', () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }

});


/* ------------------------------
   FIVE-W COLLAPSIBLE TOGGLES
------------------------------ */

document.querySelectorAll('.fivew-toggle').forEach(toggle => {

  toggle.addEventListener('click', () => {

    const item = toggle.parentElement;
    item.classList.toggle('open');

    const content = item.querySelector('.fivew-content');

    content.style.maxHeight
      ? content.style.maxHeight = null
      : content.style.maxHeight = content.scrollHeight + "px";

  });

});