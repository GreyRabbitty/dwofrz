export function get_remainig_time(time, posting_days) {
  const now = Date.now();
  const posting_time = 24 * 60 * 60 * 1000 * posting_days;
  
  const finish = time + posting_time;
  if (now >= finish) return "FINISH";
  const ramaining_time = finish - now;
  const secends = ramaining_time / 1000;
  const minutes = secends / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = months / 12;
  if (secends < 60) {
    return "less than minutes";
  } else if (1 < minutes && minutes < 60) {
    if (minutes >= 2) {
      return Math.trunc(minutes) + " minutes left";
    } else {
      return Math.trunc(minutes) + " minute left";
    }
  } else if (1 < hours && hours < 24) {
    if (hours >= 2) {
      return Math.trunc(hours) + " hours left";
    } else {
      return Math.trunc(hours) + " hour left";
    }
  } else if (1 < days && days < 7) {
    if (days >= 2) {
      return Math.trunc(days) + " days left";
    } else {
      return Math.trunc(days) + " day left";
    }
  } else if (1 < weeks && weeks <= 4) {
    if (weeks >= 2) {
      return Math.trunc(weeks) + " weeks left";
    } else {
      return Math.trunc(weeks) + " week left";
    }
  } else if (1 < months && months <= 12) {
    if (months >= 2) {
      return Math.trunc(months) + " months left";
    } else {
      return Math.trunc(months) + " month left";
    }
  } else if (years >= 1) {
    if (years >= 2) {
      return Math.trunc(months) + " year left";
    } else {
      return Math.trunc(years) + " year left";
    }
  }
}
