import React,{ Component } from "react";
import Header from '../header/header';
import { calendarMap } from "../utils/map_calendar.js";

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMonth : null,
            currentYear : null
        }
    }

componentDidMount() {
    const todaysDate = new Date();
    this.setState({
        currentMonth: parseInt(todaysDate.getMonth().toString(), 10) + 1,
        currentYear: todaysDate.getYear().toString()
    })

}

    render() {
        const calendar = calendarMap(this.state.currentMonth, this.state.currentYear);

        return (
            <div className="main">
                <Header month={this.state.currentMonth} year={this.state.currentYear}/>
                <div className="calendar">
                    <div className="days">Sun</div>
                    <div className="days">Mon</div>                  
                    <div className="days">Tue</div>                  
                    <div className="days">Wed</div>                  
                    <div className="days">Thu</div>                  
                    <div className="days">Fri</div>                  
                    <div className="days">Sat</div>                  
                    {calendar}
                </div>
            </div>
        )
    }
}

export default Main