import React,{ Component } from "react";
import {calendarMap} from '../../utils/map_calendar';
import { days } from '../../utils/days.js';

class CalendarDesktop extends Component {

    render() {
        const calendarArray = calendarMap(this.props.data.currentMonth, this.props.data.currentYear);
        const daysMap = days.map((item, i) => <div className="days" key={i}>{item}</div>)
        return (
            <div className="calendar">
            {daysMap} 
            {calendarArray}
            </div>
        )
    }
}

export default CalendarDesktop