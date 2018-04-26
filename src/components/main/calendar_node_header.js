import React, { Component } from "react";
import { numToMonth } from '../utils/num_to_month';

export default class CalendarNodeHeader extends Component {

    render() {
        return (
            <div className={this.props.class}>
                <h3>{numToMonth(this.props.month)}</h3>
                <h3>{this.props.year}</h3>
            </div>
        )
    }
}