var postdate = new Date();
var post_y = document.getElementsByClassName("post-year");
var post_m = document.getElementsByClassName("post-month");
var post_mm = document.getElementsByClassName("post-month-digits");
var post_d = document.getElementsByClassName("post-date");
var post_dd = document.getElementsByClassName("post-date-digits");
var i;
for (i = 0; i < post_y.length; i++) {
  post_y[i].innerHTML = postdate.getFullYear();
}
for (i = 0; i < post_m.length; i++) {
  post_m[i].innerHTML = postdate.getMonth() + 1;
}
for (i = 0; i < post_mm.length; i++) {
  post_mm[i].innerHTML = ("0" + (postdate.getMonth() + 1)).slice(-2);
}
for (i = 0; i < post_d.length; i++) {
  post_d[i].innerHTML = postdate.getDate();
}
for (i = 0; i < post_dd.length; i++) {
  post_dd[i].innerHTML = ("0" + (postdate.getDate())).slice(-2);
}
