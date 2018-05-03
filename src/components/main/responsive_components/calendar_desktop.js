import React,{ Component } from "react";
import { days } from '../../utils/days';



class CalendarDesktop extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentCalendarView : undefined,
        }
    }

    componentDidMount(){
        if (this.props.data.length > 0) {
            let arrPosition = 0
            for (let i = 0; i < this.props.data.length; i++) {
                if (this.props.month === this.props.data[i].month && this.props.year === this.props.data[i].year) {
                    arrPosition = i
                }
            }
            this.setState({
                currentCalendarView: this.props.data[arrPosition].titles
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.length > 0) {
            let arrPosition = 0
            for(let i = 0 ; i < nextProps.data.length ; i++) {
                if(nextProps.month === nextProps.data[i].month && nextProps.year === nextProps.data[i].year) {
                    arrPosition = i
                }
            }
            this.setState({
                currentCalendarView: nextProps.data[arrPosition].titles
            })
        }
    }

    render() {  
        const daysMap = days.map((item, i) => <div className="days" key={i}>{item}</div>)
        return (
            <div>
                <div className="calendar">
                    {daysMap}
                    {this.state.currentCalendarView ? this.state.currentCalendarView : '...loading'}
                </div>
            </div>
        )
    }
}
    
export default CalendarDesktop