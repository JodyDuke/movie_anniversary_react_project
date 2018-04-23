import React, { Component } from 'react';
import HomeSVG from '../../../images/home';
import PersonSVG from '../../../images/person';
import CogSVG from '../../../images/cog';
import Logo from '../../../images/logo';
import { Link } from 'react-router-dom';


class MenuDesktop extends Component {
    render() {
        return (
            <div className="desktop">
                <div className="logo">
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <div className="icon">
                    <Link to='/'>
                        <HomeSVG />
                    </Link>
                </div>
                <div className="icon">
                    <Link to='/account'>
                        <PersonSVG />
                    </Link>
                </div>
                <div className="footer">
                    <Link to='/settings'>
                        <CogSVG />
                    </Link>
                </div>
            </div>
        )
    }
}

export default MenuDesktop