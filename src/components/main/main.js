import React,{ Component } from "react";
import Header from '../header/header';
import { calendarMap } from "../utils/map_calendar.js";

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMonth : null,
            currentYear : null,
            firstDayOfMonth : null
        }

        this.handleDateChange = this.handleDateChange.bind(this)
    }

    componentDidMount() {
        const todaysDate = new Date();
        this.setState({
            currentMonth: parseInt(todaysDate.getMonth().toString(), 10),
            currentYear: todaysDate.getFullYear()
        })
    } 

        handleDateChange = (data) => {
            let newMonth = this.state.currentMonth
            let newYear = this.state.currentYear
            if(data === 'monthDown') {
                if (this.state.currentMonth === 0) {
                    newMonth = 11
                    newYear--;
                }
                else {
                    newMonth--;
                }
            }           
            if(data === 'monthUp') {
                if (this.state.currentMonth === 11) {
                    newMonth = 0
                    newYear++
                }
                else {
                    newMonth++;
                }
            }
            if(data === 'yearUp') {
                newYear ++
            }
            if(data === 'yearDown') {
                newYear --
            }     
            this.setState({
                currentMonth : newMonth,
                currentYear : newYear
            })
        }
    


    render() {
        const calendarArray = calendarMap(this.state.currentMonth, this.state.currentYear);

        return (
            <div className="main">
                <Header handleDateChange={this.handleDateChange} month={this.state.currentMonth} year={this.state.currentYear}/>
                <div className="calendar">
                    <div className="days">Mon</div>                  
                    <div className="days">Tue</div>                  
                    <div className="days">Wed</div>                  
                    <div className="days">Thu</div>                  
                    <div className="days">Fri</div>                  
                    <div className="days">Sat</div>  
                    <div className="days">Sun</div>
                                    
                    {calendarArray}
                </div>
            </div>
        )
    }
}

export default Main