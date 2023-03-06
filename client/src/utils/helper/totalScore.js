// Calculates the total score of the firstNine and lastNine holes values
export const totalScore = (firstNine, lastNine) => {
    let sum = 0;
    // Tally firstNine and lastNine if they are both truthy
    if (firstNine.hole1 > 0 && lastNine.hole10 > 0) {
        for (const value in firstNine) {
            sum += parseInt(firstNine[value]);
        };
        for (const value2 in lastNine) {
            sum += parseInt(lastNine[value2]);
        };
        return sum;
    } else if (firstNine.hole1 > 0) {
        for (const value in firstNine) {
            sum += parseInt(firstNine[value]);
        };
        return sum;
    } else if (lastNine.hole10 > 0) {
        for (const value2 in lastNine) {
            sum += parseInt(lastNine[value2]);
        };
        return sum;
    };
};