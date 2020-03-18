function detectProtocol() {
  if(window.location.protocol != 'http:') {
    location.href = location.href.replace("https://", "http://");
  }
}
detectProtocol();
