import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { tmdb } from '../../api/tmdb';
import { config } from '../../api/api_keys';
import XSVG from '../../images/x';
import { numToMonth } from '../utils/num_to_month';
import LinkSVG from '../../images/link';
import { numberWithCommas } from '../utils/num_with_commas';
import profile from '../../images/profile.png';
import { convertLanguage } from '../utils/languange_converter';


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
                    })
                }
            }
        }
    }

    componentDidMount() {
        const url = [
            tmdb.url + tmdb.movie + this.state.currentTitle.id + tmdb.videos + config.TMDB_KEY,
            tmdb.url + tmdb.movie + this.state.currentTitle.id + tmdb.credits + config.TMDB_KEY,
            tmdb.url + tmdb.movie + this.state.currentTitle.id + '?' + config.TMDB_KEY,
            tmdb.url + tmdb.languages + config.TMDB_KEY
        ];
        Promise.all(
            url.map(e => {
                return fetch(e, {
                    callback: 'test'
                })
                .then(response => response.json())
            })
        )
        .then(data => {
            let video;
            if(data[0].results[0]){
                video = data[0].results[0].key
            }
            const credits = data[1]
 
            this.setState({
                currentTitleCredits: credits,
                currentTitleVideoId: video,
                currentTitleMiscInfo: data[2],
                languages: data[3]
            })}
        )
    }

    changeTitle(e) {
        const newCurrentTitle = this.state.nodeTitles.filter(obj => obj.id === parseInt(e.currentTarget.id, 10))

        const url = [
            tmdb.url + tmdb.movie + newCurrentTitle[0].id + tmdb.videos + config.TMDB_KEY,
            tmdb.url + tmdb.movie + newCurrentTitle[0].id + tmdb.credits + config.TMDB_KEY,
            tmdb.url + tmdb.movie + newCurrentTitle[0].id + '?' + config.TMDB_KEY
        ];

        Promise.all(
            url.map(e => {
                return fetch(e, {
                    callback: 'test'
                })
                    .then(response => response.json())
            })
        )
            .then(data => {
                let video;
                if (data[0].results[0]) {
                    video = data[0].results[0].key
                }

                this.setState({
                    currentTitleCredits: data[1],
                    currentTitleMiscInfo: data[2],
                    currentTitleVideoId: video,
                    currentTitle: newCurrentTitle[0]
                    
                })
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
        console.log(this.state.currentTitle)
        let language;
        if(this.state.languages){
            language = convertLanguage(this.state.currentTitle.original_language, this.state.languages)
        }
        let director;
        if(this.state.currentTitleCredits !== undefined){
        const temp = this.state.currentTitleCredits.crew.find(e => e.job === 'Director')
        director = temp.name
        }
        
        let posterImage = tmdb.images.secure_base_url + tmdb.images.backdrop_sizes[2] + this.state.currentTitle.backdrop_path
        let currentTitleImage = tmdb.images.secure_base_url + tmdb.images.poster_sizes[1] + this.state.currentTitle.poster_path
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
                            {this.state.currentTitleCredits !== undefined ?
                                    <div className="cast">
                                        <CastComponent data={this.state.currentTitleCredits.cast} />
                                    </div>
                                :
                                null
                            }
                        </div>

                        <div className="current-title-image">
                            <img alt={this.state.currentTitle.title + " poster"} src={currentTitleImage} />
                            {this.state.currentTitleVideoId ? 
                                <div className="trailer-link">
                                    <a target="_blank" href={'https://www.youtube.com/watch?v=' + this.state.currentTitleVideoId}>Trailer </a> 
                                    <LinkSVG />
                                </div>
                            :
                                null
                            }
                            {typeof director === 'string' ? 
                                <div className="director">
                                    <p>Director<br /><span>{director}</span></p>
                                </div>
                            :
                                null
                            }

                            <div className="release-date">
                                <p>Release date<br /><span>release date</span></p>
                            </div>

                            {this.state.currentTitle.original_language ?
                                <div className="language">
                                    <p>Original language<br /><span>{language}</span></p>
                                </div>
                            :
                                null
                            }

                            {this.state.currentTitleMiscInfo !== undefined ? 
                                <div className="budget">
                                    {this.state.currentTitleMiscInfo.budget > 0 ?
                                        <p>Budget<br /><span>${numberWithCommas(this.state.currentTitleMiscInfo.budget)}</span></p>
                                    :
                                        null
                                    }
                                    {this.state.currentTitleMiscInfo.revenue > 0 ?
                                        <p>Revenue<br /><span>${numberWithCommas(this.state.currentTitleMiscInfo.revenue)}</span></p>
                                    :
                                        null
                                    }
                                </div>
                                :
                                ''
                            }
                        </div>
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

class CastComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(prevState){
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render() {
        let currentData;
        let header;
        if(this.state.open){
            currentData = this.props.data.slice(0, 12)
            header = <h3 onClick={this.handleChange}>Cast <span>See less &uarr;</span></h3>  
        }
        else {
            currentData = this.props.data.slice(0, 4)
            header = <h3 onClick={this.handleChange}>Cast <span>See more &rarr;</span></h3>  
        }

        return ( 
            <div>
                {header}   
                {currentData.map((e, k) => {
                    let currentProfileImage = profile
                    if (e.profile_path !== null) {
                        currentProfileImage = tmdb.images.secure_base_url + tmdb.images.poster_sizes[1] + e.profile_path
                    }
                    return <div key={k} className="cast-node">
                        <img src={currentProfileImage} alt={e.name} />
                        <p>{e.name}</p>
                        <p className="character">{e.character}</p>
                    </div>
                })}
            </div>  
        )
    }
}
