var homelogodiv = document.getElementById("homelogo");
if (document.all.homelogo.offsetWidth > document.body.clientWidth) {
  homelogodiv.style.width = document.body.clientWidth + "px";
  homelogodiv.style.marginLeft = document.body.clientWidth * -0.5 + "px";
} else {
  homelogodiv.style.width = homelogodiv.clientWidth + "px";
  homelogodiv.style.marginLeft = (homelogodiv.clientWidth) * -0.5 + "px";
}
