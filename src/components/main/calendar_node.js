import React,{ Component } from "react";

export default class CalendarNode extends Component {
    render() {
        return (
            <div className="calendar-node">
                <h4>{this.props.day}</h4>
            </div>
        )
    }
}