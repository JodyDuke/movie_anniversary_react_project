import React,{ Component } from "react";
import { Route } from "react-router-dom";
import Modal from './modal'
import Settings from './settings/settings';
import Header from '../header/header';
import SearchResults from './search/search_results';
import Account from './account/account';
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
            countrySelect: 'GB',
            yearsSelect : [5, 10, 20, 25, 30, 40, 50, 60, 70, 80, 100],
            totalCalendarSession : []
        }

        this.handleDateChange = this.handleDateChange.bind(this)
        this.getMovies = this.getMovies.bind(this)
        this.updateSettings = this.updateSettings.bind(this)
        this.handleSearchQuery = this.handleSearchQuery.bind(this)
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
                return fetch(tmdb.url + tmdb.discover + config.TMDB_KEY + tmdb.startString + (y - e) + '-' + m + '-' + 1 + tmdb.releaseLessThan + (y - e) + '-' + m + '-' + daysInMonth + tmdb.region + this.state.countrySelect + tmdb.endString, {
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
                    totalCalendarArr.unshift({
                        month: this.state.month,
                        year: this.state.year,
                        titles: addToArr
                    })
                    return this.setState({
                        totalCalendarSession: totalCalendarArr
                    })
                }
                else {
                    totalCalendarArr.push({
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

    updateSettings(props){
        this.setState({
            yearsSelect : props.years,
            countrySelect: props.country,
            totalCalendarSession : []
        }, () => this.getMovies())
    }

    handleSearchQuery(props) {
        this.setState({
            search : props
        })
    }


    render() {
        return (
            <div className="main">
                    {window.location.pathname.includes('movies') ? 
                        null 
                    :
                        <Header handleDateChange={this.handleDateChange} searchQuery={this.handleSearchQuery} month={this.state.month} year={this.state.year} />
                    }
                    <Route exact path='/' render={() => {
                            return this.props.responsive === 'desktop' ? 
                            <CalendarDesktop month={this.state.month} year={this.state.year} data={this.state.totalCalendarSession} />
                            :
                            <CalendarMobile data={this.state.totalCalendarSession} month={this.state.month} year={this.state.year} />
                    }} />
                    <Route path='/movies/:id' render={() => <Modal data={this.state.totalCalendarSession}/>} />
                    <Route path="/settings" render={() => <Settings yearsSelect={this.state.yearsSelect} currentRegion={this.state.countrySelect} onSubmit={this.updateSettings}/>} />
                    <Route path="/account" render={() => <Account />} />
                    <Route path="/search" render={() => <SearchResults searchQuery={this.state.search} country={this.state.countrySelect} />} />
            </div>
        )
    }
}

export default Main