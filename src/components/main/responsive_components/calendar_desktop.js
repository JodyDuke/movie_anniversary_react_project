import React,{ Component } from "react";
import { Route } from "react-router-dom";
import {calendarMap} from '../../utils/map_calendar';
import { days } from '../../utils/days';
import { addBirthday } from '../../utils/add_birthday_map';


class CalendarDesktop extends Component {
    constructor(props){
        super(props);
        this.state = {
            calendarArr : []
        }
    }


    // componentDidMount() {
    //     this.setState({
    //         calendarArr: calendarMap(this.props.month, this.props.year),
    //     })
    // }

    // componentWillReceiveProps(nextProps) { 
    //     //if data is received from api call then block will fire
    //    if(nextProps.data[0] !== undefined){         
    //         this.setState({
    //             calendarArr: calendarMap(nextProps.month, nextProps.year, addBirthday(nextProps))
    //         })
    //    }       
    // }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.data !== undefined && nextProps.data.length > 0){
    //         this.setState({
    //             calendarArr: nextProps.data[0].titles
    //         })     
    //     }
    // }



    render() {  
        console.log(this.props.data)
        const dataRender = () => {
            for(let i = 0; i < this.props.data.length ; i++) {
                if(this.props.year === this.props.data[i].year && this.props.month === this.props.data[i].month){
                    return this.props.data[i].titles
                }
                else return 'error'
            }
        }

        const daysMap = days.map((item, i) => <div className="days" key={i}>{item}</div>)
        return (
            //<Route path="/movies" 
            <div className="calendar">
            {daysMap} 
            {this.props.data !== undefined && this.props.data.length > 0 ? dataRender() : ''} 
            </div>
        )
    }
}

export default CalendarDesktop