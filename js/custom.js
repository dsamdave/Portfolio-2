/* ----------------------------------------------------------- */
/* DOCUMENT VARIABLES
/* ----------------------------------------------------------- */

var sound = false;
var mobile = false;
var soundmodal = document.getElementById("soundmodal");
var open_portfolio_button = document.getElementById("open-portfolio");
var back_home = document.getElementById("back-home");
var open_about_button = document.getElementById("open-about");
var close_about_button = document.getElementById("close");
var global_index = 0;

/* ----------------------------------------------------------- */
/* PAGE PRELOADER
/* ----------------------------------------------------------- */

window.addEventListener("load", function() {
    document.querySelector("body").classList.add("loaded");
    if (soundmodal) {
        setTimeout(function() {
            document.getElementById("soundmodal").style.display = "block";
        }, 1000);
    }
    if (document.querySelector("body").classList.contains("sound-on")) {
        sound = true;
    }
});

/* ----------------------------------------------------------- */
/* DETECT MOBILE DEVICES
/* ----------------------------------------------------------- */

if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)) {
    mobile = true;
}

/* ----------------------------------------------------------- */
/* SOUND DIALOG
/* ----------------------------------------------------------- */

if (soundmodal) {
    document.getElementById("no").onclick = function() {
        sound = false;
        document.querySelector("body").classList.remove("sound");
        document.getElementById("soundmodal").style.display = "none";
        soundmodal = false;
    }
    document.getElementById("yes").onclick = function() {
        sound = true;
        document.querySelector("body").classList.add("sound");
        document.getElementById("soundmodal").style.display = "none";
        soundmodal = false;
    }
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
            sound = true;
            document.querySelector("body").classList.add("sound");
            document.getElementById("soundmodal").style.display = "none";
            soundmodal = false;
        }
    };

}

/* ----------------------------------------------------------- */
/*  SOUND FILES
/* ----------------------------------------------------------- */

// PRELOAD AUDIO ITEMS 
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const click = new Audio("sounds/click.mp3");
const clickmobile = new Audio("sounds/mobile/click.mp3");
const hover = new Audio("sounds/hover.mp3");
const hovermobile = new Audio("sounds/mobile/hover.mp3");
const hover2 = new Audio("sounds/hover2.mp3");
const hover3 = new Audio("sounds/hover3.mp3");
const paper = new Audio("sounds/paper.mp3");
const papermobile = new Audio("sounds/mobile/paper.mp3");
const paperaboutup = new Audio("sounds/paperaboutup.mp3");
const paperaboutupmobile = new Audio("sounds/mobile/paperaboutup.mp3");
const paperaboutdown = new Audio("sounds/paperaboutdown.mp3");
const paperaboutdownmobile = new Audio("sounds/mobile/paperaboutdown.mp3");
const skin = new Audio("sounds/skin.mp3");
const skinmobile = new Audio("sounds/mobile/skin.mp3");

/* ----------------------------------------------------------- */
/*  PLAY SOUNDS
/* ----------------------------------------------------------- */

// CLICK SOUND
function clickPlay() {
    if (sound === true) {
        if (mobile === true) {
            clickmobile.play();
        } else {
            click.play();
        }
    }
}
// PAPER SOUND
function paperPlay() {
    if (sound === true) {
        if (mobile === true) {
            papermobile.play();
        } else {
            paper.play();
        }
    }
}
// HOVER SOUND
function hoverPlay() {
    if ((sound === true) && (mobile == false)) {
        hover.play();
    }
}
// HOVER 2 SOUND
function hover2Play() {
    if ((sound === true) && (mobile == false)) {
        hover2.play();
    }
}
// SKIN PLAY
function skinPlay() {
    if (sound === true) {
        if (mobile === true) {
            skinmobile.play();
        } else {
            skin.play();
        }
    }
}

/* ----------------------------------------------------------- */
/*  PORTFOLIO 3D ANIMATION
/* ----------------------------------------------------------- */

