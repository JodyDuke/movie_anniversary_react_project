import React from "react";
import CalendarNode from '../main/calendar_node';

export const calendarMap = (month, year, data = []) => {
    let result = []
    let dayCount = 1;
    //standard number of nodes on the desktop calendar 7 * 5
    let calendarLength = 35;
    //this variable gets the days in the month. Month has to be +1 because the 0 day is the last day of the month before.
    let daysInMonth = new Date(year, (month + 1), 0).getDate()
    //this var gets the first day of the month as an integer between 0-6 (0 is Sunday)
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
        let titles = []

        if (firstDay === e && daysInMonth > 0) {

            //inner for loop loops through api data and checks if any titles fall on the same day.
            for (let d = 0; d < data.length; d++) {
                if (data[d].day === dayCount) {
                    titles.push(data[d])
                }
            }

            //if firstDay matches current loop count then day count starts and is added to the node to be displayed as the date.
            result.push(<CalendarNode key={e} day={dayCount} year={year} month={month} titles={titles} id= 
                {year + '/' + month + '/' + dayCount} class="calendar-node" />)
            firstDay += 1;
            daysInMonth -= 1;
            dayCount += 1;
        }
        else {
            //class is added here to allow for a no-day className which can then be removed on mobile with display: none
            result.push(<CalendarNode key={e} day="" class="calendar-node no-day" />)
        }
    }

    //console.log(result)


    return result;
}