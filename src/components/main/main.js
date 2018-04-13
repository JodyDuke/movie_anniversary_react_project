import React,{ Component } from "react";
import Header from '../header/header';
import CalendarNode from './calendar_node'

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
        const calendarMap = () => {
            let result = []
            //let firstDayOfMonth = new Date(this.state.currentYear, this.state.currentMonth, 1).getDay()
            let daysInMonth = new Date(this.state.currentYear, this.state.currentMonth, 0).getDate()
            for(let i = 1 ; i <= daysInMonth ; i++){
                result.push(<CalendarNode key={i} day={i} />)
            }
            return result;        
        }

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
                    {calendarMap()}
                </div>
            </div>
        )
    }
}

export default Main