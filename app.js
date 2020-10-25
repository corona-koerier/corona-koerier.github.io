document.addEventListener('DOMContentLoaded',function(){

	var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

	window.onresize = function(event) {
		lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
	};

	function getOffset( el ) {
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	};

	function addNewClass(elements, myClass) {
		if (!elements) { return; }
		if (typeof(elements) === 'string') {
			elements = document.querySelectorAll(elements);
		}
		else if (elements.tagName) { elements=[elements]; }
		for (var i=0; i<elements.length; i++) {
			if ( (' '+elements[i].className+' ').indexOf(' '+myClass+' ') < 0 ) {
				elements[i].className += ' ' + myClass;
			}
		}
	};

	function removeClass(elements, myClass) {
		if (!elements) { return; }

		if (typeof(elements) === 'string') {
			elements = document.querySelectorAll(elements);
		}
		else if (elements.tagName) { elements=[elements]; }
		var reg = new RegExp('(^| )'+myClass+'($| )','g');
		for (var i=0; i<elements.length; i++) {
			elements[i].className = elements[i].className.replace(reg,' ');
		}
	}

	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
		var smoothScroll = function (anchor, duration) {
			var startLocation = window.pageYOffset;
			var endLocation = anchor.offsetTop - 40;
			var distance = endLocation - startLocation;
			var increments = distance/(duration/16);
			var stopAnimation;
			var animateScroll = function () {
				window.scrollBy(0, increments);
				stopAnimation();
			};
			if ( increments >= 0 ) {
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
						clearInterval(runAnimation);
					}
				};
			}
			var runAnimation = setInterval(animateScroll, 16);
		};
		var scrollToggle = document.querySelectorAll('.scroll');
		[].forEach.call(scrollToggle, function (toggle) {
			toggle.addEventListener('click', function(e) {
				e.preventDefault();
				var dataTarget = document.querySelector('.landing__section');
				var dataSpeed = toggle.getAttribute('data-speed');
				if (dataTarget) {
					smoothScroll(dataTarget, dataSpeed || 700);
				}
			}, false);
		});
	}


	window.addEventListener("scroll",function(){

		if (document.body.contains(document.getElementById("navConverter"))){
			var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if (lastScrollTop > (getOffset( document.getElementById('navConverter') ).top - 60)){ removeClass(document.querySelector('.navbar'),'navbar--extended');} else {addNewClass(document.querySelector('.navbar'),'navbar--extended');}
		}

		if (document.body.contains(document.getElementById('scrollToNext'))){
			var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if (lastScrollTop > 20){ addNewClass(document.getElementById('scrollToNext'),'invisible');} else {removeClass(document.getElementById('scrollToNext'),'invisible');}
		}
	});

	if (document.getElementsByClassName("nav__mobile") && document.getElementsByClassName('nav__mobile').length > 0){
		var navElements = document.getElementsByClassName('navbar__menu')[0].innerHTML;
		document.getElementsByClassName('nav__mobile')[0].innerHTML = navElements;
		var nav = responsiveNav(".nav__mobile", {
			animate: true,
			transition: 284,
			label: "Menu",
			insert: "before",
			customToggle: "toggle",
			openPos: "relative",
			navClass: "nav__mobile",
		});
	} else {
		addNewClass(document.querySelector('.navbar__menu'),'navbar__menu--noMob');
		addNewClass(document.querySelector('.navbar__menu-mob'), 'navbar__menu-mob--noMob');
	};

	var navbarMenuLinks = document.querySelectorAll('.navbar__menu li a');
	[].forEach.call(navbarMenuLinks, function (navbarMenuLink) {
		navbarMenuLink.addEventListener('click', function(e) {
			e.preventDefault();
			var scrollToClass = navbarMenuLink.getAttribute('data-scroll-to');
			var dataTarget = document.querySelector('.' + scrollToClass);
			if (dataTarget) {
				dataTarget.scrollIntoView({ behavior: 'smooth', block: 'center'});
			}
		}, false);
	});

});
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.flexibility = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
		module.exports = function alignContent(target) {
			var start;
			var factor;

			if (target.lines.length < 2 || target.alignContent === 'stretch') {
				factor = target.crossSpace / target.lines.length;
				start = 0;

				target.lines.forEach(function (line) {
					line.crossStart = start;
					line.cross += factor;

					start += line.cross;
				});
			} else if (target.alignContent === 'flex-start') {
				start = 0;

				target.lines.forEach(function (line) {
					line.crossStart = start;

					start += line.cross;
				});
			} else if (target.alignContent === 'flex-end') {
				start = target.crossSpace;

				target.lines.forEach(function (line) {
					line.crossStart = start;

					start += line.cross;
				});
			} else if (target.alignContent === 'center') {
				start = target.crossSpace / 2;

				target.lines.forEach(function (line) {
					line.crossStart = start;

					start += line.cross;
				});
			} else if (target.alignContent === 'space-between') {
				factor = target.crossSpace / (target.lines.length - 1);
				start = 0;

				target.lines.forEach(function (line) {
					line.crossStart = start;

					start += line.cross + factor;
				});
			} else if (target.alignContent === 'space-around') {
				factor = target.crossSpace * 2 / (target.lines.length * 2);
				start = factor / 2;

				target.lines.forEach(function (line) {
					line.crossStart = start;

					start += line.cross + factor;
				});
			} else if (target.alignContent === 'stretch') {
				factor = target.crossSpace / target.lines.length;
				start = 0;

				target.lines.forEach(function (line) {
					line.crossStart = start;
					line.cross += factor;

					start += line.cross;
				});
			}
		};

	},{}],2:[function(require,module,exports){
		module.exports = function alignItems(target) {
			target.lines.forEach(function (line) {
				line.children.forEach(function (child) {
					if (child.alignSelf === 'flex-start') {
						child.crossStart = line.crossStart;
					} else if (child.alignSelf === 'flex-end') {
						child.crossStart = line.crossStart + line.cross - child.crossAround;
					} else if (child.alignSelf === 'center') {
						child.crossStart = line.crossStart + (line.cross - child.crossAround) / 2;
					} else if (child.alignSelf === 'stretch') {
						child.crossStart = line.crossStart;
						child.crossAround = line.cross;
					}
				});
			});
		};

	},{}],3:[function(require,module,exports){
		module.exports = function flexDirection(target, targetFlexDirection, targetAlignItems) {
			var clientRect = target.node.getBoundingClientRect();

			if (targetFlexDirection === 'row' || targetFlexDirection === 'row-reverse') {
				target.mainAxis  = 'inline';
				target.crossAxis = 'block';

				if (typeof target.main === 'number' || typeof target.cross === 'number') {
					if (target.flexDirection === 'row' || targetFlexDirection === 'row-reverse') {
						target.width  = target.main;
						target.height = target.cross;
					} else {
						target.width  = target.cross;
						target.height = target.main;
					}
				}

				target.main  = target.width;
				target.cross = target.height;

				target.mainClient  = clientRect.width  || target.node.offsetWidth;
				target.crossClient = clientRect.height || target.node.offsetHeight;

				target.mainBefore  = target.marginLeft;
				target.mainAfter   = target.marginRight;
				target.crossBefore = target.marginTop;
				target.crossAfter  = target.marginBottom;
			} else {
				target.mainAxis  = 'block';
				target.crossAxis = 'inline';

				target.main  = target.height;
				target.cross = target.width;

				if (typeof target.main === 'number' || typeof target.cross === 'number') {
					if (target.flexDirection === 'column' || targetFlexDirection === 'column-reverse') {
						target.width  = target.cross;
						target.height = target.main;
					} else {
						target.width  = target.main;
						target.height = target.cross;
					}
				}

				target.mainClient  = clientRect.height || target.node.offsetHeight;
				target.crossClient = clientRect.width  || target.node.offsetWidth;

				target.mainBefore  = target.marginTop;
				target.mainAfter   = target.marginBottom;
				target.crossBefore = target.marginLeft;
				target.crossAfter  = target.marginRight;
			}

			if (typeof target.flexBasis === 'number') {
				target.main = target.flexBasis;
			}

			if (target.main === 'auto') {
				target.mainAround = target.mainClient;
			} else {
				target.mainAround = target.main;
			}

			if (target.cross === 'auto') {
				target.crossAround = target.crossClient;
			} else {
				target.crossAround = target.cross;
			}

			if (typeof target.mainBefore === 'number') {
				target.mainAround += target.mainBefore;
			}

			if (typeof target.mainAfter === 'number') {
				target.mainAround += target.mainAfter;
			}

			if (typeof target.crossBefore === 'number') {
				target.crossAround += target.crossBefore;
			}

			if (typeof target.crossBefore === 'number') {
				target.crossAround += target.crossBefore;
			}

			if (target.alignSelf === 'auto') {
				target.alignSelf = targetAlignItems;
			}
		};

	},{}],4:[function(require,module,exports){
		module.exports = function flexGrow(line) {
			if (line.mainSpace > 0) {
				var growFactor = line.children.reduce(function (lastGrowFactor, child) {
					return lastGrowFactor + child.flexGrow;
				}, 0);

				if (growFactor > 0) {
					line.children.forEach(function (child) {
						child.mainAround += child.flexGrow / growFactor * line.mainSpace;
					});

					line.main = line.children.reduce(function (main, child) {
						return main + child.mainAround;
					}, 0);

					line.mainSpace = 0;
				}
			}
		};

	},{}],5:[function(require,module,exports){
		module.exports = function flexShrink(line) {
			if (line.mainSpace < 0) {
				var shrinkFactor = line.children.reduce(function (lastShrinkFactor, child) {
					return lastShrinkFactor + child.flexShrink;
				}, 0);

				if (shrinkFactor > 0) {
					line.children.forEach(function (child) {
						child.mainAround += child.flexShrink / shrinkFactor * line.mainSpace;
					});

					line.main = line.children.reduce(function (main, child) {
						return main + child.mainAround;
					}, 0);

					line.mainSpace = 0;
				}
			}
		};

	},{}],6:[function(require,module,exports){
		module.exports = function flexboxLines(target) {
			var line;

			target.lines = [line = {
				main:  0,
				cross: 0,
				children: []
			}];

			target.children.forEach(function (child) {
				if (
					target.flexWrap === 'nowrap' ||
					line.children.length === 0 ||
					target.mainAround >= line.main + child.mainAround
				) {
					line.main += child.mainAround;
					line.cross = Math.max(line.cross, child.crossAround);
				} else {
					target.lines.push(line = {
						main:  child.mainAround,
						cross: child.crossAround,
						children: []
					});
				}

				line.children.push(child);
			});
		};

	},{}],7:[function(require,module,exports){
		module.exports = function flexbox(target) {
			target.descendants.forEach(function (descendant) {
				module.exports(descendant);
			});

			if (target.display === 'flex') {
				target.children.forEach(function (child) {
					require('./flex-direction')(child, target.flexDirection, target.alignItems);
				});
			} else {
				return target;
			}

			require('./order')(target);
			require('./flex-direction')(target, target.flexDirection, target.alignItems);
			require('./flexbox-lines')(target);

			if (target.main === 'auto') {
				target.main = Math.max(target.mainAround, target.lines.reduce(function (main, line) {
					return Math.max(main, line.main);
				}, 0));

				if (target.flexDirection === 'row') {
					target.mainAround = target.mainClient + target.mainBefore + target.mainAfter;
				} else {
					target.mainAround = target.main + target.mainBefore + target.mainAfter;
				}
			}

			if (target.cross === 'auto') {
				target.cross = target.lines.reduce(function (cross, line) {
					return cross + line.cross;
				}, 0);

				if (target.flexDirection === 'column') {
					target.crossAround = target.crossClient + target.crossBefore + target.crossAfter;
				} else {
					target.crossAround = target.cross + target.crossBefore + target.crossAfter;
				}

				target.crossSpace = target.crossAround - target.cross;
			} else {
				target.crossSpace = target.cross - target.lines.reduce(function (cross, line) {
					return cross + line.cross;
				}, 0);
			}

			require('./align-content')(target);

			target.lines.forEach(function (line) {
				line.mainSpace = target.main - line.main;

				require('./flex-grow')(line);
				require('./flex-shrink')(line);
				require('./margin-main')(line);
				require('./margin-cross')(line);
				require('./justify-content')(line, target.justifyContent);
			});

			require('./align-items')(target);

			return target;
		};

	},{"./align-content":1,"./align-items":2,"./flex-direction":3,"./flex-grow":4,"./flex-shrink":5,"./flexbox-lines":6,"./justify-content":8,"./margin-cross":9,"./margin-main":10,"./order":11}],8:[function(require,module,exports){
		module.exports = function justifyContent(line, targetJustifyContent) {
			var start;
			var factor;

			if (targetJustifyContent === 'flex-start') {
				start = 0;

				line.children.forEach(function (child) {
					child.mainStart = start;

					start += child.mainAround;
				});
			} else if (targetJustifyContent === 'flex-end') {
				start = line.mainSpace;

				line.children.forEach(function (child) {
					child.mainStart = start;

					start += child.mainAround;
				});
			} else if (targetJustifyContent === 'center') {
				start = line.mainSpace / 2;

				line.children.forEach(function (child) {
					child.mainStart = start;

					start += child.mainAround;
				});
			} else if (targetJustifyContent === 'space-between') {
				factor = line.mainSpace / (line.children.length - 1);

				start = 0;

				line.children.forEach(function (child) {
					child.mainStart = start;

					start += child.mainAround + factor;
				});
			} else if (targetJustifyContent === 'space-around') {
				factor = line.mainSpace * 2 / (line.children.length * 2);
				start = factor / 2;

				line.children.forEach(function (child) {
					child.mainStart = start;

					start += child.mainAround + factor;
				});
			}
		};

	},{}],9:[function(require,module,exports){
		module.exports = function marginCross(line) {
			line.children.forEach(function (child) {
				var count = 0;

				if (child.crossBefore === 'auto') {
					++count;
				}

				if (child.crossAfter === 'auto') {
					++count;
				}

				var childSpace = line.cross - child.crossAround;

				if (child.crossBefore === 'auto') {
					child.crossBefore = childSpace / count;

					child.crossAround += child.crossBefore;
				}

				if (child.crossAfter === 'auto') {
					child.crossAfter = childSpace / count;

					child.crossAround += child.crossAfter;
				}
			});
		};

	},{}],10:[function(require,module,exports){
		module.exports = function marginCross(line) {
			var count = 0;

			line.children.forEach(function (child) {
				if (child.mainBefore === 'auto') {
					++count;
				}

				if (child.mainAfter === 'auto') {
					++count;
				}
			});

			if (count > 0) {
				line.children.forEach(function (child) {
					if (child.mainBefore === 'auto') {
						child.mainBefore = line.mainSpace / count;

						child.mainAround += child.mainBefore;
					}

					if (child.mainAfter === 'auto') {
						child.mainAfter = line.mainSpace / count;

						child.mainAround += child.mainAfter;
					}
				});

				line.mainSpace = 0;
			}
		};

	},{}],11:[function(require,module,exports){
		module.exports = function order(target) {
			target.children.sort(function (childA, childB) {
				return childA.order - childB.order || childA.index - childB.index;
			});
		};

	},{}],12:[function(require,module,exports){
		module.exports = function getFlexStyles(target, data, isFlexChild) {
			var style = Object.assign(data, {
				alignContent: 'stretch',
				alignItems: 'stretch',
				alignSelf: 'auto',
				display: 'inline',
				flexBasis: 'auto',
				flexDirection: 'row',
				flexGrow:   0,
				flexShrink: 1,
				flexWrap: 'nowrap',
				justifyContent: 'flex-start',
				height: 'auto',
				marginTop:    0,
				marginRight:  0,
				marginLeft:   0,
				marginBottom: 0,
				maxHeight: 'none',
				maxWidth: 'none',
				minHeight: 0,
				minWidth: 0,
				order: 0,
				position: 'static',
				width: 'auto'
			});

			if (target.hasAttribute('data-style')) {
				target.setAttribute('style', target.getAttribute('data-style'));
			} else {
				target.setAttribute('data-style', target.getAttribute('style') || '');
			}

			var attr = (target.getAttribute('data-style') || '') + ';' + (target.getAttribute('data-flex') || '');
			var re = /([^\s:;]+)\s*:\s*([^;]+?)\s*(;|$)/g;
			var decl;

			while (decl = re.exec(attr)) {
				var name = decl[1].toLowerCase().replace(/-[a-z]/g, function (match) {
					return match.slice(1).toUpperCase();
				});

				style[name] = parseFloat(decl[2]);

				if (isNaN(style[name])) {
					style[name] = decl[2];
				}
			}

			if (isFlexChild) {
				target.style.display  = 'inline-block';
				target.style.position = 'absolute';
			}

			var rect = target.getBoundingClientRect();

			style.clientWidth  = rect.width || target.offsetWidth;
			style.clientHeight = rect.height || target.offsetHeight;

			return style;
		};

	},{}],13:[function(require,module,exports){

		module.exports = function flexibility(target) {
			var data1 = module.exports.walk(target);

			var data2 = module.exports.flexbox(data1);

			var data3 = module.exports.write(data2);

			return data3;
		};

		module.exports.flexbox = require('./flexbox');
		module.exports.getFlexStyles = require('./getFlexStyles');
		module.exports.walk = require('./walk');
		module.exports.write = require('./write');


	},{"./flexbox":7,"./getFlexStyles":12,"./walk":14,"./write":15}],14:[function(require,module,exports){
		var getFlexStyles = require('../getFlexStyles');

		module.exports = function walk(target, ancestorData, isFlexChild) {
			var flexContainerRE = /(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i;
			var isFlexContainer = flexContainerRE.test(target.getAttribute('data-flex'));
			var data = {
				node: target,
				children: [],
				descendants: []
			};

			if (isFlexContainer) {
				if (ancestorData !== undefined) {
					ancestorData.descendants.push(data);
				}
			}

			if (isFlexContainer || !ancestorData) {
				ancestorData = data;
			}

			Array.prototype.forEach.call(target.childNodes, function (childNode) {
				if (isFlexContainer && childNode.nodeType === 3 && childNode.nodeValue.trim()) {
					var oldNode = childNode;

					childNode = target.insertBefore(document.createElement('flex-item'), oldNode);

					childNode.appendChild(oldNode);
				}

				if (childNode.nodeType === 1) {
					var childData = module.exports(childNode, ancestorData, isFlexContainer);

					if (isFlexContainer) {
						data.children.push(childData);
					}
				}
			});

			if (isFlexContainer || isFlexChild) {
				getFlexStyles(target, data, isFlexChild);
			}

			return data;
		};

	},{"../getFlexStyles":12}],15:[function(require,module,exports){
		module.exports = function write(target) {
			target.descendants.filter(function (descendant) {
				return target.children.indexOf(descendant) === -1;
			}).forEach(function (descendant) {
				module.exports(descendant);
			});

			if (!target.display) {
				return;
			}

			var style = target.node.style;

			if ('mainStart' in target) {
				style.position = 'absolute';

				if (target.mainAxis === 'inline') {
					style.left = target.mainStart  + 'px';
					style.top  = target.crossStart + 'px';

					style.marginTop    = target.crossBefore + 'px';
					style.marginRight  = target.mainAfter   + 'px';
					style.marginBottom = target.crossAfter  + 'px';
					style.marginLeft   = target.mainBefore  + 'px';
				} else {
					style.left = target.crossStart + 'px';
					style.top  = target.mainStart  + 'px';

					style.marginTop    = target.mainBefore  + 'px';
					style.marginRight  = target.crossAfter  + 'px';
					style.marginBottom = target.mainAfter   + 'px';
					style.marginLeft   = target.crossBefore + 'px';
				}

				if (target.mainAxis === 'inline') {
					style.width  = target.mainAround  - target.mainBefore - target.mainAfter + 'px';
					style.height = target.crossAround - target.crossBefore - target.crossAfter + 'px';
				} else {
					if (target.cross === 'auto') {
						style.width = target.crossClient - target.crossBefore - target.crossAfter + 'px';
					} else {
						style.width = target.crossAround - target.crossBefore - target.crossAfter + 'px';
					}

					if (target.main === 'auto') {
						style.height = target.mainClient - target.mainBefore - target.mainAfter + 'px';
					} else {
						style.height = target.mainAround - target.mainBefore - target.mainAfter + 'px';
					}
				}
			} else {
				if (!style.position) {
					style.position = 'relative';
				}

				if (target.mainAxis === 'inline') {
					style.width = target.mainAround - target.mainBefore - target.mainAfter + 'px';
					style.height = target.crossAround - target.crossBefore - target.crossAfter + 'px';
				} else {
					style.width = target.crossAround - target.crossBefore - target.crossAfter + 'px';
					style.height = target.mainAround - target.mainBefore - target.mainAfter + 'px';
				}
			}

			if (target.children) {
				target.children.forEach(function (child) {
					module.exports(child);
				});
			}
		};

	},{}]},{},[13])(13)
});

