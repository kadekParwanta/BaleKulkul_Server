var EPOCH = 1900;
var PATTERN = /(\d+)[^\/|-]/g;

function iskabisat(year) {
  if(year % 4 === 0){
    if(year % 100 === 0 && year % 400 !== 0)
      return false;
    else
      return true;
  }
  return false;
}

/*
 * kabisats:
 *   Calculating how many kabisats' years in time span between
 *   given year and primordial year, Y0
 */
function kabisats(year) {
  var kabcount = 0;
  for(var i=1900; i<year; i++) {
    if(iskabisat(i))
      kabcount++;
  }
  return kabcount;
}

function calcdays(date) {
  function months(mth) {
    var days = 0;
    for(var i=1; i<mth; i++) {
      if(extraday.indexOf(i) !== -1)
        days += 31;
      else if (i == 2)
        days += 28;
      else
        days += 30;
    }
    return days+1;
  }
  var extraday = [1, 3, 5, 7, 8, 10, 12];
  var dayarr = date.match(PATTERN);
  var day = parseInt(dayarr[2]);
  var month = parseInt(dayarr[1]);
  var year = parseInt(dayarr[0]);
  var days = day + months(month) + (year - EPOCH) * 365 +
    kabisats(year);
  return days;
}

function triwara(day) {
  return ['Pasah', 'Beteng', 'Kajeng'][(day-1) % 3];
}

function pancawara(day) {
    var pancalist = ["Umanis", "Paing", "Pon", "Wage", "Kliwon"];
    return pancalist[(day-1) % 5];
}
function saptawara(day) {
  return  ["Redite", "Coma", "Anggara","Buda", "Wrespati",
          "Sukra", "Saniscara"][(day-1) % 7];
}

function wuku(day) {
  var wukulist = [
    "Sinta", "Landep", "Ukir", "Kulantir", "Tolu",
    "Gumbreg", "Wariga", "Warigadean", "Julungwangi", "Sungsang",
    "Dungulan", "Kuningan", "Langkir", "Medangsya", "Pujut",
    "Pahang", "Krulut", "Merakih", "Tambir", "Medangkungan",
    "Matal", "Uye", "Menail", "Prangbakat", "Bala",
    "Ugu", "Wayang", "Kelawu", "Dukut", "Watugunung"
  ];
  idx = (Math.floor((day-1) / 7) + 12) % 30;
  return wukulist[idx];
}

function bali_calendar(date) {
  var day = calcdays(date);
  return {
    Triwara: triwara(day),
    Pancawara: pancawara(day),
    Saptawara: saptawara(day),
    Wuku: wuku(day)
  };
}

module.exports.bali_calendar = bali_calendar;
