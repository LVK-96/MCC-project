
/*A comparison function for sorting dates that accepts Dates and strings
  that can be used to construct dates.*/
export function compareDates(a, b) {
  return (new Date(b)) - (new Date(a));
}

export function dateIsWithinAWeek(date) {
  const d = new Date(date);
  const now = Date.now();
  const asMilliseconds = d - now;
  const asSeconds = asMilliseconds / 1000;
  const asMinutes = asSeconds / 60;
  const asHours = asMinutes / 60;
  const asDays = asHours / 24;
  const asWeeks = asDays / 7;
  return (asWeeks >= 0) && (asWeeks < 1);
}
