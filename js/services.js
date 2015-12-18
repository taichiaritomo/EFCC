/***************** UTILITIES *******************/
var getVerticalPosition = function() {
  var vertical_position = 0;
  if (pageYOffset) //usual
    vertical_position = pageYOffset;
  else if (document.documentElement.clientHeight) //ie
    vertical_position = document.documentElement.scrollTop;
  else if (document.body) //ie quirks
    vertical_position = document.body.scrollTop;
  return vertical_position
}

/***************** MENU EVENTS *****************/
var mediaBreakpoint   = 768; // width at which to switch mobile/desktop versions
var screenWidth       = function() { return document.body.clientWidth; }
var menuButton        = document.querySelector('button.menu');
var menuMobile        = document.querySelector('nav.menu-mobile');
var tint              = document.querySelector('.tint');
var menuMobileOpen    = false;
var menuDesktop       = document.querySelector('nav.menu');
var menuDesktopHeight = menuDesktop.style.maxHeight;
var menuDesktopOpen   = false;
var close             = document.querySelector('.close');

var toggleMenuMobile = function() {
  if (!menuMobileOpen) { // open menu
//    Velocity(menuButton, {'width': 65}, {duration: 200, easing: "ease-in-out", queue: false});
    Velocity(menuMobile, {'top': 0}, {duration: 200, easing: "ease-in-out", queue: false});
    Velocity(tint, {'opacity': '0.4'}, {'display': 'block'}, {duration: 200, queue: false});
    Velocity(close, {'margin-top': '53px'}, {duration: 200, easing: "ease-in-out", queue: false});
  } else {               // close menu
//    Velocity(menuButton, {'width': 90}, {duration: 200, easing: "ease-in-out", queue: false});
    Velocity(menuMobile, {'top': '-144px'}, {duration: 200, easing: "ease-in-out", queue: false});
    Velocity(tint, {'opacity': 0}, {'display': 'none'}, {duration: 200, queue: false});
    Velocity(close, {'margin-top': '-8px'}, {duration: 200, easing: "ease-in-out", queue: false});
  }
  menuMobileOpen = !menuMobileOpen;
}

var getMenuDesktopHeight = function() {
  vertical_position = getVerticalPosition();
  value = (170 - vertical_position/1.2);
  if (value < 50) {
    value = 50;
  }
  return value;
}


menuButton.onclick = toggleMenuMobile;
tint.onclick = toggleMenuMobile;
menuDesktop.onmouseover = function() {
  Velocity(menuDesktop, {'max-height': '220px'}, {duration: 200, easing: "ease-in-out", queue: false});
  menuDesktopOpen = true;
};
menuDesktop.onmouseout = function() {
  Velocity(menuDesktop, {'max-height': getMenuDesktopHeight() + 'px'}, {duration: 200, easing: "ease-in-out", queue: false});
  menuDesktopOpen = false;
}


/***************** SCROLLING EVENTS *****************/

var header            = document.querySelector('.header');

window.onscroll = function (e) {
  vertical_position = getVerticalPosition();
  if (vertical_position < 300) {
    header.style.bottom = 20 + vertical_position/5 + 'px';
  }
  if (menuMobileOpen) {
    toggleMenuMobile();
  }
  if (!menuDesktopOpen) { // desktop menu
    menuDesktop.style.maxHeight = getMenuDesktopHeight() + 'px';
  }
}