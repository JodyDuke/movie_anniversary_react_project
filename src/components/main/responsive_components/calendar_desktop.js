import React,{ Component } from "react";
import {calendarMap} from '../../utils/map_calendar';
import { days } from '../../utils/days';
import { addBirthday } from '../../utils/add_birthday_map'

class CalendarDesktop extends Component {
    constructor(props){
        super(props);
        this.state = {
            calendarArr : []
        }
    }

    componentDidMount() {
        this.setState({
            calendarArr: calendarMap(this.props.month, this.props.year),
        })
    }

    componentWillReceiveProps(nextProps) { 
        //if data is received from api call then block will fire
       if(nextProps.data[0] !== undefined){         
            this.setState({
                calendarArr: calendarMap(nextProps.month, nextProps.year, addBirthday(nextProps))
            })
       }       
    }

    render() {  
        //let mapped = this.props.data.map(e => console.log(e))
        const daysMap = days.map((item, i) => <div className="days" key={i}>{item}</div>)
        return (
            <div className="calendar">
            {daysMap} 
            {this.state.calendarArr}
            </div>
        )
    }
}

export default CalendarDesktop