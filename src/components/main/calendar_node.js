import React,{ Component } from "react";
import { numToMonth } from '../utils/num_to_month';
import { tmdb } from '../../api/tmdb';

const TitleMap = (props) => {
    const titles = props.data
    const listTitles = titles.map((e, k) => <p key={k} className="titles">{e.birthday} - {e.title}</p>)
    return <div>{listTitles}</div>
}

export default class CalendarNode extends Component {
    render() {
         let poster;
        if(this.props.titles !== undefined && this.props.titles.length > 0){
            poster = tmdb.images.secure_base_url + tmdb.images.poster_sizes[5] + this.props.titles[0].poster_path
        }


        return (
            <div className="background-images" style={{backgroundImage: `url(${poster})`}}>
                <div className={this.props.class}>
                    <h4>{this.props.day}</h4>
                    {this.props.titles ? <TitleMap data={this.props.titles} /> : null}
                    <h3>{numToMonth(this.props.month)}</h3>
                    <h3>{this.props.year}</h3>
                </div>
            </div>
        )
    }
}