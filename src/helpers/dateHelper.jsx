import { parseISO, format } from 'date-fns';

export const dateFormat = (dateString, formatType) => {
    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, formatType);

    return formattedDate;
}

export const todayDate = () => {
    // Get today's date
    const today = new Date();

    // Format the date as "MMM dd, yyyy"
    const formattedDate = format(today, "MMM dd, yyyy");

    return formattedDate;
};

export const dateInput = (dateVal) => {
    const formattedDate = dateVal.split("T")[0];

    return formattedDate
}


export const timeInput = (dateVal) => {
    const dateObj = new Date(dateVal);
    const time = dateObj.toISOString().split("T")[1].slice(0, 5);

    return time;
}