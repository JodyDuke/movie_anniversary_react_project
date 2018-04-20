import React,{ Component } from "react";
import { numToMonth } from '../utils/num_to_month';



export default class CalendarNode extends Component {

    render() {
        console.log(this.props.titles)

        return (
            <div className={this.props.class}>
                <h4>{this.props.day}</h4>
                <h3>{numToMonth(this.props.month)}</h3>
                <h3>{this.props.year}</h3>
            </div>
        )
    }
}