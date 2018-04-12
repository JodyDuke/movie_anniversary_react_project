import React, { Component } from 'react';
import Logo from '../../images/logo';
import MenuMobile from './responsive_components/menu_mobile';
import MenuDesktop from './responsive_components/menu_desktop';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
            width: 'desktop',
        }
    }

    updateWidth(){
        if(window.innerWidth <= 768) {
            this.setState({
                width: 'mobile'
            })
        }
        else {
            this.setState({
                width: 'desktop'
            })
        }
    }

    componentDidMount() {
        this.updateWidth();
        window.addEventListener("resize", this.updateWidth.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth.bind(this))
    }

    render() {
        return (
            <div className="menu">
                {this.state.width === 'mobile' ? <MenuMobile /> : <MenuDesktop />}
            </div>
        )
    }
}

export default Menu