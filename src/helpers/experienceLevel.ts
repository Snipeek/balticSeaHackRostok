import * as moment from "moment";

export function experienceLevelToExperienceAges(experience?: IResumeExperience[]): {years: number, months: number} {
    let result = {years: 0, months: 0};
    if (experience && experience.length) {
        const date = moment.duration();
        let dateFrom = moment(experience[0].date_start!.string);
        let dateTo = experience[0].date_end ? moment(experience[0].date_end.string).add(1, "M") : moment();
        experience.sort((e1, e2) => {
            if (e1.date_start && e2.date_start) {
                return e1.date_start < e2.date_start ? -1 : 1;
            }
            return 1;
        }).forEach((experienceItem, index) => {
            if (index) {
                const dateFromCurrent = moment(experienceItem.date_start!.string);
                const dateToCurrent = experienceItem.date_end ? moment(experienceItem.date_end.string) : moment().add(1, "M");
                if (dateTo.add(1, "M").isBefore(dateFromCurrent)) {
                    date.add(dateTo.diff(dateFrom));
                    dateFrom = dateFromCurrent;
                    dateTo = dateToCurrent;
                } else {
                    dateTo = dateToCurrent;
                }
            }
        });
        date.add(dateTo.diff(dateFrom));
        result = {years: date.years(), months: date.months() };
    }
    return result;
}
