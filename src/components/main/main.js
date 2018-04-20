import React,{ Component } from "react";
import Header from '../header/header';
import CalendarDesktop from "./responsive_components/calendar_desktop";
import CalendarMobile from "./responsive_components/calendar_mobile";
import { config } from '../../api/api_keys';
//import { omdb } from '../../api/omdb';
import { tmdb } from '../../api/tmdb';
//import { movieGlu } from '../../api/movie_glu';

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMonth : null,
            currentYear : null,
            firstDayOfMonth : null,
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
        let y = this.state.currentYear - 25;
        let m = this.state.currentMonth + 1;
        fetch(tmdb.url + tmdb.discover + config.TMBD_KEY + tmdb.startString + y + '-' + m + '-' + 1 + tmdb.releaseLessThan + y + '-' + m + '-' + daysInMonth + tmdb.endString, {
            'callback': 'test'
        })
            .then(response => response.json())
            .then(data => this.setState({ apiData: data }));
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
                    {this.props.responsive === 'desktop' ? <CalendarDesktop month={this.state.currentMonth} year={this.state.currentYear} data={this.state.apiData}/> 
                    : 
                    <CalendarMobile handleDateChange={this.handleDateChange} data={this.state} />}
            </div>
        )
    }
}

export default Main