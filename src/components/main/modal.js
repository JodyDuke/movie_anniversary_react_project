import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { tmdb } from '../../api/tmdb';
import XSVG from '../../images/x';


class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            nodeTitles : []
        }

        this.closeModal = this.closeModal.bind(this)
    }

    componentWillMount(){
        const data = this.props.data
        const urlString = window.location.pathname.replace('/', '')
        for(let i = 0 ; i < data.length ; i++){
            let currentMonth = data[i]
            for(let e = 0 ; e < currentMonth.titles.length ; e++){
                if(urlString === currentMonth.titles[e].props.id) {
                    this.setState({
                        nodeTitles : currentMonth.titles[e].props.titles,
                        currentTitle: currentMonth.titles[e].props.titles[0]
                    })
                }
            }
        }
    }

    closeModal(e){
        e.preventDefault()
        this.props.history.push('/')
    }

    render(){
        console.log(this.state.currentTitle)
        let posterImage = tmdb.images.secure_base_url + tmdb.images.backdrop_sizes[2] + this.state.currentTitle.backdrop_path


        return(
            <div className="modal-body" style={{ backgroundImage: `url(${posterImage})` }}>
                <div className="modal">
                    <div className="title-info">
                        <div className="close-bar">
                            <div className="close" onClick={this.closeModal}><XSVG /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Modal)