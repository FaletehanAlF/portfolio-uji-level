window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("loading").style.display="none";
  },2600);
});

const teams=document.querySelectorAll(".team");
const modal=document.getElementById("modal");

const img1=document.getElementById("img1");
const img2=document.getElementById("img2");
const name1=document.getElementById("name1");
const name2=document.getElementById("name2");

teams.forEach(team=>{
  team.addEventListener("click",()=>{
    img1.src=team.dataset.img1;
    img2.src=team.dataset.img2;
    name1.textContent=team.dataset.d1;
    name2.textContent=team.dataset.d2;
    modal.style.display="flex";
  });
});

function closeModal(){
  modal.style.display="none";
}

/* TIMELINE SCROLL ANIMATION */
const timelineItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{threshold:0.2});

timelineItems.forEach(item => observer.observe(item));

/* ================= RACE RESULTS DATA ================= */
const raceResults = {
  bahrain: {
    title: "Bahrain Grand Prix Result",
    results: [
      {pos:1, driver:"Max Verstappen", team:"Red Bull Racing", pts:25},
      {pos:2, driver:"Charles Leclerc", team:"Ferrari", pts:18},
      {pos:3, driver:"Lando Norris", team:"McLaren", pts:15},
      {pos:4, driver:"Lewis Hamilton", team:"Mercedes", pts:12},
      {pos:5, driver:"Carlos Sainz", team:"Williams", pts:10}
    ]
  },
  saudi: {
    title: "Saudi Arabian Grand Prix Result",
    results: [
      {pos:1, driver:"Max Verstappen", team:"Red Bull Racing", pts:25},
      {pos:2, driver:"Sergio Perez", team:"Cadillac", pts:18},
      {pos:3, driver:"Oscar Piastri", team:"McLaren", pts:15},
      {pos:4, driver:"George Russell", team:"Mercedes", pts:12},
      {pos:5, driver:"Fernando Alonso", team:"Aston Martin", pts:10}
    ]
  },
  australia: {
    title: "Australian Grand Prix Result",
    results: [
      {pos:1, driver:"Lando Norris", team:"McLaren", pts:25},
      {pos:2, driver:"Max Verstappen", team:"Red Bull Racing", pts:18},
      {pos:3, driver:"Charles Leclerc", team:"Ferrari", pts:15},
      {pos:4, driver:"Lewis Hamilton", team:"Mercedes", pts:12},
      {pos:5, driver:"Oscar Piastri", team:"McLaren", pts:10}
    ]
  }
};

/* ================= OPEN RESULT ================= */
const resultModal = document.getElementById("resultModal");
const raceTitle = document.getElementById("raceTitle");
const resultBody = document.getElementById("resultBody");

document.querySelectorAll(".race").forEach(race=>{
  race.addEventListener("click",()=>{
    const key = race.dataset.race;
    const data = raceResults[key];

    raceTitle.textContent = data.title;
    resultBody.innerHTML = "";

    data.results.forEach(r=>{
      resultBody.innerHTML += `
        <tr>
          <td>${r.pos}</td>
          <td>${r.driver}</td>
          <td>${r.team}</td>
          <td>${r.pts}</td>
        </tr>
      `;
    });

    resultModal.style.display = "flex";
  });
});

function closeResult(){
  resultModal.style.display = "none";
}

const hero = document.getElementById("hero");
const sound = document.getElementById("engineSound");

/* TOGGLE */
function setFrame(){
  hero.classList.remove("full");
  hero.classList.add("frame");
}

function setFull(){
  hero.classList.remove("frame");
  hero.classList.add("full");
}

/* SOUND ON HOVER (DESKTOP) */
hero.addEventListener("mouseenter",()=>{
  sound.currentTime = 0;
  sound.volume = 0.5;
  sound.play().catch(()=>{});
});

hero.addEventListener("mouseleave",()=>{
  sound.pause();
});

/* ================= GALLERY LIGHTBOX ================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-grid img").forEach(img=>{
  img.addEventListener("click",()=>{
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click",()=>{
  lightbox.style.display = "none";
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if(link.getAttribute("href") === "#" + current){
      link.classList.add("active");
    }
  });

});

const targetDate = new Date("June 28, 2026 15:00:00").getTime();

setInterval(() => {

  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

},1000);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click",()=>{

  navMenu.classList.toggle("active");

});