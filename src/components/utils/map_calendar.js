import React from "react";
import CalendarNode from '../main/calendar_node';

export const calendarMap = (month, year) => {
    let result = []
    let dayCount = 1;
    let firstDayOfMonth = new Date(year, month, 1).getDay()
    let daysInMonth = new Date(year, month, 0).getDate()
    for (let e = 0; e < 35; e++) {
        if (firstDayOfMonth === e && daysInMonth > 0) {
            result.push(<CalendarNode key={e} day={dayCount} />)
            firstDayOfMonth += 1;
            daysInMonth -= 1;
            dayCount += 1;
        }
        else {
            result.push(<CalendarNode key={e} day="" />)
        }
    }
    return result;
}

