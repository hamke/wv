function setDefaultMsg() {
  var dm = document.getElementsByClassName("marquee3k");
  var a;
  for ( a = 0; a < dm.length; a++ ) {
    dm[a].innerHTML = '<span class="message">' + defaultMsg + '</span>';
  }
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

if ( !urlInfo.length ) {
  var siteURL = 'www.wp-data.com';
} else {
  var siteURL = urlInfo.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  closeOverlay();
}

var iframeContent = '<iframe id="iframe" onload="onLoadCallback()" src="http://' + siteURL + '/" frameborder="0" width="100%;"></iframe>';
var footerUrl = '<a href="http://' + siteURL + '/" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i> ' + siteURL + ' <i class="fas fa-arrow-right"></i></a>';
var element = document.getElementById("placeholder");
document.getElementById("iframeTemplate").innerHTML = iframeContent;
var template = document.getElementById("iframeTemplate");
var html = template.innerHTML;
element.innerHTML = html;
document.getElementById("footer-banner").innerHTML = footerUrl;

function onLoadCallback() {
  // Callback
}

function displaySites(){

  clickCount++;

  window.history.replaceState({}, document.title, clean_uri);
  fetch(url)
  .then(res => res.json())
  .then(wptalk_result => {
    let Sites = wptalk_result;
    let randomValue = Sites;

    if ( typeof ads !== 'undefined' && ads.length > 0 ) {
      for ( var d = 0; d < ads.length; d++ ) {
        if ( clickCount == ads[d]['click'] ) {
          randomValue = ads[d]['url'];
        }
      }
    }

    let new_uri = clean_uri + '?url=' + randomValue;
    window.history.replaceState({}, document.title, new_uri);
    let iframeContent = '<iframe id="iframe" src="http://' + randomValue + '/" frameborder="0" width="100%;"></iframe>';
    let footerUrl = '<a href="http://' + randomValue + '/" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i> ' + randomValue + ' <i class="fas fa-arrow-right"></i></a>';
    let element = document.getElementById("placeholder");
    document.getElementById("iframeTemplate").innerHTML = iframeContent;
    let template = document.getElementById("iframeTemplate");
    let html = template.innerHTML;
    element.innerHTML = html;
    document.getElementById("footer-banner").innerHTML = footerUrl;

    if ( typeof message !== 'undefined' && message.length > 0 ) {
      for ( var m = 0; m < message.length; m++ ) {
        if ( randomValue == message[m]['url'] ) {
          // alert( message[m]['msg'] );
          var classObj = document.getElementsByClassName("marquee3k");
          var i;
          for ( i = 0; i < classObj.length; i++ ) {
            classObj[i].innerHTML = '<span class="message">' + message[m]['msg'] + '</span>';
          }
        } else {
          // alert('Hello!');
          setDefaultMsg();
        }
        Marquee3k.init();
      }
    }

  })

  closeOverlay();

}
// window.onload = displaySites();

var calcHeight = function() {
  $('#iframe').height($(window).height());
}
$(document).ready(function() {
  calcHeight();
});
$(window).resize(function() {
  calcHeight();
}).load(function() {
  calcHeight();
});
