import React, { Component } from "react";
import { calendarMap } from '../../utils/map_calendar';

class CalendarMobile extends Component {
    constructor(props){
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = (ev) => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            console.log("you're at the bottom of the page");
        }
    };

    render() {
        const calendarArray = calendarMap(this.props.data.currentMonth, this.props.data.currentYear);
        return (
            <div className="calendar">
                {calendarArray}
            </div>
        )
    }
}

export default CalendarMobile