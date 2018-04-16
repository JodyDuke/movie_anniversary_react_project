import React, { Component } from "react";
import { numToMonth } from '../utils/num_to_month';
import ChevronLeft from '../../images/chevron_left';
import ChevronRight from '../../images/chevron_right';

class Header extends Component {
    constructor(props){
        super(props);
        
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (data) => {
        this.props.handleDateChange(data)
    }

    render() {
        return (
            <div className="header">
                <div className="month">
                    <button onClick={() => this.handleClick('monthDown')}><ChevronLeft/></button>{numToMonth(this.props.month)}<button onClick={() => this.handleClick('monthUp')}><ChevronRight/></button>
                </div>

                <div className="year">
                    <button onClick={() => this.handleClick('yearDown')}><ChevronLeft /></button>{this.props.year}<button onClick={() => this.handleClick('yearUp')}><ChevronRight /></button>
                </div>
            </div>
        )
    }
}

export default Header