import React, { Component } from 'react';
import HomeSVG from '../../../images/home';
import PersonSVG from '../../../images/person';
import CogSVG from '../../../images/cog';
import Logo from '../../../images/logo';

class MenuDesktop extends Component {
    render() {
        return (
            <div className="desktop">
                <div className="logo">
                    <Logo />
                </div>
                <div className="icon">
                    <HomeSVG />
                </div>
                <div className="icon">
                    <PersonSVG />
                </div>
                <div className="footer">
                    <CogSVG />
                </div>
            </div>
        )
    }
}

export default MenuDesktop