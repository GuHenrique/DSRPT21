/*
     * Método que formata data e hora para modelo ISO
     * É preciso somente passar o metodo new Date() para formatar a data
			 no modelo ISO (YYYY-MM-DD HH:MM:SS) 
     *
     * @param date : new Date()
     *
     */
function formattedDateTime(date) {
  
  var day, month, year, hour, minutes, seconds;

  var dateReturn = "";

  day = date.getDate().toString();
  month = (date.getMonth() + 1).toString();
  year = date.getFullYear();

  hour = date.getHours().toString();
  minutes = date.getMinutes().toString();
  seconds = date.getSeconds().toString();

  month = month.length == 1 ? "0" + month : month;
  day = day.length == 1 ? "0" + day : day;

  hour = hour.length == 1 ? "0" + hour : hour;
  minutes = minutes.length == 1 ? "0" + minutes : minutes;
  seconds = seconds.length == 1 ? "0" + seconds : seconds;

  dateReturn = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;

  return dateReturn;
}

/*
   * Método que formata data para modelo ISO(YYYY-MM-DD) 
   * É preciso somente passar o metodo new Date() para formatar a data
           no modelo ISO (YYYY-MM-DD) 
   *
   * @param date : new Date()
   *
   */
function formattedDate(date) {

  var day, month, year;

  var dateReturn = "";

  day = date.getDate().toString();
  month = (date.getMonth() + 1).toString();
  year = date.getFullYear();

  month = month.length == 1 ? "0" + month : month;
  day = day.length == 1 ? "0" + day : day;

  dateReturn = year + "-" + month + "-" + day;

  return dateReturn;
}

function getMonthPeriod(year, month) {

  var date = new Date(year, month - 1);
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  var finalFirst = formattedDateTime(firstDay);
  var finalLast = formattedDateTime(lastDay);

  finalLast = finalLast.replace("00:00:00", "23:59:59");

  return {
    "firstDay": finalFirst,
    "lastDay": finalLast
  };
}

function addTimeToTheDate(date, d, m, y) {

  if (!date) return;

  if (d) date.setDate(date.getDate() + d);
  if (m) date.setMonth(date.getMonth() + m);
  if (y) date.setFullYear(date.getFullYear() + y);

  return date;
}

function aliveAtBySeconds(seconds){

  var days = (seconds / (60 * 60 * 24)).toFixed(0);
  var hoursRemainder = (seconds % (60 * 60 * 24)).toFixed(0);

  var hours = (hoursRemainder / (60 * 60)).toFixed(0);
  var minutesRemainder = (hoursRemainder % (60 * 60)).toFixed(0);

  var minutes = (minutesRemainder / 60).toFixed(0);
  var secondsRemainder = (minutesRemainder % 60).toFixed(0);
  
  return `Alive at ${days} days ${hours} hours ${minutes} minutes ${secondsRemainder} seconds`;
}


module.exports = {
  formattedDateTime: formattedDateTime,
  formattedDate: formattedDate,
  getMonthPeriod: getMonthPeriod,
  addTimeToTheDate: addTimeToTheDate,
  aliveAtBySeconds: aliveAtBySeconds
};