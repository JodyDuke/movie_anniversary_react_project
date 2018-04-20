import React,{ Component } from "react";
import {calendarMap} from '../../utils/map_calendar';
import { days } from '../../utils/days';

class CalendarDesktop extends Component {
    constructor(props){
        super(props);
        this.state = {
            calendarArr : []
        }
    }

    componentDidMount() {
        this.setState({
            calendarArr: calendarMap(this.props.month, this.props.year)
        })
    }

    componentWillReceiveProps(nextProps) { 

        if(nextProps.data.results !== undefined){

            let newData = nextProps.data.results;

            let newDataMapped = newData.map((data, int) => {
                let day = parseInt(data.release_date.slice(-2), 10)
                data.day = day
                return data
            })

            
            this.setState({
                calendarArr : calendarMap(nextProps.month, nextProps.year, newDataMapped)
            })

        }
        
    }



    render() {      
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