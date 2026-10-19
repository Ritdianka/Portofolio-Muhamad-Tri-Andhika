/* =========================================================
   TYPING EFFECT (rotating taglines)
========================================================= */
const typingEl = document.getElementById("typing");

const phrases = [
  "Initializing Security Terminal...",
  "Ethical Hacker in progress...",
  "Securing networks, one packet at a time..."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
  const current = phrases[phraseIndex];

  if(!deleting){
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if(charIndex === 0){
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 70);
}

typeLoop();

/* =========================================================
   MATRIX BACKGROUND EFFECT
========================================================= */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;

let columns;
let drops;

function setupMatrix(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(1);
}

function drawMatrix(){
  ctx.fillStyle = "rgba(0,0,0,.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff8c";
  ctx.font = fontSize + "px monospace";

  for(let i = 0; i < drops.length; i++){
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975){
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setupMatrix();
setInterval(drawMatrix, 35);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setupMatrix, 200);
});

/* =========================================================
   MOBILE NAV TOGGLE
========================================================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* =========================================================
   ACTIVE NAV LINK ON SCROLL
========================================================= */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navItems.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if(activeLink) activeLink.classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -45% 0px" });

sections.forEach(sec => navObserver.observe(sec));

/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      setTimeout(() => entry.target.classList.add("in-view"), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* =========================================================
   COPY EMAIL TO CLIPBOARD
========================================================= */
document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const value = btn.dataset.copy;
    try{
      await navigator.clipboard.writeText(value);
      const original = btn.textContent;
      btn.textContent = "copied!";
      setTimeout(() => (btn.textContent = original), 1500);
    }catch(err){
      console.error("Gagal menyalin:", err);
    }
  });
});
