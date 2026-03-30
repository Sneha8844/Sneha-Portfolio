document.addEventListener("DOMContentLoaded", () => { 
  const stageTabs = document.querySelectorAll(".stage-tab");
  const sectionMap = {
    research: document.getElementById("research"),
    define: document.getElementById("define"),
    ideate: document.getElementById("ideate"),
    design: document.getElementById("design"),
    test: document.getElementById("test"),
    //output: document.getElementById("output")//
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

        // Center the active tab horizontally (mobile fix)
//    tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest"});
      }
    });
  });

  // Auto-highlight and center tab based on scroll
  let lastActiveSection = "";

window.addEventListener("scroll", () => {
  let currentSection = "";

  Object.entries(sectionMap).forEach(([key, section]) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;

    
    if (sectionTop <= 120 && sectionBottom > 120) {
      currentSection = key;
    }
  });

  if (currentSection && currentSection !== lastActiveSection) {
    lastActiveSection = currentSection;

    stageTabs.forEach((tab) => {
      const isActive = tab.dataset.section === currentSection;
      tab.classList.toggle("active", isActive);

 //     if (isActive) {tab.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});}
      
    });
  }
});


//slider for empathy map:

const sliderTrack = document.getElementById('sliderTrack'); // Scroll-based tab activation
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playPauseBtn = document.getElementById('playPauseBtn');

let currentIndex = 0;
let autoSlide = true;
let slideInterval = setInterval(nextSlide, 1500); // Slide every 1.5 seconds

// Clone slides to create an infinite effect
sliderTrack.innerHTML += sliderTrack.innerHTML;
const totalSlides = document.querySelectorAll('.slide').length;

function showSlide(index) {
  sliderTrack.style.transition = 'transform 0.5s ease-in-out';
  sliderTrack.style.transform = `translateX(-${index * 100}%)`;

  // Reset to start when half of total slides is reached (original slides length)
  if (index >= totalSlides / 2) {
    setTimeout(() => {
      sliderTrack.style.transition = 'none';
      currentIndex = 0;
      sliderTrack.style.transform = `translateX(0)`;
    }, 500); // Matches transition duration
  }
}

function nextSlide() {
  currentIndex++;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = currentIndex <= 0 ? totalSlides / 2 - 1 : currentIndex - 1;
  showSlide(currentIndex);
}

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

playPauseBtn.addEventListener('click', () => {
  autoSlide = !autoSlide;
  if (autoSlide) {
    playPauseBtn.textContent = '⏸';
    playPauseBtn.style.color = '#ffcc00'; // Pause icon color
    slideInterval = setInterval(nextSlide, 1500);
  } else {
    playPauseBtn.textContent = '▶';
    playPauseBtn.style.color = '#00ff88'; // Play icon color
    clearInterval(slideInterval);
  }
});

function resetInterval() {
  if (autoSlide) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 1500);
  }
}

//end of sliding images (empathy map)


//slider for persona's:
// Personas Slider
const personaSliderTrack = document.getElementById('personaSliderTrack');
const personaSlides = personaSliderTrack.querySelectorAll('.slide');
const personaPrevBtn = document.getElementById('personaPrevBtn');
const personaNextBtn = document.getElementById('personaNextBtn');
const personaPlayPauseBtn = document.getElementById('personaPlayPauseBtn');

let personaIndex = 0;
let personaAutoSlide = true;
let personaInterval = setInterval(nextPersonaSlide, 1500);

personaSliderTrack.innerHTML += personaSliderTrack.innerHTML;
const personaTotalSlides = personaSliderTrack.querySelectorAll('.slide').length;

function showPersonaSlide(index) {
  personaSliderTrack.style.transition = 'transform 0.5s ease-in-out';
  personaSliderTrack.style.transform = `translateX(-${index * 100}%)`;
  
  if (index >= personaTotalSlides / 2) {
    setTimeout(() => {
      personaSliderTrack.style.transition = 'none';
      personaIndex = 0;
      personaSliderTrack.style.transform = `translateX(0)`;
    }, 500);
  }
}

function nextPersonaSlide() {
  personaIndex++;
  showPersonaSlide(personaIndex);
}

