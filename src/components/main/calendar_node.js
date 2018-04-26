import React,{ Component } from "react";
import { numToMonth } from '../utils/num_to_month';
import { tmdb } from '../../api/tmdb';
import { Link } from 'react-router-dom';


const TitleMap = (props) => {
    const titles = props.data
    titles.sort((a, b) => b.vote_average - a.vote_average)
    const listTitles = titles.map((e, k) => <p key={k} className="titles">{e.birthday} - {e.title}</p>)
    let moviePlural = listTitles.length > 2 ? 'movies' :  'movie'
    return (
        <div>
            {listTitles[0]}
            {listTitles.length > 1 ? <p style={{ color: 'white', fontSize: '70%' }}>+ {listTitles.length - 1} more {moviePlural}</p> : ''}
        </div>
    )
}

export default class CalendarNode extends Component {

    render() {
         let poster;
        if(this.props.titles !== undefined && this.props.titles.length > 0 && window.innerWidth > 768){
            this.props.titles.sort((a, b) => b.vote_average - a.vote_average)
            poster = tmdb.images.secure_base_url + tmdb.images.poster_sizes[5] + this.props.titles[0].poster_path
        }
        else if (this.props.titles !== undefined && this.props.titles.length > 0 && window.innerWidth <= 768) {
            poster = tmdb.images.secure_base_url + tmdb.images.backdrop_sizes[1] + this.props.titles[0].backdrop_path
        }

        return (
            
            <div className="background-images" style={{backgroundImage: `url(${poster})`}}>
                <Link to={{
                    pathname : '/' + this.props.year + '/' + this.props.month + '/' + this.props.day,
                    modal : true
                    }}>

                <div className={this.props.class}>
                    <h4>{this.props.day}</h4>
                    {this.props.titles ? <TitleMap data={this.props.titles} /> : null}
                </div>
            </Link>
            </div>

        )
    }
}