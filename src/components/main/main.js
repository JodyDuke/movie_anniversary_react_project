import React,{ Component } from "react";
import Header from '../header/header';
import CalendarDesktop from "./responsive_components/calendar_desktop";
import CalendarMobile from "./responsive_components/calendar_mobile";
import { config } from '../../api/api_keys';
import { omdb } from '../../api/omdb';
import { movieGlu } from '../../api/movie_glu';

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMonth : null,
            currentYear : null,
            firstDayOfMonth : null,
            hits : []
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

    componentDidMount() {
        fetch(omdb.url + omdb.testId + '&apikey=' + config.OMDB_KEY)
        // fetch(movieGlu.url + 'filmsNowShowing/?n=10', {
        //     headers : {
        //         'client' : config.MOVIEGLU_USER,
        //         'x-api-key' : config.MOVIEGLU_KEY,
        //         'Authorisation' : config.MOVIEGLU_AUTH,
        //         'api-version' : 'v102',
        //         'geolocation': '51.5074;0.1278'
        //     },
        //     method : 'GET'
        // })
            .then(response => response.json())
            .then(data => this.setState({ hits: data }));
        
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
        console.log(this.state.hits)
        return (
            <div className="main">
                <Header handleDateChange={this.handleDateChange} month={this.state.currentMonth} year={this.state.currentYear}/> 
                    {this.props.responsive === 'desktop' ? <CalendarDesktop data={this.state}/> : <CalendarMobile handleDateChange={this.handleDateChange} data={this.state} />}
            </div>
        )
    }
}

export default Main