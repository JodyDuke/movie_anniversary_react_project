import React,{ Component } from "react";
import { numToMonth } from '../utils/num_to_month';

const TitleMap = (props) => {
    const titles = props.data
    const listTitles = titles.map((e, k) => <p key={k} className="titles">{e.birthday} - {e.title}</p>)
    return <div>{listTitles}</div>
}

export default class CalendarNode extends Component {
    render() {
        return (
            <div className={this.props.class}>
                <h4>{this.props.day}</h4>
                {this.props.titles ? <TitleMap data={this.props.titles} /> : null}
                <h3>{numToMonth(this.props.month)}</h3>
                <h3>{this.props.year}</h3>
            </div>
        )
    }
}