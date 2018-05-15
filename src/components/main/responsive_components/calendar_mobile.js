import React, { Component } from "react";
import CalendarNodeHeader from '../calendar_node_header';

class CalendarMobile extends Component {
    constructor(props){
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }


    handleScroll = (ev) => {
        ev.preventDefault()
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.props.handleChange('monthUp')
        }
    };

    render() {
        return (
            <div className="calendar">
                {this.props.data.map((e, k) => {
                    return (
                        <div key={k}>
                            <CalendarNodeHeader class='mobile-month-year' month={e.month} year={e.year} />
                            {e.titles}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CalendarMobile