function prevPersonaSlide() {
  personaIndex = personaIndex <= 0 ? personaTotalSlides / 2 - 1 : personaIndex - 1;
  showPersonaSlide(personaIndex);
}

personaPrevBtn.addEventListener('click', () => {
  prevPersonaSlide();
  resetPersonaInterval();
});

personaNextBtn.addEventListener('click', () => {
  nextPersonaSlide();
  resetPersonaInterval();
});

personaPlayPauseBtn.addEventListener('click', () => {
  personaAutoSlide = !personaAutoSlide;
  if (personaAutoSlide) {
    personaPlayPauseBtn.textContent = '⏸';
    personaPlayPauseBtn.style.color = '#ffcc00';
    personaInterval = setInterval(nextPersonaSlide, 1500);
  } else {
    personaPlayPauseBtn.textContent = '▶';
    personaPlayPauseBtn.style.color = '#00ff88';
    clearInterval(personaInterval);
  }
});

function resetPersonaInterval() {
  if (personaAutoSlide) {
    clearInterval(personaInterval);
    personaInterval = setInterval(nextPersonaSlide, 1500);
  }
}
//end of persona slider


//slider for wireframe//

  const wireframeSliderTrack = document.getElementById('wireframeSliderTrack');
  const wireframePausePlayBtn = document.getElementById('wireframePausePlayBtn');
  const wireframeItems = wireframeSliderTrack.children;

  let wireframeIndex = 0;
  let wireframeAutoScroll = true;
  let wireframeInterval;

  // Clone for infinite loop
  wireframeSliderTrack.innerHTML += wireframeSliderTrack.innerHTML;
  const totalWireframeItems = wireframeSliderTrack.children.length;

  function showWireframeSlide(index) {
    const itemWidth = wireframeItems[0].offsetWidth;
    wireframeSliderTrack.style.transition = 'transform 0.6s ease-in-out';
    wireframeSliderTrack.style.transform = `translateX(-${index * itemWidth}px)`;

    if (index >= totalWireframeItems / 2) {
      setTimeout(() => {
        wireframeSliderTrack.style.transition = 'none';
        wireframeIndex = 0;
        wireframeSliderTrack.style.transform = `translateX(0)`;
      }, 600);
    }
  }

  function nextWireframeSlide() {
    wireframeIndex++;
    showWireframeSlide(wireframeIndex);
  }

  function startWireframeAutoScroll() {
    wireframeInterval = setInterval(nextWireframeSlide, 1800);
  }

  function stopWireframeAutoScroll() {
    clearInterval(wireframeInterval);
  }

  // Toggle Pause/Play
  wireframePausePlayBtn.addEventListener('click', () => {
    wireframeAutoScroll = !wireframeAutoScroll;

    if (wireframeAutoScroll) {
      wireframePausePlayBtn.textContent = '⏸';
      startWireframeAutoScroll();
    } else {
      wireframePausePlayBtn.textContent = '▶';
      stopWireframeAutoScroll();
    }
  });

  // Start auto-scroll initially
  startWireframeAutoScroll();

//end of slider for wireframe//


//thankyou
window.addEventListener('scroll', () => {
    const footer = document.querySelector('.thank-you-footer');
    const rect = footer.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      footer.classList.add('visible');
    }
  });

// Set year in footer
  document.getElementById("year").textContent = new Date().getFullYear();


// Optional toggle content for collapsibles (if used)
function toggleContent(button) {
  const content = button.nextElementSibling;
  const isOpen = content.classList.toggle("open");
  button.textContent = isOpen ? "▲ Hide Details" : "▼ Show Details";
}

// sticky back to top button//
const scrollBtn = document.getElementById('scrollProgressBtn');
const circle = document.querySelector('.progress-ring__circle');
const arrow = document.querySelector('.arrow-up');

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
  const scrollPercent = (scrollTop / docHeight) * 100;

  // Update progress ring
  setProgress(scrollPercent);

  // Show or hide arrow based on scroll position
  if (scrollTop > 0) {
    arrow.classList.add('visible');
  } else {
    arrow.classList.remove('visible');
  }
});

// Scroll to top when clicked
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});



});
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