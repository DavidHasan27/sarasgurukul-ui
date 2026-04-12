/** Month-day keys "MM-DD" → display label (notable / fun days + India education days) */
export const SPECIAL_DAYS: Record<string, string> = {
  "01-01": "New Year's Day",
  "01-24": "National Girl Child Day (India)",
  "02-07": "Rose Day",
  "02-14": "Valentine's Day",
  "03-08": "International Women's Day",
  "04-23": "World Book Day",
  "05-01": "Labour Day",
  "06-05": "World Environment Day",
  "08-15": "Independence Day (India)",
  "09-05": "Teachers' Day (India)",
  "09-08": "International Literacy Day",
  "10-02": "Gandhi Jayanti",
  "11-14": "Children's Day (India)",
  "11-20": "Universal Children's Day",
  "12-25": "Christmas",
};

export function getSpecialDayLabel(date: Date = new Date()): string | null {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return SPECIAL_DAYS[`${mm}-${dd}`] ?? null;
}
