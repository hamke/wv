if ( !urlInfo.length ) {
  var siteURL = 'www.wp-data.com';
} else {
  var siteURL = urlInfo.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  closeOverlay();
}

var fullUrl = 'http://' + siteURL;
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
    var siteURL = wptalk_result;
    let randomValue = siteURL;

    document.getElementById("overlay-ad").style.display="none";

    if ( typeof ads !== 'undefined' && ads.length > 0 ) {
      for ( var d = 0; d < ads.length; d++ ) {
        if ( ( clickCount == ads[d]['click'] ) && ( ads[d]['click'] !== '' ) && ( ads[d]['click'] > 0 ) ) {
          if ( ( ( parseTime(ads[d]['time_start']) < todayData ) || ( ads[d]['time_start'] == '' ) ) && ( ( parseTime(ads[d]['time_end']) > todayData ) || ( ads[d]['time_end'] == '' ) ) ) {
            randomValue = ads[d]['url'];
            break;
          }
        }
      }
      for ( var e = 0; e < ads.length; e++ ) {
        if ( ads[e]['url'] == randomValue && ads[e]['url_target'] !== '' ) {
          document.getElementById("overlay-ad").style.display="block";
          break;
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
          if ( ( ( parseTime(message[m]['time_start']) < todayData ) || ( message[m]['time_start'] == '' ) ) && ( ( parseTime(message[m]['time_end']) > todayData ) || ( message[m]['time_end'] == '' ) ) ) {
            setCustomMsg(message[m]['msg']);
            break;
          } else {
            setDefaultMsg();
          }
        } else {
          setDefaultMsg();
        }
      }
      // Marquee3k.init();
    }

  })

  closeOverlay();

}
// window.onload = displaySites();

function adClick() {
  var currentUrl = document.getElementById("footer-banner").querySelector('a').href; // http://example.com ;
  if ( typeof ads !== 'undefined' && ads.length > 0 ) {
    for ( var z = 0; z < ads.length; z++ ) {
      if ( currentUrl == ( 'http://' + ads[z]['url'] + '/' ) ) {
        window.open( currentUrl, "_blank");
        break;
      }
    }
  }
}

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
