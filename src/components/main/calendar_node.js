import React,{ Component } from "react";

export default class CalendarNode extends Component {
    render() {
        return (
            <div className={this.props.class}>
                <h4>{this.props.day}</h4>
            </div>
        )
    }
}