import React,{ Component } from 'react';

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            yearCheckOpts : [5, 10, 20, 25, 30, 40, 50, 60, 80, 100]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    componentWillMount() {
        this.setState({
            currentYearsChecked : this.props.yearsSelect
        })
    }

    handleChange(e) {
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

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.currentYearsChecked)
    }

    render() { 
        return (
            <div>
                <div>Settings</div>
                <br />
                <form className="yearSelect" onSubmit={this.handleSubmit}>
                    {this.state.yearCheckOpts.map((e, k) => {
                        return (
                            <label key={k} className="checkbox">
                                <input type="checkbox" value={e} onChange={this.handleChange} checked={this.props.yearsSelect.indexOf(e) > -1} />
                                {e} Years
                            </label>
                        )
                    })} 
                    <input type="submit" value="Save" />
                </form>
            </div>
        )
    }
}