if (window.innerWidth > 767) {
    const nodes = [].slice.call(document.querySelectorAll(".item"), 0);
    const directions = {
        0: "top",
        1: "right",
        2: "bottom",
        3: "left"
    };
    const classNames = ["in", "out"].map(p => Object.values(directions).map(d => `${p}-${d}`)).reduce((a, b) => a.concat(b));
    const getDirectionKey = (ev, node) => {
        const {
            width,
            height,
            top,
            left
        } = node.getBoundingClientRect();
        const l = ev.pageX - (left + window.pageXOffset);
        const t = ev.pageY - (top + window.pageYOffset);
        const x = l - width / 2 * (width > height ? height / width : 1);
        const y = t - height / 2 * (height > width ? width / height : 1);
        return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    };
    class Item {
        constructor(element) {
            this.element = element;
            this.element.addEventListener("mouseover", ev => this.update(ev, "in"));
            this.element.addEventListener("mouseout", ev => this.update(ev, "out"));
        }
        update(ev, prefix) {
            this.element.classList.remove(...classNames);
            this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
        }
    }
    nodes.forEach(node => new Item(node));
}

/* ----------------------------------------------------------- */
/*  OPEN CLICKED ITEM IN PORTFOLIO GRID
/* ----------------------------------------------------------- */

function openItem(el) {
    clickPlay();
    var divs = document.querySelectorAll(".item");
    var index = Array.from(divs).indexOf(el) + 1;
    var not_active = document.querySelector(".not-active-layer");
    var active = document.querySelector(".active-layer");
    setTimeout(function() {
        document.querySelector(".portfolio-grid").classList.add("to-top");
        document.querySelector(".portfolio-grid").classList.remove("active");
    }, 200);
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + index + ")").classList.add("active");
        if ((document.querySelector(".portfolio-items > div:nth-child(" + (index - 1) + ")"))) {
            document.querySelector(".portfolio-items > div:nth-child(" + (index - 1) + ")").classList.add("to-bottom");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (index + 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (index + 1) + ")").classList.add("to-top");
        }
    }, 250);
    setTimeout(function() {
        not_active.classList.remove("not-active-layer");
        not_active.classList.add("active-layer");
        not_active.classList.remove("opacity-0");
        active.classList.add("not-active-layer");
        active.classList.remove("active-layer");
        active.classList.add("opacity-0");
    }, 300);
    setTimeout(function() {
        paperPlay();
        document.querySelector(".portfolio-grid").scrollTop = 0;
    }, 750);
    global_index = index;
}

/* ----------------------------------------------------------- */
/*  BACK TO PORTFOLIO GRID SECTION
/* ----------------------------------------------------------- */

function backToPorfolio() {
    clickPlay();
    var not_active = document.querySelector(".not-active-layer");
    var active = document.querySelector(".active-layer");
    setTimeout(function() {
        not_active.classList.remove("not-active-layer");
        not_active.classList.add("active-layer");
        not_active.classList.add("opacity-0");
        active.classList.add("not-active-layer");
        active.classList.remove("active-layer");
        active.classList.remove("opacity-0");
    }, 300);
    setTimeout(function() {
        document.querySelector(".portfolio-grid").classList.add("active");
        document.querySelector(".portfolio-grid").classList.remove("to-top");
        document.querySelector(".portfolio-items > div.active").classList.remove("active");
        if (document.querySelector(".portfolio-items > div.to-top")) {
            document.querySelector(".portfolio-items > div.to-top").classList.remove("to-top");
        }
        if (document.querySelector(".portfolio-items > div.to-bottom")) {
            document.querySelector(".portfolio-items > div.to-bottom").classList.remove("to-bottom");
        }
    }, 350);
    setTimeout(function() {
        paperPlay();
    }, 750);
}

/* ----------------------------------------------------------- */
/*  NAVIGATE TO PREVIOUS ITEM IN PORTFOLIO
/* ----------------------------------------------------------- */

function TopProject() {
    clickPlay();
    var not_active = document.querySelector(".not-active-layer");
    var active = document.querySelector(".active-layer");
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")").classList.remove("active");
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")").classList.add("to-top");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 2) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 2) + ")").classList.add("to-bottom");
        }
        not_active.classList.remove("not-active-layer");
        not_active.classList.add("active-layer");
        not_active.classList.remove("opacity-0");
        active.classList.add("not-active-layer");
        active.classList.remove("active-layer");
        active.classList.add("opacity-0");

    }, 300);
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")").classList.add("active");
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")").classList.remove("to-top");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")").classList.remove("to-bottom");
        }
        global_index = global_index - 1;
    }, 350);
    setTimeout(function() {
        paperPlay();
    }, 750);
}

