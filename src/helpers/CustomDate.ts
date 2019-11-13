import * as moment from "moment";

export enum CustomDateFormats {
    date,
    fullDay,
    monthAndYear,
    years,
}

interface ICustomDateValues {
    d?: string;
    dd?: string;
    mm?: string;
    yyyy?: string;
    mmmm?: string;
    MMMM?: string;
}

type customDateValue = (keyof ICustomDateValues);

const monthStr = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

const monthStrDay = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "майя",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
];

export class CustomDate {

    public static format(dateStr: string | number, format: CustomDateFormats): string {
        const date = new CustomDate(dateStr);
        return date.format(format);
    }

    protected date: Date;

    constructor(dateStr: string | number) {
        const date = moment(dateStr);
        this.date = new Date(date.unix() * 1000);
    }

    public format(format: CustomDateFormats): string {
        switch (format) {
            case CustomDateFormats.date:
                return this.formatDate();
            case CustomDateFormats.fullDay:
                return this.formatFullDay();
            case CustomDateFormats.monthAndYear:
                return this.formatMonthAndYear();
            case CustomDateFormats.years:
                return this.formatYears();
        }
        return "";
    }

    protected formatMonthAndYear(): string {
      const {MMMM, yyyy} = this.getValues(["MMMM", "yyyy"]);
      return `${MMMM} ${yyyy}`;
    }

    protected formatDate(): string {
        const {dd, mm, yyyy} = this.getValues(["dd", "mm", "yyyy"]);
        return `${dd}.${mm}.${yyyy}`;
    }

    protected formatFullDay(): string {
        const {d, mmmm} = this.getValues(["d", "mmmm"]);
        return `${d} ${mmmm}`;
    }

    protected formatYears(): string {
        const {yyyy} = this.getValues(["yyyy"]);
        return `${yyyy}`;
    }

    protected getValues(values: customDateValue[]): ICustomDateValues {
        const result: ICustomDateValues = {};
        values.forEach(value => {
            result[value] = this.getValue(value);
        });
        return result;
    }

    protected getValue(value: customDateValue): string {
        let result = "";
        switch (value) {
            case "d":
                result = "" + this.date.getDate();
                break;
            case "dd":
                const day = this.date.getDate();
                result = day > 9 ? "" + day : "0" + day;
                break;
            case "mm":
                const month = this.date.getMonth() + 1;
                result = month > 9 ? "" + month : "0" + month;
                break;
            case "yyyy":
                result = this.date.getFullYear() + "";
                break;
            case "mmmm":
                if (!monthStrDay[this.date.getMonth()]) {
                    console.error(this.date.getMonth());
                }
                return monthStrDay[this.date.getMonth()] ? monthStrDay[this.date.getMonth()].toLowerCase() : "";
            case "MMMM":
                if (!monthStr[this.date.getMonth()]) {
                    console.error(this.date.getMonth());
                }
                return monthStr[this.date.getMonth()] ? monthStr[this.date.getMonth()].toLowerCase() : "";
        }
        return result;
    }
}
