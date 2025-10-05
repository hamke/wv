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
    for ( var d = 0; d < full_url_allowed.length; d++ ) {
      if ( full_url_allowed[d]['fixed'] == 'yes' ) {
        var siteUrl = urlInfo.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
        closeOverlay();
      } else {
        var siteUrl = urlInfo.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
        closeOverlay();
      }
    }
  }
}

// var fullUrl = 'https://' + siteUrl; // Unnecessary
var iframeContent = '<iframe id="iframe" src="https://' + siteUrl + '" frameborder="0" width="100%;"></iframe>';
var footerUrl = '<a href="https://' + siteUrl + '" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i> ' + siteUrl + ' <i class="fas fa-arrow-right"></i></a>';
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
  let iframeContent = '<iframe id="iframe" onload="onLoadCallback()" src="https://' + newUrl + '/" frameborder="0" width="100%;"></iframe>';
  let footerUrl = '<a href="https://' + newUrl + '/" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i> ' + newUrl + ' <i class="fas fa-arrow-right"></i></a>';
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

var fetchNewData = function() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var urlInfo = urlParams.get('slug');
  return fetch(url, {
    referrerPolicy: "unsafe-url"
  })
  .then(res => res.json())
  .then(randomValue => {
    if ( randomValue !== urlInfo ) {
      return randomValue;
    } else {
      // fetchNewData();
      return randomValue;
    }
  })
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
    fetchNewData().then(randomValue =>
      showNewData(randomValue)
    );
  } else {
    showNewData(randomValue);
  }

  $('#overlay-loading').fadeIn();

}
// window.onload = displaySites();

function adClick() {
  var currentUrl = document.getElementById("footer-banner").querySelector('a').href; // https://example.com ;
  if ( typeof ads !== 'undefined' && ads.length > 0 ) {
    for ( var z = 0; z < ads.length; z++ ) {
      if ( currentUrl == ( 'https://' + ads[z]['url'] + '/' ) ) {
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

// Language Selector
function langSelectMenu() {
  const menu = document.getElementById('language-selector-menu');
  menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

// Optional: hide menu on outside click
document.addEventListener('click', function(event) {
  const selector = document.getElementById('language-selector');
  const menu = document.getElementById('language-selector-menu');
  if (!selector.contains(event.target) && !menu.contains(event.target)) {
    menu.style.display = 'none';
  }
});