import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';

export const dateFormat = (dateString, formatType) => {
    // Parse in UTC mode
    const parsedDate = parseISO(dateString);
    
    // Format using UTC time zone
    return format(parsedDate, formatType, { timeZone: 'UTC' });
};

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


export const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    // Get day suffix
    const day = date.getDate();
    const suffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    const result = `${day}${suffix(day)} ${formattedDate.split(" ")[1]} ${date.getFullYear()}`;

    return result
}


export const compareEventDate = (dateString) => {
    const date = new Date(dateString);

    // Check if the date is today
    const today = new Date();
    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    return isToday ? "Today" : '';
}


export const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    // Get day, month, and year
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    // Get 12-hour format time with AM/PM
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-GB", timeOptions).toLowerCase();

    // Get the correct suffix for the day
    const day = date.getDate();
    const suffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${day}${suffix(day)} ${formattedDate.split(" ")[1]} ${date.getFullYear()} (${formattedTime})`;
}
