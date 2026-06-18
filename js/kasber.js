const menu_button = document.querySelector(".toggle-menu");
const menu = document.querySelector("header .container ul");
const menu_a = document.querySelector("header .container ul li a ");
const landing = document.querySelector(".landing");
const bulletsList = document.querySelectorAll(".landing .bullets li");
const links = document.querySelectorAll("header li a");
const mood = document.querySelector(".form i");
const moodIcon = document.getElementById("moodIcon");
const portImages = document.querySelectorAll(".portfolio .box-photos .photo");
const shuffleLists = document.querySelectorAll(".shuffle ul li");

//#region Start header */
menu_button.onclick = () => {
  menu_button.classList.toggle("active");
};

menu_button.addEventListener("click", function () {
  menu.classList.toggle("appear");
});

links.forEach((a) => {
  a.addEventListener("click", function () {
    menu_button.classList.remove("active");
  });
});

//#endregion End header */

//#region Landing */

let indexOfImages = 0;
backgrounds = [
  "/images/night.webp",
  "/images/landing.webp",
  "/images/subscribe.webp",
];

bulletsList.forEach((li, i) => {
  li.setAttribute("data-id", i);
  li.addEventListener("click", (e) => {
    bulletsList.forEach((li) => li.classList.remove("active"));
    e.target.classList.add("active");
    indexOfImages = e.target.getAttribute("data-id");
    landing.style.backgroundImage = `url(${backgrounds[indexOfImages]})`;
  });
});

//#endregion Landing */

//#region Start portfolio //

function filterImages(NameOfClass) {
  portImages.forEach((image) => {
    image.classList.remove("appear");
    if (image.classList.contains(NameOfClass)) {
      image.classList.add("appear");
    } else if (NameOfClass === "all") {
      image.classList.add("appear");
    }
  });
}

shuffleLists.forEach((list) => {
  list.onclick = () => {
    shuffleLists.forEach((all) => {
      all.classList.remove("active");
    });
    list.classList.add("active");

    filterImages(list.classList[0]);
  };
});

//#endregion End portfolio //

//#region dark mood
const moodValue = localStorage.getItem("darkMode");
if (JSON.parse(moodValue)) {
  darkMode(moodValue);
} else {
  localStorage.setItem("darkMode", "false");
}
function darkMode(value) {
  if (value) {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("darkMode", "true");
    moodIcon.classList.remove("fa-sun");
    moodIcon.classList.add("fa-moon");
  } else {
    document.documentElement.dataset.theme = "light";
    localStorage.setItem("darkMode", "false");
    moodIcon.classList.add("fa-sun");
    moodIcon.classList.remove("fa-moon");
  }
}
mood.addEventListener("click", function () {
  if (localStorage.getItem("darkMode") === "false") {
    localStorage.setItem("darkMode", "true");
    darkMode(true);
  } else {
    localStorage.setItem("darkMode", "false");
    darkMode(false);
  }
});
//#endregion

//#region animation

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 },
);

const cards = document.querySelectorAll(".fade-up");
cards.forEach((el) => observer.observe(el));

// top-btn
const topAnchor = document.getElementById("topAnchor");
const scrollBtn = document.getElementById("scrollToTioBtn");

const btnObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});
btnObserver.observe(topAnchor);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//#endregion animation
