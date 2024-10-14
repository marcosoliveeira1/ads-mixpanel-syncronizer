export class DateUtils {
    static isValidDate(stop_time: string) {
        try {
            const date = new Date(stop_time);
            return date instanceof Date && !isNaN(date.getTime());
        } catch (error) {
            return false;
        }
    }
    static dateToIso8601(date: Date) {
        return date.toISOString().split('T')[0];
    }
}