import React, { Component } from "react";
import { calendarMap } from '../../utils/map_calendar';
import CalendarNode from "../calendar_node";

class CalendarMobile extends Component {
    constructor(props){
        super(props)
        this.state = {
            calendarArr : [],
            mapKey : 10000
        }
        this.handleScroll = this.handleScroll.bind(this)
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        const calendarArray = calendarMap(this.props.data.currentMonth, this.props.data.currentYear);
        this.setState({
            calendarArr: calendarArray
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = (ev) => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.props.handleDateChange('monthUp')
            const calendarUpdate = calendarMap(this.props.data.currentMonth, this.props.data.currentYear);
            let currentCalendar = this.state.calendarArr
            currentCalendar.push(<CalendarNode key={this.state.mapKey} class="mobile-month-year" month={this.props.data.currentMonth} year={this.props.data.currentYear}/>)
            currentCalendar.push(calendarUpdate)
            this.setState({
                calendarArr : currentCalendar,
                mapKey: this.state.mapKey + 1
            })
        }
    };

    render() {
        console.log(this.props.data.apiData)
        return (
            <div className="calendar">
                {this.state.calendarArr}
            </div>
        )
    }
}

export default CalendarMobile