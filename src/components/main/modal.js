import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { tmdb } from '../../api/tmdb';
import { config } from '../../api/api_keys';
import XSVG from '../../images/x';
import { numToMonth } from '../utils/num_to_month'


class Modal extends Component {
    constructor(props){
        super(props);

        this.closeModal = this.closeModal.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }

    componentWillMount(){
        const data = this.props.data
        const urlString = window.location.pathname.replace('/movies/', '')
        for(let i = 0 ; i < data.length ; i++){
            let currentMonth = data[i]
            for(let e = 0 ; e < currentMonth.titles.length ; e++){
                if(urlString === currentMonth.titles[e].props.id) {
                    this.setState({
                        date : new Date(urlString),
                        nodeTitles : currentMonth.titles[e].props.titles,
                        currentTitle: currentMonth.titles[e].props.titles[0]
                    }, () => console.log(this.state.nodeTitles))
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

    formatDate(props){
        return props.getDate() + ' ' + numToMonth(props.getMonth()) + ' ' + props.getFullYear()
    }

    render(){
        let posterImage = tmdb.images.secure_base_url + tmdb.images.backdrop_sizes[2] + this.state.currentTitle.backdrop_path
        return(
            <div className="modal-body" style={{ backgroundImage: `url(${posterImage})` }}>
                <div className="modal">
                    <div className={this.state.nodeTitles.length > 1 ? 'info' : 'info-single-title' }>
                        <div className="close-bar">
                            <div className="date"><h2>{this.formatDate(this.state.date)}</h2></div> 
                            <div className="close" onClick={this.closeModal}><XSVG /></div>
                        </div>

                        {this.state.nodeTitles.length > 1 ? <OtherTitles data={this.state} titleChange={this.changeTitle} /> : null}                                            

                        <div className="current-title-info">
                        <h1>{this.state.currentTitle.title}</h1>
                        <h3>{this.state.currentTitle.birthday}<sup>th</sup> Anniversary</h3>
                        <p>{this.state.currentTitle.overview}</p>
                        </div>
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
            <div className="all-titles-sidebar">
                <h3>Other titles</h3>
                {this.props.data.nodeTitles.map((e, k) => {
                    if(e.id !== this.props.data.currentTitle.id){
                        let image = tmdb.images.secure_base_url + tmdb.images.poster_sizes[0] + e.poster_path
                        return <div className="title-sidebar" key={e.id} id={e.id} onClick={(e) => this.props.titleChange(e)}>
                            <img src={image} alt={e.title + 'poster'}/>
                            <h5>{e.birthday}<sup>th</sup> Anniversary</h5>
                        </div>
                    }
                    else return null
                })}
            </div>
        )
    }
}