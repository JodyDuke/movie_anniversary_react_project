import React,{ Component } from 'react';
import Hamburger from '../../../images/burger';
import Logo from '../../../images/logo';
import CogSVG from '../../../images/cog';
import PersonSVG from '../../../images/person';
import { Link } from 'react-router-dom';

class MenuMobile extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed : true
        }
        this.toggleCollapse = this.toggleCollapse.bind(this)
    }

    toggleCollapse(e) {
        e.preventDefault()
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    }

    render(){
        return (
                <div className={this.state.collapsed ? 'mobile' : 'mobile open'}>
                    <div className="logo">
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>
                    <div className="hamburger">
                        <a href="" onClick={this.toggleCollapse}><Hamburger /></a> 
                    </div>
                    {this.state.collapsed ? null : 
                    <div className="open-menu">
                        <div className="link">
                            <Link to='/account'>
                                <p>Sign up / Your account</p>
                                <span className="icon">
                                    <PersonSVG />
                                </span>
                            </Link>
                        </div>
                        <div className="link">
                            <Link to='/settings'>
                                <p>Settings</p>
                                <span className="icon">
                                    <CogSVG />
                                </span>
                            </Link>
                        </div>
                    </div>
                    }
                </div>
        )
    }
}

export default MenuMobile
