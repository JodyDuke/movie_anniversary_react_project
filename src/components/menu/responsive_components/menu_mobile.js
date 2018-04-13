import React,{ Component } from 'react';
import Hamburger from '../../../images/burger';
import Logo from '../../../images/logo';
import CogSVG from '../../../images/cog';
import PersonSVG from '../../../images/person';

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
                        <Logo />
                    </div>
                    <div className="hamburger">
                        <a href="" onClick={this.toggleCollapse}><Hamburger /></a> 
                    </div>
                    {this.state.collapsed ? '' : 
                    <div className="open-menu">
                        <div className="link"><p>Sign up / Your account</p><span className="icon"><PersonSVG /></span></div>
                        <div className="link"><p>Settings</p><span className="icon"><CogSVG /></span></div>
                    </div>
                    }
                </div>
        )
    }
}

export default MenuMobile