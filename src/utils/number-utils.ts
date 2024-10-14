export class NumberUtils {
    static toTwoDecimalPlaces(number: number | string) {
        return Math.round((parseFloat(number as string) + 0.001) * 100) / 100;
    }
}