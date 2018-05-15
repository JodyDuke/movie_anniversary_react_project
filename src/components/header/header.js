import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { numToMonth } from '../utils/num_to_month';
import ChevronLeft from '../../images/chevron_left';
import ChevronRight from "../../images/chevron_right";
import CalendarSVG from '../../images/calendar';
import SearchBar from './search_bar';
import XSVG from '../../images/x';

export default class Header extends Component {
    constructor(props){
        super(props);
        
        this.handleClick = this.handleClick.bind(this)
        this.search = this.search.bind(this)
    }

    handleClick = (data) => {
        this.props.handleDateChange(data)
    }

    search(props){
        this.props.searchQuery(props)
    }

    render() {
        return (
            <div className="header">
                <SearchBar search={this.search} />

                {window.location.pathname === '/search' ? 
                    <div className="search-close">
                        <Link to="/">
                            <XSVG />
                        </Link>
                    </div>
                : 
                  
                this.props.responsive === "desktop" ?   
                    <div className="date-input">
                        <div className="month">
                            <button onClick={() => this.handleClick('monthDown')}><ChevronLeft/></button><span className="text">{numToMonth(this.props.month)}</span><button onClick={() => this.handleClick('monthUp')}><ChevronRight/></button>
                        </div>

                        <div className="year">
                            <button onClick={() => this.handleClick('yearDown')}><ChevronLeft /></button>{this.props.year}<button onClick={() => this.handleClick('yearUp')}><ChevronRight /></button>
                        </div>
                    </div>

                    :
                    
                    <HeaderMobile />
                
                }

            </div>
        )
    }
}

class HeaderMobile extends Component {
    render(){
        return (
            <div className="date-select-icon">
                <CalendarSVG />
            </div>
        )
    }
}

