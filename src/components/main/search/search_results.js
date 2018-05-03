import React,{ Component } from "react";
import { tmdb } from "../../../api/tmdb";
import { config } from "../../../api/api_keys";

export default class SearchResults extends Component {
    constructor(props){
        super(props)
        this.state = {
            query : '',
            page : 1
        }

        this.searchMovies = this.searchMovies.bind(this)
    }

    componentDidMount(){
        this.setState({
            query: this.props.searchQuery
        }, () => this.searchMovies())
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            query: nextProps.searchQuery
        }, () => this.searchMovies())
    }

    searchMovies() {
        fetch(tmdb.url + tmdb.search + config.TMDB_KEY + '&language=en-US&query=' + this.state.query + '&page=' + this.state.page + '&include_adult=false&' + this.props.country, {
            callback: 'test'
        })
        .then(response => response.json())
        .then(data => this.setState({
            searchResults : data
        }))
    }

    render() {
        console.log(this.state.searchResults)
        return (
            <div className="search-results">
            {this.state.searchResults ? this.state.searchResults.results.map((e, k) => {
                    if(e.popularity >= 8){
                        return <ResultNode key={k} movie={e} />
                    }
                    else {
                        return null
                    }
            }) 
            : 
            'Loading...'
        }

            </div>
        )
    }
}

class ResultNode extends Component {
    render(){
        let poster = tmdb.images.secure_base_url + tmdb.images.poster_sizes[1] + this.props.movie.poster_path 
        return (
            <div className="node">
                <div className="poster">
                    <img src={poster} alt={this.props.movie.original_title + ' poster'} />
                </div>
                <div className="info">
                    <h3>{this.props.movie.original_title}</h3>
                </div>
            </div>
        )
    }
}