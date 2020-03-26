const today = new Date();
const todayData = today.getTime(); // i.e. 1685206226664

const todayDate = today.getFullYear() + '-' + ("0" + (today.getMonth()+1)).slice(-2) + '-' + ("0" + (today.getDate())).slice(-2);
const todayTime = ("0" + (today.getHours())).slice(-2) + ":" + ("0" + (today.getMinutes())).slice(-2) + ":" + ("0" + (today.getSeconds())).slice(-2);
const todayDateTime = todayDate + ' ' + todayTime; // i.e. 2050-01-01 00:00:00

function parseTime( x ) {
  let d = x.substring(0, x.length - 9);
  let t = x.substring(11);
  let data = new Date( d + "T" + t + "+09:00" );
  return data.getTime();
}
