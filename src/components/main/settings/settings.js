import React,{ Component } from 'react';

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            yearCheckOpts : [5, 10, 20, 25, 30, 40, 50, 60, 80, 100]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

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
                                <input type="checkbox" value={e} checked={this.props.yearsSelect.indexOf(e) > -1} />
                                {e} Years
                            </label>
                        )
                    })}    
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}