export function serpTextBuilder(vacanciesCount?: number, avgSalary?: number): string[] {
    const result: string[] = [];

    if (vacanciesCount) {
        result.push(`${vacanciesCount} Вакансии`);
    }
    if (avgSalary) {
        result.push(`ЗП ~ ${avgSalary} Р`);
    }
    return result;
}
