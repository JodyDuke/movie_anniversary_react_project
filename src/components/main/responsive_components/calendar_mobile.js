import React, { Component } from "react";
import { calendarMap } from '../../utils/map_calendar';
import CalendarNode from "../calendar_node";
import { addBirthday } from "../../utils/add_birthday_map";

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
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    // componentWillMount() {
    //     const currentCalendar = this.state.calendarArr
    //     currentCalendar.push(<CalendarNode key={this.state.mapKey} class="mobile-month-year" month={this.props.month} year={this.props.year} />)
    //     const calendarArray = calendarMap(this.props.month, this.props.year, addBirthday(this.props))
    //     currentCalendar.push(calendarArray)
    //     this.setState({
    //         calendarArr: currentCalendar,
    //         mapKey: this.state.mapKey + 1
    //     })

    // }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.data !== undefined){
    //         //console.log('current props: ', this.props)
    //         //console.log('next props: ', nextProps)
    //         const currentCalendar = this.state.calendarArr
    //         console.log(currentCalendar)
    //         currentCalendar.push(<CalendarNode key={this.state.mapKey} class="mobile-month-year" month={nextProps.month} year={nextProps.year} />)
    //         const calendarArray = calendarMap(nextProps.month, nextProps.year, addBirthday(nextProps))
    //         currentCalendar.push(calendarArray)
    //         this.setState({
    //             calendarArr: currentCalendar,
    //             mapKey : this.state.mapKey + 1
    //         })
    //     }   
    // }

    componentWillReceiveProps(nextProps) {
        //if data is received from api call then block will fire
        if (nextProps.data[0] !== undefined) {
            this.setState({
                calendarArr: calendarMap(nextProps.month, nextProps.year, addBirthday(nextProps))
            })
        } 

    }



    handleScroll = (ev) => {
        ev.preventDefault()
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.props.handleDateChange('monthUp')
        }
    };

    render() {
        return (
            <div className="calendar">
                {this.state.calendarArr}
            </div>
        )
    }
}

export default CalendarMobile