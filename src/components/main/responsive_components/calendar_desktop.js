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
            calendarArr: calendarMap(this.props.month, this.props.year),
        })
    }

    componentWillReceiveProps(nextProps) { 

        //if data is received from api call then block will fire
       if(nextProps.data[0] !== undefined){

        let newData = nextProps.data

        //returns all results from api call
        let mapped = newData.map(e => {
            return e.results
        })

        //reduces all results into one array for easier mapping
        mapped = mapped.concat.apply([], mapped);
        console.log(mapped)

            //adds a new data point to api data to match days and anniversary year in map_calendar function
            let newDataMapped = mapped.map((data, int) => {
                //console.log(data)
                if(data.popularity >= 9){
                let releaseYear = parseInt(data.release_date.slice(0, 4), 10)
                let day = parseInt(data.release_date.slice(-2), 10)
                data.day = day
                data.birthday = this.props.year - releaseYear
                return data
                }
                else return ''
            })

            
            this.setState({
                calendarArr : calendarMap(nextProps.month, nextProps.year, newDataMapped)
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