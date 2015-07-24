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
var menuDesktopMinHeight = 50;
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
  value = (150 - vertical_position);
  if (value < menuDesktopMinHeight) {
    value = menuDesktopMinHeight;
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

/***************** TOP CIRCLE ***********************/

var topCircleDesktop  = document.querySelector('.top-circle.hidden-xs');
var logo              = document.querySelector('.logo');
var circleThreshold   = logo.clientHeight;
var inflateRatio = 1;

var topCircleAdjust = function() {
  var diameter = inflateRatio * screenWidth()*1.8 - getVerticalPosition()*10;
  if (diameter < circleThreshold) {
    diameter = circleThreshold;
  }
  diameter = diameter + 'px';
  topCircleDesktop.style.height = diameter;
  topCircleDesktop.style.width = diameter;
}

var circleInflate = function(event) {
  if (screenWidth() >= mediaBreakpoint) {
    var distance = Math.sqrt(Math.pow(event.clientX - 45, 2) + Math.pow(event.clientY - 45, 2));
    inflateRatio = 1 - 0.00005*(distance - (screenWidth()*1.8 - getVerticalPosition()*10)/2);
    topCircleAdjust();
  }
}

document.addEventListener("mousemove", circleInflate, false);


/***************** SCROLLING EVENTS *****************/


var topCircleMobile   = document.querySelector('.top-circle.visible-xs');
var header            = document.querySelector('.header');
var scroll            = document.querySelector('.scroll');
var insuranceLogos    = document.querySelector('.insurance-logos.front');

var setDiameter = function(vertical_position) {
  if (screenWidth() >= mediaBreakpoint) {
    topCircleAdjust();
  } else {
    var diameter = 420 - vertical_position*3;
    if (diameter < circleThreshold) {
      diameter = circleThreshold;
    }
    diameter = diameter + 'px';
    topCircleMobile.style.height = diameter;
    topCircleMobile.style.width = diameter;
  }
}

var getDiameter = function() {
  return (screenWidth() >= mediaBreakpoint) ? topCircleDesktop.clientHeight : topCircleMobile.clientHeight;
}

setDiameter(getVerticalPosition());

window.onscroll = function (e) {
  vertical_position = getVerticalPosition();
  if (vertical_position < 300) {
    header.style.top = -vertical_position*2 + 'px';
    scroll.style.opacity = 1 - vertical_position/50;
    scroll.style.bottom = vertical_position*1.3 + 50 + 'px';
  }
  setDiameter(vertical_position);
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
}

/**************** CONTENT ADJUSTMENT ******************/

var mainFiller = document.querySelector('.main-filler');
console.log(document.documentElement.clientHeight);
mainFiller.style.height = (document.documentElement.clientHeight - 450) + 'px';

var fillers = document.querySelectorAll('.filler');

for (var i = 0, l = fillers.length; i < l; i++) {
  var descriptionHeight = fillers[i].nextElementSibling.clientHeight;
  console.log(descriptionHeight);
  var circleDiameter = document.querySelector('.circle').clientWidth;
  fillers[i].style.height = (circleDiameter + 24 - descriptionHeight) / 2 + 'px';
}