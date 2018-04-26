import React,{ Component } from "react";
import { Route } from "react-router-dom";
import Header from '../header/header';
import Settings from '../main/settings/settings';
import Account from '../main/account/account';
import CalendarDesktop from "./responsive_components/calendar_desktop";
import CalendarMobile from "./responsive_components/calendar_mobile";
import { config } from '../../api/api_keys';
import { tmdb } from '../../api/tmdb';
import { calendarMap } from '../utils/map_calendar'
import { addBirthday } from '../utils/add_birthday_map'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            month : null,
            year : null,
            firstDayOfMonth : null,
            yearsSelect : [5, 10, 20, 25, 30, 40, 50, 60, 70, 80, 100],
            totalCalendarSession : []
        }

        this.handleDateChange = this.handleDateChange.bind(this)
        this.getMovies = this.getMovies.bind(this)
        this.updateYears = this.updateYears.bind(this)
    }

    componentWillMount() {
        const todaysDate = new Date();
        this.setState({
            month: parseInt(todaysDate.getMonth().toString(), 10),
            year: todaysDate.getFullYear()
        }, () => this.getMovies())
    } 


    getMovies(props) {
        let daysInMonth = new Date(this.state.year, (this.state.month + 1), 0).getDate();
        let y = this.state.year;
        let m = this.state.month + 1;
        Promise.all(
            this.state.yearsSelect.map(e => {
                return fetch(tmdb.url + tmdb.discover + config.TMBD_KEY + tmdb.startString + (y - e) + '-' + m + '-' + 1 + tmdb.releaseLessThan + (y - e) + '-' + m + '-' + daysInMonth + tmdb.endString, {
                    'callback': 'test'
                })
                .then(response => response.json())
            })
        )
        .then(data => this.setState({data : data}))
        .then(() => {
            const addToArr = calendarMap(this.state.month, this.state.year, addBirthday(this.state))
            let totalCalendarArr = this.state.totalCalendarSession

            for(let i = 0 ; i < totalCalendarArr.length ; i++){
                if(totalCalendarArr[i].month === this.state.month && totalCalendarArr[i].year === this.state.year) {
                    return this.setState({
                        totalCalendarSession : totalCalendarArr
                    })
                }
            }
            if(totalCalendarArr.length > 1){
                if(totalCalendarArr[0].month > this.state.month && totalCalendarArr[0].year > this.state.year){
                    totalCalendarArr.push({
                        month: this.state.month,
                        year: this.state.year,
                        titles: addToArr
                    })
                    return this.setState({
                        totalCalendarSession: totalCalendarArr
                    })
                }
                else {
                    totalCalendarArr.unshift({
                        month: this.state.month,
                        year: this.state.year,
                        titles: addToArr
                    })
                    return this.setState({
                        totalCalendarSession: totalCalendarArr
                    })
                }
            }

            totalCalendarArr.push({
                month: this.state.month,
                year: this.state.year,
                titles: addToArr
            })
            return this.setState({
                totalCalendarSession: totalCalendarArr
            })
            
        })
    }


    handleDateChange = (data) => {
        let newMonth = this.state.month
        let newYear = this.state.year
        if(data === 'monthDown') {
            if (this.state.month === 0) {
                newMonth = 11
                newYear--;
            }
            else {
                newMonth--;
            }
        }           
        if(data === 'monthUp') {
            if (this.state.month === 11) {
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
            month : newMonth,
            year : newYear
        }, () => this.getMovies())
    }

    updateYears(props){
        this.setState({
            yearsSelect : props
        }, () => this.getMovies())
    }


    render() {
        return (
            <div className="main">
                <Header handleDateChange={this.handleDateChange} month={this.state.month} year={this.state.year}/> 
                <Route exact path='/' render={() => {
                        return this.props.responsive === 'desktop' ? <CalendarDesktop month={this.state.month} year={this.state.year} data={this.state.totalCalendarSession} />
                        :
                        <CalendarMobile handleDateChange={this.handleDateChange} data={this.state.totalCalendarSession} month={this.state.month} year={this.state.year} />
                }} />
                <Route path="/settings" render={() => <Settings yearsSelect={this.state.yearsSelect} onSubmit={this.updateYears}/>} />
                <Route path="/account" render={() => <Account />} />
                
            </div>
        )
    }
}

export default Main