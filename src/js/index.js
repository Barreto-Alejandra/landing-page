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

// Library name
// import example from "example";



//////////////////////////
// JS BLOCKS
//////////////////////////

// header
class Header {
  constructor () {
    this.toggleMenu = this.toggleMenu.bind(this);
    this.accesibilityInit = this.accesibilityInit.bind(this);
    this.state = {
      menuActive: false,
      subMenuActive: false,
    };

    this.headerBlock = document.querySelector('#header');
    this.start();
  }
  start() {
    if (this.headerBlock) {
      //sticky
      this.stickyBlock = this.headerBlock.querySelector('.header-fix');

      //responsive menu
      this.buttonMenu = this.headerBlock.querySelector('#button-menu');
      this.headerMenu = this.headerBlock.querySelector('#header-menu');

      //sticky
      this.stickyTransparent();

      //listener
      this.buttonMenu.addEventListener('click', this.toggleMenu);
    }
  }

  toggleMenu() {
    if (this.state.menuActive === false) {
      this.buttonMenu.classList.add('is-active');
      this.headerMenu.classList.add('is-active');
      this.headerBlock.classList.add('is-active');
      document.body.classList.add('hidde-menu');

      this.headerMenu.display = 'flex';
      TweenMax.to(this.headerMenu, 0.5, {
        delay: 0.2,
        height: '100%',
        opacity: 1,
      });

      setTimeout(() => {
        this.state.menuActive = true;
      }, 800);

    } else {
      this.buttonMenu.classList.remove('is-active');
      this.headerMenu.classList.remove('is-active');
      this.headerBlock.classList.remove('is-active');
      document.body.classList.remove('hidde-menu');
      // this.accesibilityInit({matches: false});
      TweenMax.to(this.headerMenu, 0.3, {
        delay: 0.1,
        height: "100%",
        top: "100%",
        opacity: 0,
        onComplete: () => {
          TweenMax.set(this.headerMenu, {
            clearProps: "all",
          });
        },
      });
    }
  }
  stickyTransparent() {
    window.onscroll = () => {
      const trigger = this.headerBlock.offsetHeight;
      if (
        window.pageYOffset >
        trigger - this.headerBlock.offsetHeight / 2
      ) {
        this.headerBlock.classList.add("is-sticky");
      } else {
        this.headerBlock.classList.remove("is-sticky");
      }
    };
  }
  accesibilityInit() {
    const keyItem = this.acckey[this.acckey.length - 1].children[0];

    keyItem.addEventListener("focusout", (e) => {
      this.buttonMenu.focus();
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