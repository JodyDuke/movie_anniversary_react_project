import React,{ Component } from "react";
import { tmdb } from '../../api/tmdb';
import { Link } from 'react-router-dom';
import { weightedRanking } from '../utils/weighted_rank_calc';
import { findMean } from '../utils/mean_vote_calc';


const TitleMap = (props) => {
    const titles = props.data
    //sorting function that uses the IMDB algorithm for finding the mean vote for each title and ranking accordingly
        titles.sort((a, b) => weightedRanking(b, findMean(titles)) - weightedRanking(a, findMean(titles)))
    const listTitles = titles.map((e, k) => {
        return <div className="title-info" key={k}>
            <p className="birthday">{e.birthday}</p>
            <p className="title">{e.title}</p>
        </div>
    })
    let moviePlural = listTitles.length > 2 ? 'movies' :  'movie'
    return (
        <div>
            {listTitles[0]}
            {listTitles.length > 1 ? <p className="more-movies">+ {listTitles.length - 1} more {moviePlural}</p> : ''}
        </div>
    )
}

export default class CalendarNode extends Component {

    render() {
         let poster;
         //if on desktop
        if(this.props.titles !== undefined && this.props.titles.length > 0 && window.innerWidth > 768){
            //sorting function that uses the IMDB algorithm for finding the mean vote for each title and ranking accordingly
            this.props.titles.sort((a, b) => weightedRanking(b, findMean(this.props.titles)) - weightedRanking(a, findMean(this.props.titles)))
            poster = tmdb.images.secure_base_url + tmdb.images.poster_sizes[5] + this.props.titles[0].poster_path
        }
        //if on mobile
        else if (this.props.titles !== undefined && this.props.titles.length > 0 && window.innerWidth <= 768) {
            this.props.titles.sort((a, b) => weightedRanking(b, findMean(this.props.titles)) - weightedRanking(a, findMean(this.props.titles)))
            poster = tmdb.images.secure_base_url + tmdb.images.backdrop_sizes[1] + this.props.titles[0].backdrop_path
        }

        return (
            
            <div className="background-images" style={{backgroundImage: `url(${poster})`}}>
                {this.props.titles && this.props.titles.length > 0 ? 
                <Link to={{
                    pathname : '/movies/' + this.props.id
                    }}>
                    <div className={this.props.class}>
                        <h4>{this.props.day}</h4>
                        <TitleMap data={this.props.titles} />
                    </div>
                </Link> 
                
                :

                <div className={this.props.class}>
                    <h4>{this.props.day}</h4>
                </div>

                }

            </div>

        )
    }
}