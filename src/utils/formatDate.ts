export function formatDateToTodayYesterday(dates: string): string {
    const [day, month, year] = dates.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (isSameDate(date, today)) {
        return "Today";
    } else if (isSameDate(date, yesterday)) {
        return "Yesterday";
    } else {
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }
}

function isSameDate(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
