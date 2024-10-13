/* Header Variables */
const topNavBar = document.getElementById("top-nav-bar");
const navBtns = document.querySelectorAll(".nav-btn");
const funcBtns = document.querySelectorAll(".func .nav-btn");
const arrows = document.querySelectorAll(".fa-angle-down");
const modals = document.querySelectorAll(".modal");
const logoWrapper = document.getElementById("logo-wrapper");
const logoImg = document.getElementById("logo-img");
const logo = document.getElementById("logo");
const instaLogo = document.getElementById("insta-logo");
const cartIcon = document.getElementById("cart-icon");

/* Colors */
const lightGrey = "#FAF9F6";
const darkGrey = "#6F7378";

/* etc. */
const transitionDuration = "0.2s";
const hidden = "hidden";
const arrowDuration = 100;
const rotate0 = "rotate(0)";
const rotate180 = "rotate(180deg)";
const forwards = "forwards";
const click = "click";

/* Flags */
let isOpen = false;
let login = false;

// Navigation Effect
topNavBar.style.transitionDuration = transitionDuration;
instaLogo.style.transitionDuration = transitionDuration;

function logoColorChange(color) {
  logoWrapper.style.border = `3px solid ${color}`;
  logoImg.style.color = color;
  logo.style.color = color;
}

// Top Nav Bar Change and Modal Close When Scrolled
window.onscroll = function () {
  if (window.pageYOffset > 0) {
    topNavBar.style.height = "9vh";
    topNavBar.style.backgroundColor = white;
    logoColorChange("#1a1b1e");
    navBtns.forEach((btn) => {
      btn.style.color = darkGrey;
      btn.onmouseover = function () {
        this.style.color = black;
      };
      btn.onmouseleave = function () {
        this.style.color = darkGrey;
      };
    });
    instaLogo.style.color = darkGrey;
    instaLogo.onmouseover = function () {
      this.style.color = white;
    };
    instaLogo.onmouseleave = function () {
      this.style.color = darkGrey;
    };
  } else {
    topNavBar.style.height = "12vh";
    topNavBar.style.backgroundColor = "transparent";
    logoColorChange(white);
    navBtns.forEach((btn) => {
      btn.style.color = lightGrey;
      btn.onmouseover = function () {
        this.style.color = white;
      };
      btn.onmouseleave = function () {
        this.style.color = lightGrey;
      };
    });
    instaLogo.style.color = lightGrey;
    instaLogo.onmouseleave = function () {
      this.style.color = lightGrey;
    };
  }

  if (isOpen) {
    modals.forEach((modal) => {
      modal.classList.add(hidden);
      isOpen = false;
    });

    arrows.forEach((arrow) => {
      arrow.animate(
        {
          transform: [rotate0],
        },
        {
          duration: arrowDuration,
          fill: forwards,
        }
      );
    });
  }
};

// Top Nav Bar Left Btns Modal
funcBtns.forEach((btn) => {
  btn.addEventListener(click, (event) => {
    event.preventDefault();

    if (!btn.nextElementSibling.classList.contains(hidden)) {
      btn.nextElementSibling.classList.add(hidden);
      isOpen = false;
      btn.childNodes[1].animate(
        {
          transform: [rotate0],
        },
        {
          duration: arrowDuration,
          fill: forwards,
        }
      );
    } else {
      modals.forEach((modal, idx) => {
        modal.classList.add(hidden);
        funcBtns[idx].childNodes[1].animate(
          {
            transform: [rotate0],
          },
          {
            duration: arrowDuration,
            fill: forwards,
          }
        );
      });
      btn.nextElementSibling.classList.remove(hidden);
      isOpen = true;
      btn.childNodes[1].animate(
        {
          transform: [rotate180],
        },
        {
          duration: arrowDuration,
          fill: forwards,
        }
      );
    }
  });
});

/* Cart Icon Clicked Event */
cartIcon.addEventListener(click, () => {
  if (!login) {
    alert("Please sign in first.");
  }
});
