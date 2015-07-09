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
  value = (220 - vertical_position/1.9);
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
var circleThreshold   = logo.clientHeight;

//var scaleElement = function (element, value) {
//  if (value < 1.0) {
//    value = 1;
//  }
//  topCircle.style.msTransform = "scale(" + value + "," + value + ")";
//  topCircle.style.webkitTransform = "scale(" + value + "," + value + ")";
//  topCircle.style.transform = "scale(" + value + "," + value + ")";
//}

//var getScaleElement = function (element) {
//  var value;
//  if (topCircle.style.transform) value = parseFloat(topCircle.style.transform.slice(6));
//  if (topCircle.style.webkitTransform) value = parseFloat(topCircle.style.webkitTransform.slice(6));
//  if (topCircle.style.msTransform) value = parseFloat(topCircle.style.msTransform.slice(6));
//  return value;
//}
//var currentScale = getScaleElement(topCircle);

//scaleElement(topCircle, topCircleMaxScale);

if (screenWidth < mediaBreakpoint) {
  circleMaxDiameter = (parseInt(circleMaxDiameter) - 200) + 'px';
}

var setDiameter = function(diameter) {
  diameter = parseInt(diameter);
  if (diameter < circleThreshold) {
    diameter = circleThreshold;
  }
  topCircle.style.height = diameter + 'px';
  topCircle.style.width  = diameter + 'px';
}

var getDiameter = function() { return topCircle.clientHeight }

setDiameter(circleMaxDiameter);

window.onscroll = function (e) {
  vertical_position = getVerticalPosition();
  setDiameter(circleMaxDiameter - vertical_position*1.5);
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
  header.style.top = -vertical_position/3 + 'px';
  
}