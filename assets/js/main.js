if ( typeof full_url_allowed !== 'undefined' && full_url_allowed.length > 0 ) {
  for ( var c = 0; c < full_url_allowed.length; c++ ) {
    if ( urlInfo == full_url_allowed[c]['url'] ) {
      var siteUrl = full_url_allowed[c]['url'];
      closeOverlay();
      break;
    }
  }
}

if ( typeof siteUrl == 'undefined' ) {
  if ( urlInfo == null || urlInfo == '' ) {
    var siteUrl = frontpage; // A variable defined on the beginning of the page
    window.history.replaceState({}, document.title, clean_uri);
  } else {
    var siteUrl = urlInfo.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    closeOverlay();
  }
}

// var fullUrl = 'http://' + siteUrl; // Unnecessary
var iframeContent = '<iframe id="iframe" src="http://' + siteUrl + '/" frameborder="0" width="100%;"></iframe>';
var footerUrl = '<a href="http://' + siteUrl + '/" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i> ' + siteUrl + ' <i class="fas fa-arrow-right"></i></a>';
var element = document.getElementById("placeholder");
document.getElementById("iframeTemplate").innerHTML = iframeContent;
var template = document.getElementById("iframeTemplate");
var html = template.innerHTML;
element.innerHTML = html;
document.getElementById("footer-banner").innerHTML = footerUrl;

function showNewData( newUrl ) {
  if ( typeof ads !== 'undefined' && ads.length > 0 ) {
    for ( var e = 0; e < ads.length; e++ ) {
      if ( ads[e]['url'] == newUrl && ads[e]['url_target'] !== '' ) {
        document.getElementById("overlay-ad").style.display="block";
        break;
      }
    }
    for ( var m = 0; m < message.length; m++ ) {
      if ( newUrl == message[m]['url'] ) {
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
  }
  let new_uri = clean_uri + '?url=' + newUrl;
  window.history.replaceState({}, document.title, new_uri);
  let iframeContent = '<iframe id="iframe" onload="onLoadCallback()" src="http://' + newUrl + '/" frameborder="0" width="100%;"></iframe>';
  let footerUrl = '<a href="http://' + newUrl + '/" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i> ' + newUrl + ' <i class="fas fa-arrow-right"></i></a>';
  let element = document.getElementById("placeholder");
  document.getElementById("iframeTemplate").innerHTML = iframeContent;
  let template = document.getElementById("iframeTemplate");
  let html = template.innerHTML;
  element.innerHTML = html;
  document.getElementById("footer-banner").innerHTML = footerUrl;
  closeOverlay();
}

function onLoadCallback() {
  // alert('Fully loaded!');
  $('#overlay-loading').fadeOut('slow');
}

function displaySites() {

  clickCount++;

  document.getElementById("overlay-ad").style.display="none";

  if ( typeof ads !== 'undefined' && ads.length > 0 ) {
    for ( var d = 0; d < ads.length; d++ ) {
      if ( ( clickCount == ads[d]['click'] ) && ( ads[d]['click'] !== '' ) && ( ads[d]['click'] > 0 ) ) {
        if ( ( ( parseTime(ads[d]['time_start']) < todayData ) || ( ads[d]['time_start'] == '' ) ) && ( ( parseTime(ads[d]['time_end']) > todayData ) || ( ads[d]['time_end'] == '' ) ) ) {
          var randomValue = ads[d]['url'];
          break;
        }
      }
    }
  }

  if ( typeof randomValue == 'undefined' ) {
    fetch(url, {
      referrerPolicy: "unsafe-url"
    })
    .then(res => res.json())
    .then(wptalk_result => {
      var siteUrl = wptalk_result;
      var randomValue = siteUrl;
      showNewData(randomValue);
    })
  } else {
    showNewData(randomValue);
  }

  $('#overlay-loading').fadeIn();

}
// window.onload = displaySites();

function adClick() {
  var currentUrl = document.getElementById("footer-banner").querySelector('a').href; // http://example.com ;
  if ( typeof ads !== 'undefined' && ads.length > 0 ) {
    for ( var z = 0; z < ads.length; z++ ) {
      if ( currentUrl == ( 'http://' + ads[z]['url'] + '/' ) ) {
        window.open( ads[z]['url_target'], "_blank");
        break;
      }
    }
  }
}

if ( typeof ads !== 'undefined' && ads.length > 0 ) {
  for ( var f = 0; f < ads.length; f++ ) {
    if ( ads[f]['url'] == siteUrl && ads[f]['url_target'] !== '' ) {
      document.getElementById("overlay-ad").style.display="block";
      break;
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
