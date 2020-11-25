/////// Polyfill
import './polyfills/polyfill';

//////////////////////////
// IMPORT CSS
//////////////////////////

/////// LIBRARIES CSS
import 'bootstrap/dist/css/bootstrap-grid.css';
/////// MAIN CSS
import '../css/style.sass';

//GSAP
import gsap from "gsap";
import { TweenMax, TimelineMax, Power2 } from "gsap/all";
gsap.registerPlugin(TweenMax, TimelineMax, Power2);


//////////////////////////
// IMPORT LIBRARIES JS
//////////////////////////




// header
class Header {
  constructor() {
    this.toggleMenu = this.toggleMenu.bind(this);
    this.accesibilityInit = this.accesibilityInit.bind(this);

    this.state = {
      menuActive: false,
      subMenuActive: false,
    };
    this.headerContainer = document.querySelector("#header");
    this.start();
  }
  start() {
    if (this.headerContainer) {
      // Sticky container
      this.stickyContainer = this.headerContainer.querySelector(".header-fix");
      // Responsive menu
      this.menuButton = this.headerContainer.querySelector("#button__menu");
      this.mainMenu = this.headerContainer.querySelector("#main__menu");

      // Sub menu system
      this.menuItems = this.headerContainer.querySelectorAll(
        ".header__nav--menu > .menu-item"
      );
      this.subMenuContainer = this.headerContainer.querySelectorAll(
        ".header__nav--menu > .menu-item-has-children"
      );
      this.subMenuContainerL2 = this.headerContainer.querySelectorAll(
        ".header__nav--menu > .menu-item-has-children"
      );

      // Sticky menu
      this.stickyTransparent();

      // Accesibility
      this.acckey = this.headerContainer.querySelectorAll(
        ".header__navigation--social .social-item"
      );

      // Listeners
      this.menuButton.addEventListener("click", this.toggleMenu);
    }
  }
  toggleMenu() {
    if (this.state.menuActive === false) {
      this.menuButton.classList.add("is-active");
      this.mainMenu.classList.add("is-active");
      this.headerContainer.classList.add("is-active");
      document.body.classList.add("hidde-menu");
      // this.accesibilityInit({matches: true});

      this.mainMenu.style.display = "flex";
      TweenMax.to(this.mainMenu, 0.5, {
        delay: 0.2,
        height: "100%",
        opacity: 1,
      });
      TweenMax.to(this.socialMobile, 0.8, {
        delay: 0.2,
        opacity: 1,
      });
      TweenMax.to(this.menuItems, 0.8, {
        delay: 0.2,
        opacity: 1,
        y: 0,
      });

      setTimeout(() => {
        this.state.menuActive = true;
      }, 800);
    } else {
      this.menuButton.classList.remove("is-active");
      this.mainMenu.classList.remove("is-active");
      this.headerContainer.classList.remove("is-active");
      document.body.classList.remove("hidde-menu");
      // this.accesibilityInit({matches: false});
      TweenMax.to(this.mainMenu, 0.3, {
        delay: 0.1,
        height: "100%",
        top: "100%",
        opacity: 0,
        onComplete: () => {
          TweenMax.set(this.mainMenu, {
            clearProps: "all",
          });
        },
      });
      TweenMax.to(this.menuItems, 0.1, {
        opacity: 0,
        y: "20px",
        onComplete: () => {
          TweenMax.set(this.menuItems, {
            clearProps: "all",
          });
        },
      });
      setTimeout(() => {
        this.state.menuActive = false;
      }, 400);
    }
  }
  
  stickyTransparent() {
    window.onscroll = () => {
      const trigger = this.headerContainer.offsetHeight;
      if (
        window.pageYOffset >
        trigger - this.headerContainer.offsetHeight / 2
      ) {
        this.headerContainer.classList.add("is-sticky");
      } else {
        this.headerContainer.classList.remove("is-sticky");
      }
    };
  }
  accesibilityInit() {
    const keyItem = this.acckey[this.acckey.length - 1].children[0];

    keyItem.addEventListener("focusout", (e) => {
      this.menuButton.focus();
    });
  }
}


////////////////////
// Run apps
////////////////////
document.addEventListener('DOMContentLoaded', function () {
  var header = new Header();
});




////////////////////
// Keyboard focus
////////////////////

function keyboardFocus (e) {
  if (e.keyCode === 9) { // Tab key
    document.documentElement.classList.add('keyboard-focus');
  }

  document.removeEventListener('keydown', keyboardFocus, false);
}

document.documentElement.classList.remove('no-js');
document.addEventListener('keydown', keyboardFocus, false);