import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';
import { tmdb } from '../../../api/tmdb';
import { config } from '../../../api/api_keys'

class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            yearCheckOpts : [5, 10, 20, 25, 30, 40, 50, 60, 80, 100],
            regionSelectData: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleRegionChange = this.handleRegionChange.bind(this)
    }


    componentWillMount() {
        fetch(tmdb.regionSelect + config.TMDB_KEY, {
            'callback': 'test'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    currentYearsChecked: this.props.yearsSelect,
                    currentRegionChecked: this.props.currentRegion,
                    regionSelectData: data
                })
            })
    }

    handleYearChange(e) {
        const val = parseInt(e.target.value, 10)
        let currentYearState = this.state.currentYearsChecked;
        if (currentYearState.indexOf(val) > -1) {
            let pos = currentYearState.indexOf(val)
            currentYearState.splice(pos, 1)
        } else {
            currentYearState.push(val)
        }
        this.setState({
            currentYearsChecked : currentYearState
        })
    }

    handleRegionChange(e){
        e.preventDefault()
        this.setState({
            currentRegionChecked : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSubmit({
            years: this.state.currentYearsChecked,
            country: this.state.currentRegionChecked
        })
        this.props.history.push('/')
    }

    render() { 
        return (
            <div className="settings">
                <div>Settings</div>
                <br />
                <form className="yearSelect">
                    {this.state.yearCheckOpts.map((e, k) => {
                        return (
                            <label key={k} className="checkbox">
                                <input type="checkbox" value={e} onChange={this.handleYearChange} checked={this.props.yearsSelect.indexOf(e) > -1} />
                                {e} Years
                            </label>
                        )
                    })} 
                </form>
                <form className='regionSelect'>
                    <select name="region" value={this.state.currentRegionChecked} onChange={this.handleRegionChange}>
                        {this.state.regionSelectData.map((e, k) => {
                            return <option key={k} value={e.iso_3166_1}>{e.english_name}</option>
                        })}
                    </select>
                </form>
                <input type="submit" onClick={this.handleSubmit} value="Save and close" />
            </div>
        )
    }
}

export default withRouter(Settings)