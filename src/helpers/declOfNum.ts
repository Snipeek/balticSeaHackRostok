const cases = [2, 0, 1, 1, 1, 2];
const declOfNumSubFunction = (titles: string[], number: number): string => {
    number = Math.abs(number);
    return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
};

type declOfNumFunction = (number: number) => string;

const declOfNum =  (titles: string[], number?: number): string | declOfNumFunction => {
    if (!number) {
        return (decimal: number) => {
            return declOfNumSubFunction(titles, decimal);
        };
    } else {
        return declOfNumSubFunction(titles, number);
    }
};

export default declOfNum;
