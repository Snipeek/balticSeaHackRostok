const salary = (salaryMin: null | number = null, salaryMax: null | number = null): string => {
    let result = "";
    if (salaryMin) {
        result += "от " + salaryMin;
    }
    if (salaryMax) {
        if (result) {
            result += " ";
        }
        result += "до" + salaryMax;
    }
    if (!salaryMin && !salaryMax) {
        return "по договоренности";
    }
    return result + " Р";
};

function formattedPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export {salary, formattedPrice};
