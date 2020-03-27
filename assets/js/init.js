function setDefaultMsg() {
  var dm = document.getElementById("marquee3k");
  dm.innerHTML = '<span class="message">' + defaultMsg + '</span>';
  Marquee3k.init();
}

function setCustomMsg(msg) {
  var cm = document.getElementById("marquee3k");
  cm.innerHTML = '<span class="message">' + msg + '</span>';
  Marquee3k.init();
}

function closeOverlay() {
  var target = $("#overlay");
  target.animate({
    opacity: "-=1"
  }, 1000, function() {
    target.remove();
  });
}

const url = 'https://www.wp-data.com/api/random/1/';
const uri = window.location.toString();
const clean_uri = uri.substring(0, uri.indexOf("?"));
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var urlInfo = urlParams.get('url');