(function (document, window, index) {

	"use strict";

	var responsiveNav = function (el, options) {

		var computed = !!window.getComputedStyle;

		if (!computed) {
			window.getComputedStyle = function(el) {
				this.el = el;
				this.getPropertyValue = function(prop) {
					var re = /(\-([a-z]){1})/g;
					if (prop === "float") {
						prop = "styleFloat";
					}
					if (re.test(prop)) {
						prop = prop.replace(re, function () {
							return arguments[2].toUpperCase();
						});
					}
					return el.currentStyle[prop] ? el.currentStyle[prop] : null;
				};
				return this;
			};
		}

		var addEvent = function (el, evt, fn, bubble) {
				if ("addEventListener" in el) {
					try {
						el.addEventListener(evt, fn, bubble);
					} catch (e) {
						if (typeof fn === "object" && fn.handleEvent) {
							el.addEventListener(evt, function (e) {
								fn.handleEvent.call(fn, e);
							}, bubble);
						} else {
							throw e;
						}
					}
				} else if ("attachEvent" in el) {
					if (typeof fn === "object" && fn.handleEvent) {
						el.attachEvent("on" + evt, function () {
							fn.handleEvent.call(fn);
						});
					} else {
						el.attachEvent("on" + evt, fn);
					}
				}
			},

			removeEvent = function (el, evt, fn, bubble) {
				if ("removeEventListener" in el) {
					try {
						el.removeEventListener(evt, fn, bubble);
					} catch (e) {
						if (typeof fn === "object" && fn.handleEvent) {
							el.removeEventListener(evt, function (e) {
								fn.handleEvent.call(fn, e);
							}, bubble);
						} else {
							throw e;
						}
					}
				} else if ("detachEvent" in el) {
					if (typeof fn === "object" && fn.handleEvent) {
						el.detachEvent("on" + evt, function () {
							fn.handleEvent.call(fn);
						});
					} else {
						el.detachEvent("on" + evt, fn);
					}
				}
			},

			getChildren = function (e) {
				if (e.children.length < 1) {
					throw new Error("The Nav container has no containing elements");
				}
				var children = [];
				for (var i = 0; i < e.children.length; i++) {
					if (e.children[i].nodeType === 1) {
						children.push(e.children[i]);
					}
				}
				return children;
			},

			setAttributes = function (el, attrs) {
				for (var key in attrs) {
					el.setAttribute(key, attrs[key]);
				}
			},

			addClass = function (el, cls) {
				if (el.className.indexOf(cls) !== 0) {
					el.className += " " + cls;
					el.className = el.className.replace(/(^\s*)|(\s*$)/g,"");
				}
			},

			removeClass = function (el, cls) {
				var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
				el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
			},

			forEach = function (array, callback, scope) {
				for (var i = 0; i < array.length; i++) {
					callback.call(scope, i, array[i]);
				}
			};

		var nav,
			opts,
			navToggle,
			styleElement = document.createElement("style"),
			htmlEl = document.documentElement,
			hasAnimFinished,
			isMobile,
			navOpen;

		var ResponsiveNav = function (el, options) {
			var i;

			this.options = {
				animate: true,
				transition: 284,
				label: "Menu",
				insert: "before",
				customToggle: "",
				closeOnNavClick: false,
				openPos: "relative",
				navClass: "nav-collapse",
				navActiveClass: "js-nav-active",
				jsClass: "js",
				init: function(){},
				open: function(){},
				close: function(){}
			};

			for (i in options) {
				this.options[i] = options[i];
			}

			addClass(htmlEl, this.options.jsClass);

			this.wrapperEl = el.replace("#", "");

			if (document.getElementById(this.wrapperEl)) {
				this.wrapper = document.getElementById(this.wrapperEl);

			} else if (document.querySelector(this.wrapperEl)) {
				this.wrapper = document.querySelector(this.wrapperEl);

			} else {
				throw new Error("The nav element you are trying to select doesn't exist");
			}

			this.wrapper.inner = getChildren(this.wrapper);

			opts = this.options;
			nav = this.wrapper;

			this._init(this);
		};

		ResponsiveNav.prototype = {

			destroy: function () {
				this._removeStyles();
				removeClass(nav, "closed");
				removeClass(nav, "opened");
				removeClass(nav, opts.navClass);
				removeClass(nav, opts.navClass + "-" + this.index);
				removeClass(htmlEl, opts.navActiveClass);
				nav.removeAttribute("style");
				nav.removeAttribute("aria-hidden");

				removeEvent(window, "resize", this, false);
				removeEvent(window, "focus", this, false);
				removeEvent(document.body, "touchmove", this, false);
				removeEvent(navToggle, "touchstart", this, false);
				removeEvent(navToggle, "touchend", this, false);
				removeEvent(navToggle, "mouseup", this, false);
				removeEvent(navToggle, "keyup", this, false);
				removeEvent(navToggle, "click", this, false);

				if (!opts.customToggle) {
					navToggle.parentNode.removeChild(navToggle);
				} else {
					navToggle.removeAttribute("aria-hidden");
				}
			},

			toggle: function () {
				if (hasAnimFinished === true) {
					if (!navOpen) {
						this.open();
					} else {
						this.close();
					}
				}
			},

			open: function () {
				if (!navOpen) {
					removeClass(nav, "closed");
					addClass(nav, "opened");
					addClass(htmlEl, opts.navActiveClass);
					addClass(navToggle, "active");
					nav.style.position = opts.openPos;
					setAttributes(nav, {"aria-hidden": "false"});
					navOpen = true;
					opts.open();
				}
			},

			close: function () {
				if (navOpen) {
					addClass(nav, "closed");
					removeClass(nav, "opened");
					removeClass(htmlEl, opts.navActiveClass);
					removeClass(navToggle, "active");
					setAttributes(nav, {"aria-hidden": "true"});

					if (opts.animate) {
						hasAnimFinished = false;
						setTimeout(function () {
							nav.style.position = "absolute";
							hasAnimFinished = true;
						}, opts.transition + 10);

					} else {
						nav.style.position = "absolute";
					}

					navOpen = false;
					opts.close();
				}
			},

			resize: function () {

				if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {

					isMobile = true;
					setAttributes(navToggle, {"aria-hidden": "false"});

					if (nav.className.match(/(^|\s)closed(\s|$)/)) {
						setAttributes(nav, {"aria-hidden": "true"});
						nav.style.position = "absolute";
					}

					this._createStyles();
					this._calcHeight();
				} else {

					isMobile = false;
					setAttributes(navToggle, {"aria-hidden": "true"});
					setAttributes(nav, {"aria-hidden": "false"});
					nav.style.position = opts.openPos;
					this._removeStyles();
				}
			},

			handleEvent: function (e) {
				var evt = e || window.event;

				switch (evt.type) {
					case "touchstart":
						this._onTouchStart(evt);
						break;
					case "touchmove":
						this._onTouchMove(evt);
						break;
					case "touchend":
					case "mouseup":
						this._onTouchEnd(evt);
						break;
					case "click":
						this._preventDefault(evt);
						break;
					case "keyup":
						this._onKeyUp(evt);
						break;
					case "focus":
					case "resize":
						this.resize(evt);
						break;
				}
			},

			_init: function () {
				this.index = index++;

				addClass(nav, opts.navClass);
				addClass(nav, opts.navClass + "-" + this.index);
				addClass(nav, "closed");
				hasAnimFinished = true;
				navOpen = false;

				this._closeOnNavClick();
				this._createToggle();
				this._transitions();
				this.resize();

				var self = this;
				setTimeout(function () {
					self.resize();
				}, 20);

				addEvent(window, "resize", this, false);
				addEvent(window, "focus", this, false);
				addEvent(document.body, "touchmove", this, false);
				addEvent(navToggle, "touchstart", this, false);
				addEvent(navToggle, "touchend", this, false);
				addEvent(navToggle, "mouseup", this, false);
				addEvent(navToggle, "keyup", this, false);
				addEvent(navToggle, "click", this, false);

				opts.init();
			},

			_createStyles: function () {
				if (!styleElement.parentNode) {
					styleElement.type = "text/css";
					document.getElementsByTagName("head")[0].appendChild(styleElement);
				}
			},

			_removeStyles: function () {
				if (styleElement.parentNode) {
					styleElement.parentNode.removeChild(styleElement);
				}
			},

			_createToggle: function () {

				if (!opts.customToggle) {
					var toggle = document.createElement("a");
					toggle.innerHTML = opts.label;
					setAttributes(toggle, {
						"href": "#",
						"class": "nav-toggle"
					});

					if (opts.insert === "after") {
						nav.parentNode.insertBefore(toggle, nav.nextSibling);
					} else {
						nav.parentNode.insertBefore(toggle, nav);
					}

					navToggle = toggle;

				} else {
					var toggleEl = opts.customToggle.replace("#", "");

					if (document.getElementById(toggleEl)) {
						navToggle = document.getElementById(toggleEl);
					} else if (document.querySelector(toggleEl)) {
						navToggle = document.querySelector(toggleEl);
					} else {
						throw new Error("The custom nav toggle you are trying to select doesn't exist");
					}
				}
			},

			_closeOnNavClick: function () {
				if (opts.closeOnNavClick) {
					var links = nav.getElementsByTagName("a"),
						self = this;
					forEach(links, function (i, el) {
						addEvent(links[i], "click", function () {
							if (isMobile) {
								self.toggle();
							}
						}, false);
					});
				}
			},

			_preventDefault: function(e) {
				if (e.preventDefault) {
					if (e.stopImmediatePropagation) {
						e.stopImmediatePropagation();
					}
					e.preventDefault();
					e.stopPropagation();
					return false;

				} else {
					e.returnValue = false;
				}
			},

			_onTouchStart: function (e) {
				if (!Event.prototype.stopImmediatePropagation) {
					this._preventDefault(e);
				}
				this.startX = e.touches[0].clientX;
				this.startY = e.touches[0].clientY;
				this.touchHasMoved = false;

				removeEvent(navToggle, "mouseup", this, false);
			},

			_onTouchMove: function (e) {
				if (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
					Math.abs(e.touches[0].clientY - this.startY) > 10) {
					this.touchHasMoved = true;
				}
			},

			_onTouchEnd: function (e) {
				this._preventDefault(e);
				if (!isMobile) {
					return;
				}

				if (!this.touchHasMoved) {

					if (e.type === "touchend") {
						this.toggle();
						return;

					} else {
						var evt = e || window.event;

						if (!(evt.which === 3 || evt.button === 2)) {
							this.toggle();
						}
					}
				}
			},

			_onKeyUp: function (e) {
				var evt = e || window.event;
				if (evt.keyCode === 13) {
					this.toggle();
				}
			},

			_transitions: function () {
				if (opts.animate) {
					var objStyle = nav.style,
						transition = "max-height " + opts.transition + "ms";

					objStyle.WebkitTransition =
						objStyle.MozTransition =
							objStyle.OTransition =
								objStyle.transition = transition;
				}
			},

			_calcHeight: function () {
				var savedHeight = 0;
				for (var i = 0; i < nav.inner.length; i++) {
					savedHeight += nav.inner[i].offsetHeight;
				}

				var innerStyles = "." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened{max-height:" + savedHeight + "px !important} ." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened.dropdown-active {max-height:9999px !important}";

				if (styleElement.styleSheet) {
					styleElement.styleSheet.cssText = innerStyles;
				} else {
					styleElement.innerHTML = innerStyles;
				}

				innerStyles = "";
			}

		};

		return new ResponsiveNav(el, options);

	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = responsiveNav;
	} else {
		window.responsiveNav = responsiveNav;
	}

}(document, window, 0));