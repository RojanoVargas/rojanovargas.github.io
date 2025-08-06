import { Temporal } from '@js-temporal/polyfill';

export function useCalendar() {
    const today = Temporal.Now.zonedDateTimeISO()
    const currentDay = today.day;
    const currentDayOfTheWeek = today.dayOfWeek;
    const currentMonth = today.month;
    const currentYear = today.year;
    
    return {
        today,
        currentDay,
        currentDayOfTheWeek,
        currentMonth,
        currentYear
    };
}