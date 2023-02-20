module.exports = {
    date_day: (date) => {
        return date.slice(8, 10);  
    },
    date_month: (date) => {
        return date.slice(5, 7);
    },
    date_year: (date) => {
        return date.slice(0, 4);
    },
    date_all: (date) => {
        const dateDay = date.slice(8, 10);
        const dateMonth = date.slice(5, 7);
        const dateYear = date.slice(0, 4);
        return `${dateDay}-${dateMonth}-${dateYear}`
    }
};
