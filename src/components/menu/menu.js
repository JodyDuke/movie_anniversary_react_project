import React, { Component } from 'react';
import MenuMobile from './responsive_components/menu_mobile';
import MenuDesktop from './responsive_components/menu_desktop';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                {this.props.responsive === 'mobile' ? <MenuMobile /> : <MenuDesktop />}
            </div>
        )
    }
}

export default Menu