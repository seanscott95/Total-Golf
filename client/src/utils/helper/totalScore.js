// Calculates the total score of the firstNine and lastNine holes values
export const totalScore = (firstNine, lastNine) => {
    let sum = 0;
    for (const value in firstNine) {
        sum += parseInt(firstNine[value]);
    };
    for (const value2 in lastNine) {
        sum += parseInt(lastNine[value2]);
    };
    return sum
};