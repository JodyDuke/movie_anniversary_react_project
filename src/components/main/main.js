import React,{ Component } from "react";
import Header from '../header/header';
import CalendarDesktop from "./responsive_components/calendar_desktop";
import CalendarMobile from "./responsive_components/calendar_mobile";

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

    componentWillMount() {
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
        return (
            <div className="main">
                <Header handleDateChange={this.handleDateChange} month={this.state.currentMonth} year={this.state.currentYear}/>
                
                    {this.props.responsive === 'desktop' ? <CalendarDesktop data={this.state}/> : <CalendarMobile handleDateChange={this.handleDateChange} data={this.state} />}

            </div>
        )
    }
}

export default Main