/* ----------------------------------------------------------- */
/*  NAVIGATE TO NEXT ITEM IN PORTFOLIO
/* ----------------------------------------------------------- */

function BottomProject() {
    clickPlay();
    var not_active = document.querySelector(".not-active-layer");
    var active = document.querySelector(".active-layer");
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")").classList.remove("active");
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index) + ")").classList.add("to-bottom");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 2) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 2) + ")").classList.add("to-top");
        }
        not_active.classList.remove("not-active-layer");
        not_active.classList.add("active-layer");
        not_active.classList.add("opacity-0");
        active.classList.add("not-active-layer");
        active.classList.remove("active-layer");
        active.classList.remove("opacity-0");
    }, 300);
    setTimeout(function() {
        document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")").classList.add("active");
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index + 1) + ")").classList.remove("to-top");
        }
        if (document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")")) {
            document.querySelector(".portfolio-items > div:nth-child(" + (global_index - 1) + ")").classList.remove("to-bottom");
        }
        global_index = global_index + 1;
    }, 350);
    setTimeout(function() {
        paperPlay();
    }, 750);
}

/* ----------------------------------------------------------- */
/*  OPEN PORTFOLIO GRID SECTION
/* ----------------------------------------------------------- */

if (open_portfolio_button) {
    document.getElementById("open-portfolio").onclick = function() {
        clickPlay();
        var not_active = document.querySelector(".not-active-layer");
        var active = document.querySelector(".active-layer");
        setTimeout(function() {
            document.querySelector(".home").classList.add("to-top");
            document.querySelector(".home").classList.remove("active");
        }, 200);
        setTimeout(function() {
            document.querySelector(".portfolio-grid").classList.add("active");
            document.querySelector(".portfolio-grid").classList.remove("to-bottom");
        }, 250);
        setTimeout(function() {
            not_active.classList.remove("not-active-layer");
            not_active.classList.add("active-layer");
            active.classList.add("not-active-layer");
            active.classList.remove("active-layer");
        }, 300);
        setTimeout(function() {
            paperPlay();
        }, 750);
    };
}

/* ----------------------------------------------------------- */
/*  BACK TO HOME SECTION
/* ----------------------------------------------------------- */

if (back_home) {
    document.getElementById("back-home").onclick = function() {
        clickPlay();
        var not_active = document.querySelector(".not-active-layer");
        var active = document.querySelector(".active-layer");
        setTimeout(function() {
            document.querySelector(".portfolio-grid").classList.add("to-bottom");
            document.querySelector(".portfolio-grid").classList.remove("active");
            not_active.classList.remove("not-active-layer");
            not_active.classList.add("active-layer");
            not_active.classList.add("opacity-0");
            active.classList.add("not-active-layer");
            active.classList.remove("active-layer");
            active.classList.remove("opacity-0");
        }, 300);
        setTimeout(function() {
            document.querySelector(".home").classList.add("active");
        }, 350);
        setTimeout(function() {
            paperPlay();
            document.querySelector(".portfolio-grid").scrollTop = 0;
        }, 750);
    };
}

/* ----------------------------------------------------------- */
/*  PORTFOLIO BUTTON HOVER
/* ----------------------------------------------------------- */

if (open_portfolio_button) {
    document.getElementById("open-portfolio").addEventListener("mouseenter", function() {
        if (sound === true) {
            if (mobile === true) {
                var hovermobilesound = hovermobile.play();
                if (hovermobilesound !== undefined) {
                    hovermobilesound.then(_ => {
                        hovermobile.play()
                    }).catch(error => {

                    });
                }
            } else {
                var hoversound = hover.play();
                if (hoversound !== undefined) {
                    hoversound.then(_ => {
                        hover.play()
                    }).catch(error => {

                    });
                }
            }
        }
    });
}

/* ----------------------------------------------------------- */
/*  BACK TO HOME HOVER
/* ----------------------------------------------------------- */

if (back_home) {
    document.getElementById("back-home").addEventListener("mouseenter", function() {
        hoverPlay();
    });
}

/* ----------------------------------------------------------- */
/*  BACK TO PORTFOLIO HOVER
/* ----------------------------------------------------------- */

var back_to_portfolio_buttons = document.querySelectorAll(".back-to-portfolio");
for (var i = 0; i < back_to_portfolio_buttons.length; i++) {
    back_to_portfolio_buttons[i].addEventListener("mouseenter", function() {
        hoverPlay();
    });
}

