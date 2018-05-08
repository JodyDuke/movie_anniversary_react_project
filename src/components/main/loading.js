import React,{ Component } from 'react';
import LoadSVG from '../../images/loader';

export default class Loading extends Component {
    render() {
        return (
            <div className="load">
                <LoadSVG />
            </div>
        )
    }
}