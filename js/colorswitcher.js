var linkred = document.createElement('link');
linkred.rel = "stylesheet";
linkred.type = "text/css";
linkred.href = "css/skins/red.css";

document.getElementById("red").onclick = function() {
    document.head.appendChild(linkred);
}

var linkyellow = document.createElement('link');
linkyellow.rel = "stylesheet";
linkyellow.type = "text/css";
linkyellow.href = "css/skins/yellow.css";

document.getElementById("yellow").onclick = function() {
    document.head.appendChild(linkyellow);
}

var linkgreen = document.createElement('link');
linkgreen.rel = "stylesheet";
linkgreen.type = "text/css";
linkgreen.href = "css/skins/green.css";

document.getElementById("green").onclick = function() {
    document.head.appendChild(linkgreen);
}

var linkgreen2 = document.createElement('link');
linkgreen2.rel = "stylesheet";
linkgreen2.type = "text/css";
linkgreen2.href = "css/skins/green2.css";

document.getElementById("green2").onclick = function() {
    document.head.appendChild(linkgreen2);
}

var linkblue = document.createElement('link');
linkblue.rel = "stylesheet";
linkblue.type = "text/css";
linkblue.href = "css/skins/blue.css";

document.getElementById("blue").onclick = function() {
    document.head.appendChild(linkblue);
}

var linkblue2 = document.createElement('link');
linkblue2.rel = "stylesheet";
linkblue2.type = "text/css";
linkblue2.href = "css/skins/blue2.css";

document.getElementById("blue2").onclick = function() {
    document.head.appendChild(linkblue2);
}

var linkpink = document.createElement('link');
linkpink.rel = "stylesheet";
linkpink.type = "text/css";
linkpink.href = "css/skins/pink.css";

document.getElementById("pink").onclick = function() {
    document.head.appendChild(linkpink);
}

var linkpink2 = document.createElement('link');
linkpink2.rel = "stylesheet";
linkpink2.type = "text/css";
linkpink2.href = "css/skins/pink2.css";

document.getElementById("pink2").onclick = function() {
    document.head.appendChild(linkpink2);
}

var linkgoldenrod = document.createElement('link');
linkgoldenrod.rel = "stylesheet";
linkgoldenrod.type = "text/css";
linkgoldenrod.href = "css/skins/goldenrod.css";

document.getElementById("goldenrod").onclick = function() {
    document.head.appendChild(linkgoldenrod);
}

var linkorange = document.createElement('link');
linkorange.rel = "stylesheet";
linkorange.type = "text/css";
linkorange.href = "css/skins/orange.css";

document.getElementById("orange").onclick = function() {
    document.head.appendChild(linkorange);
}

document.getElementById("toggle-switcher").onclick = function() {
    document.getElementById("switcher").classList.toggle('show-switcher');
}