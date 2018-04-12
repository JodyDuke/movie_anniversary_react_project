import React,{ Component } from 'react';
import Hamburger from '../../../images/burger';
import Logo from '../../../images/logo';

class MenuMobile extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed : true
        }
    }

    render(){
        return (
                <div className="mobile">
                    <div className="logo">
                        <Logo />
                    </div>
                    <div className="hamburger">
                        <Hamburger />
                    </div>
                </div>
        )
    }
}

export default MenuMobile