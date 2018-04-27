import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { tmdb } from '../../api/tmdb';
import { config } from '../../api/api_keys';
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

    componentDidMount() {
        console.log(tmdb.url + tmdb.movie + this.state.currentTitle.id + tmdb.videos + config.TMDB_KEY)
        fetch(tmdb.url + tmdb.movie + this.state.currentTitle.id + tmdb.videos + config.TMDB_KEY, {
            callback: 'test'
        })
        .then(response => response.json())
        .then(data => this.setState({
            videoId : data.results[0].key 
        }))
    }

    closeModal(e){
        e.preventDefault()
        this.props.history.push('/')
    }

    render(){
        let posterImage = tmdb.images.secure_base_url + tmdb.images.backdrop_sizes[2] + this.state.currentTitle.backdrop_path


        return(
            <div className="modal-body" style={{ backgroundImage: `url(${posterImage})` }}>
                <div className="modal">
                    <div className="title-info">
                        <div className="close-bar">
                            <div className="close" onClick={this.closeModal}><XSVG /></div>
                        </div>
                        <div className="video">
                            <iframe title="trailer"
                                src={'https://www.youtube.com/embed/' + this.state.videoId}>
                            </iframe>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Modal)