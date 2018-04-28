import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { tmdb } from '../../api/tmdb';
import { config } from '../../api/api_keys';
import XSVG from '../../images/x';


class Modal extends Component {
    constructor(props){
        super(props);

        this.closeModal = this.closeModal.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
    }

    componentWillMount(){
        const data = this.props.data
        const urlString = window.location.pathname.replace('/movies/', '')
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
        fetch(tmdb.url + tmdb.movie + this.state.currentTitle.id + tmdb.videos + config.TMDB_KEY, {
            callback: 'test'
        })
        .then(response => response.json())
        .then(data => this.setState({
            videoId : data.results[0].key 
        }))
    }

    changeTitle(e) {
        let newCurrentTitle = this.state.nodeTitles.filter(obj => obj.id === parseInt(e.currentTarget.id, 10))
        this.setState({
            currentTitle : newCurrentTitle[0]
        })
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
                        {this.state.nodeTitles.length > 1 ? <OtherTitles data={this.state.nodeTitles} titleChange={this.changeTitle} /> : null}

                        {/* <div className="video">
                            <iframe title="trailer"
                                src={'https://www.youtube.com/embed/' + this.state.videoId}>
                            </iframe>
                        </div> */}

                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(Modal)

class OtherTitles extends Component {
    render(){
        return (
            <div className="multi-title-bar">
                {this.props.data.map((e, k) => {
                    return <div key={e.id} id={e.id} onClick={(e) => this.props.titleChange(e)}>
                        <h5 style={{color: 'white'}}>{e.title}</h5>
                    </div>
                })}
            </div>
        )
    }
}