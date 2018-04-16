import React from "react";
import CalendarNode from '../main/calendar_node';

export const calendarMap = (month, year) => {
    let result = []
    let dayCount = 1;
    let calendarLength = 35;
    let daysInMonth = new Date(year, (month + 1), 0).getDate()
    let firstDay = (new Date(year, month, 1).getDay())
    //if statement ensures the day starts on the right day with Sunday being at the end of the week (Sunday start of the week in Date() object)
    if (firstDay === 0) {
        firstDay = 6
    }
    else {
        firstDay -= 1
    }

    //if statement makes 5 rows instead of 4 if the first day is a sun and the month is longer than 29 days or the first day is a sat and there are 31 days
    if ((firstDay > 5 && daysInMonth > 29) || (firstDay > 4 && daysInMonth > 30)) {
        calendarLength = 42;
    }

    //for loop iterates through cells in the calendar. Starts numbering when the first day of the month
    //is the same as the loop counter.
    for (let e = 0; e < calendarLength; e++) {
        if (firstDay === e && daysInMonth > 0) {
            result.push(<CalendarNode key={e} day={dayCount} />)
            firstDay += 1;
            daysInMonth -= 1;
            dayCount += 1;
        }
        else {
            result.push(<CalendarNode key={e} day="" />)
        }
    }
    return result;
}

