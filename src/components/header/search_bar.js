import React,{ Component } from "react";
import SearchSVG from '../../images/search';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchError: false,
            search : ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            search: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        if(this.state.search){
            this.setState({
                searchError: false 
            }, () => {
                this.props.search(this.state.search)
                this.props.history.push('/search')
            })
        }
        else {
            this.setState({
                searchError : true
            })
        }
    }

    render() {
        return (
            <div className={this.state.searchError ? "search error" : "search"}>
                <form onSubmit={this.handleSubmit}>
                <input type="search" placeholder="Search for a movie" value={this.state.search} onChange={this.handleChange}/>
                    <button type='submit'><SearchSVG /></button>
                </form>
            </div>
        )
    }
}

export default withRouter(SearchBar)