/* ----------------------------------------------------------- */
/* PREVIOUS & NEXT PORTFOLIO ITEM HOVER
/* ----------------------------------------------------------- */

var arrows = document.querySelectorAll(".top-project, .bottom-project");
for (var i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener("mouseenter", function() {
        hover2Play();
    });
}

/* ----------------------------------------------------------- */
/* PORTFOLIO GRID ITEM HOVER
/* ----------------------------------------------------------- */

var portfolio_items = document.querySelectorAll(".item");
for (var i = 0; i < portfolio_items.length; i++) {
    portfolio_items[i].addEventListener("mouseenter", function() {
        hover3.currentTime = 0;
        if ((sound === true) && (mobile === false)) {
            hover3.play();
        }
    });
}

/* ----------------------------------------------------------- */
/* ABOUT BUTTON HOVER
/* ----------------------------------------------------------- */

var btn_items = document.querySelectorAll(".btn-secondary");
for (var i = 0; i < btn_items.length; i++) {
    btn_items[i].addEventListener("mouseenter", function() {
		if ((sound === true) && (mobile === false)) {
			var hover2sound = hover2.play();
			if (hover2sound !== undefined) {
				hover2sound.then(_ => {
					hover2.play()
				}).catch(error => {

				});
			}
		}  
    });
}

/* ----------------------------------------------------------- */
/* PORTFOLIO BUTTON ANIMATION 
/* ----------------------------------------------------------- */

const letterWrapClass = "letter-wrap";
const letterWrapElements = document.getElementsByClassName(letterWrapClass);
[...letterWrapElements].forEach((el) => {
    letterWrap(el, letterWrapClass);
});

function letterWrap(el, cls) {
    const words = el.textContent.split("");
    const letters = [];
    cls = cls || "letter-wrap";
    words.forEach((word) => {
        let html = "";
        for (var letter in word) {
            html += `
          <span class="${cls}__char">
            <span class="${cls}__char-inner" data-letter="${word[letter]}">
              ${word[letter]}
            </span>
          </span>
        `;
        }
        let wrappedWords = `<span class="${cls}__word">${html}</span>`;
        letters.push(wrappedWords);
    });
    return (el.innerHTML = letters.join(" "));
}

/* ----------------------------------------------------------- */
/* OPEN ABOUT SECTION
/* ----------------------------------------------------------- */

if (open_about_button) {
    document.getElementById("open-about").onclick = function(e) {
        clickPlay();
        if (sound === true) {
            if (mobile === true) {
                paperaboutupmobile.play();
            } else {
                paperaboutup.play();
            }
        }
        e.preventDefault();
        setTimeout(function() {
            document.getElementById("overlay").classList.add("active");
            document.getElementById("contentcontainer").classList.add("active");
        }, 100);
        setTimeout(function() {
            document.getElementById("content").classList.add("active");
        }, 300);
    }
}

/* ----------------------------------------------------------- */
/* CLOSE ABOUT SECTION
/* ----------------------------------------------------------- */

if (close_about_button) {
    document.getElementById("close").onclick = function() {
        clickPlay();
        document.getElementById("content").classList.remove("active");
        setTimeout(function() {
            if (sound === true) {
                if (mobile === true) {
                    paperaboutdownmobile.play();
                } else {
                    paperaboutdown.play();
                }
            }
        }, 400);
        setTimeout(function() {
            document.getElementById("overlay").classList.remove("active");
        }, 400);
        setTimeout(function() {
            document.getElementById("contentcontainer").classList.remove("active");
        }, 500);
        setTimeout(function() {
            document.querySelector(".content-container").scrollTop = 0;
        }, 850);
    }
}

/* ----------------------------------------------------------- */
/* LIGHT/DARK SWITCHER
/* ----------------------------------------------------------- */

const checkbox = document.getElementById("checkbox");
const checkbox2 = document.getElementById("checkbox2");
if ((checkbox) && (checkbox2)) {
    checkbox.addEventListener("change", () => {
        skinPlay();
        document.body.classList.toggle("dark");
        document.getElementById("checkbox2").checked = !checkbox2.checked;
    })
    checkbox2.addEventListener("change", () => {
        skinPlay();
        document.body.classList.toggle("dark");
        document.getElementById("checkbox").checked = !checkbox.checked;
    });
}