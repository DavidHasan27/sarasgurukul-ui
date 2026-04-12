import { subDays } from "date-fns";

/** Resolve registration / join date from API student object */
export function getStudentJoinedDate(student: any): Date | null {
  const raw =
    student?.createdAt ??
    student?.created_at ??
    student?.joiningDate ??
    student?.joining_date ??
    student?.registrationDate;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

export function isBirthdayToday(birthRaw: any): boolean {
  if (!birthRaw) return false;
  const d = new Date(birthRaw);
  if (isNaN(d.getTime())) return false;
  const t = new Date();
  return d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
}

export function getBirthdayName(person: {
  firstName?: string;
  lastName?: string;
}): string {
  return [person.firstName, person.lastName].filter(Boolean).join(" ").trim();
}

export type NewStudentCounts = {
  week: number;
  month: number;
  year: number;
};

export function countNewStudentsByPeriod(
  students: any[],
  now: Date = new Date()
): NewStudentCounts {
  const weekAgo = subDays(now, 7);
  const monthAgo = subDays(now, 30);
  const yearAgo = subDays(now, 365);

  let week = 0;
  let month = 0;
  let year = 0;

  for (const s of students) {
    const jd = getStudentJoinedDate(s);
    if (!jd) continue;
    const t = jd.getTime();
    if (t >= weekAgo.getTime() && t <= now.getTime()) week++;
    if (t >= monthAgo.getTime() && t <= now.getTime()) month++;
    if (t >= yearAgo.getTime() && t <= now.getTime()) year++;
  }

  return { week, month, year };
}
