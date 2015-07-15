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
var mediaBreakpoint   = 992; // width at which to switch mobile/desktop versions
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
    Velocity(menuButton, {'width': 65}, {duration: 200, easing: "ease-in-out", queue: false});
    Velocity(menuMobile, {'top': 0}, {duration: 200, easing: "ease-in-out", queue: false});
    Velocity(tint, {'opacity': '0.4'}, {'display': 'block'}, {duration: 200, queue: false});
    Velocity(close, {'margin-top': '-4px'}, {duration: 200, easing: "ease-in-out", queue: false});
  } else {               // close menu
    Velocity(menuButton, {'width': 90}, {duration: 200, easing: "ease-in-out", queue: false});
    Velocity(menuMobile, {'top': '-144px'}, {duration: 200, easing: "ease-in-out", queue: false});
    Velocity(tint, {'opacity': 0}, {'display': 'none'}, {duration: 200, queue: false});
    Velocity(close, {'margin-top': '-69px'}, {duration: 200, easing: "ease-in-out", queue: false});
  }
  menuMobileOpen = !menuMobileOpen;
}

var getMenuDesktopHeight = function() {
  vertical_position = getVerticalPosition();
  value = (220 - vertical_position/1.2);
  if (value < 65) {
    value = 65;
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

var topCircle         = document.querySelector('.top-circle');
var circleMaxDiameter = document.querySelector('.circle').clientWidth;
var logo              = document.querySelector('.logo');
var header            = document.querySelector('.header');
var headerShadow      = document.querySelector('.header-shadow');
var circleThreshold   = logo.clientHeight;
var insuranceLogos    = document.querySelector('.insurance-logos.front');
var insuranceLogosShadows = document.querySelector('.insurance-logos.shadows');

//if (screenWidth() >= mediaBreakpoint) {
//  circleMaxDiameter += 50;
//}

var setDiameter = function(diameter) {
  diameter = parseInt(diameter);
  if (diameter < circleThreshold) {
    diameter = circleThreshold;
  }
  topCircle.style.height = diameter + 'px';
  topCircle.style.width  = diameter + 'px';
}

var getDiameter = function() { return topCircle.clientHeight }

setDiameter(circleMaxDiameter - getVerticalPosition()*2)

window.onscroll = function (e) {
  vertical_position = getVerticalPosition();
  setDiameter(circleMaxDiameter - vertical_position*2.2);
  if (getDiameter() > circleThreshold) {
    logo.style.opacity = 0;
  } else if (getDiameter() == circleThreshold) {
    logo.style.opacity = 1;
  }
  if (menuMobileOpen) {
    toggleMenuMobile();
  }
  if (!menuDesktopOpen) { // desktop menu
    menuDesktop.style.maxHeight = getMenuDesktopHeight() + 'px';
  }
  if (verge.inViewport(header)) {
    header.style.top = -vertical_position/2 + 'px';
  }
//  if (verge.inViewport(insuranceLogos)) {
//    var offset = (screenWidth() >= mediaBreakpoint) ? 1450 : 1800;
//    insuranceLogosShadows.style.top = (vertical_position - offset)/11 + 'px';
//    insuranceLogos.style.top = (vertical_position - offset)/9 + 'px';
//  }
}

/**************** CONTENT ADJUSTMENT ******************/

var fillers = document.querySelectorAll('.filler')

for (var i = 0, l = fillers.length; i < l; i++) {
  var descriptionHeight = fillers[i].nextElementSibling.clientHeight;
  console.log(descriptionHeight);
  fillers[i].style.height = (430 - descriptionHeight) / 2 + 'px';
}