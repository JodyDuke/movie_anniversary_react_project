import React,{ Component } from "react";
import { Route } from "react-router-dom";
import Header from '../header/header';
import Settings from '../main/settings/settings';
import Account from '../main/account/account';
import CalendarDesktop from "./responsive_components/calendar_desktop";
import CalendarMobile from "./responsive_components/calendar_mobile";
import { config } from '../../api/api_keys';
import { tmdb } from '../../api/tmdb';

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMonth : null,
            currentYear : null,
            firstDayOfMonth : null,
            yearsSelect : [10, 25, 40, 50],
            apiData : {}
        }

        this.handleDateChange = this.handleDateChange.bind(this)
        this.getMovies = this.getMovies.bind(this)
    }

    componentWillMount() {
        const todaysDate = new Date();
        this.setState({
            currentMonth: parseInt(todaysDate.getMonth().toString(), 10),
            currentYear: todaysDate.getFullYear()
        })
    } 

    componentDidMount() {
        this.getMovies()
    }

    getMovies() {
        let daysInMonth = new Date(this.state.currentYear, (this.state.currentMonth + 1), 0).getDate();
        let y = this.state.currentYear;
        let y25 = this.state.currentYear - 25
        let m = this.state.currentMonth + 1;
        Promise.all([
            fetch(tmdb.url + tmdb.discover + config.TMBD_KEY + tmdb.startString + y + '-' + m + '-' + 1 + tmdb.releaseLessThan + y + '-' + m + '-' + daysInMonth + tmdb.endString, {
                'callback': 'test'
            }),
            fetch(tmdb.url + tmdb.discover + config.TMBD_KEY + tmdb.startString + y25 + '-' + m + '-' + 1 + tmdb.releaseLessThan + y25 + '-' + m + '-' + daysInMonth + tmdb.endString, {
                'callback': 'test'
            })
        ])
            .then(responses => {
                const one = responses[0].json()
                const two = responses[1].json()
                return [one, two]
            })
            .then(data => this.setState({ apiData: data }, () => console.log('api data on date change: ', this.state.apiData)))
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
        }, () => this.getMovies())
    }


    render() {
        return (
            <div className="main">
                <Header handleDateChange={this.handleDateChange} month={this.state.currentMonth} year={this.state.currentYear}/> 
                <Route exact path='/' render={() => {
                        return this.props.responsive === 'desktop' ? <CalendarDesktop month={this.state.currentMonth} year={this.state.currentYear} data={this.state.apiData} />
                        :
                        <CalendarMobile handleDateChange={this.handleDateChange} data={this.state} />
                }} />
                <Route path="/settings" render={() => <Settings yearsSelect={this.state.yearsSelect} />} />
                <Route path="/account" render={() => <Account />} />
                
            </div>
        )
    }
}

export default Main