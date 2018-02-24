import React, {Component} from 'react';
import MonthDates from "../monthDates/MonthDates";
import Header from "../header/Header";


class Calendar extends Component {

    constructor() {
        super();
        let date = new Date();
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth(),
            minDate: null,
            firstOfMonth: null,
            daysInMonth: null
        }
    }

    //return First day of the current month and Number of days in month
    calc(year, month) {
        return {
            firstOfMonth: new Date(year, month, 1),
            daysInMonth: new Date(year, month + 1, 0).getDate()
        };
    }


    // change the state of the function calc with new Year and Month
    componentWillMount() {
        this.setState(this.calc(this.state.year, this.state.month));
    }


    //get previous month
    getPrev() {
        let state = {};
        if (this.state.month > 0) {
            state.month = this.state.month - 1;
            state.year = this.state.year;
        } else {
            state.month = 11;
            state.year = this.state.year - 1;
        }
        //copy previous Year and previous Month to the variable "state"
        Object.assign(state, this.calc(state.year, state.month));
        //Change the function state with previous Year and month
        this.setState(state);
    }


    //get next month
    getNext() {
        let state = {};
        if (this.state.month < 11) {
            state.month = this.state.month + 1;
            state.year = this.state.year;
        } else {
            state.month = 0;
            state.year = this.state.year + 1;
        }
        //copy next Year and next Month to the variable "state"
        Object.assign(state, this.calc(state.year, state.month));
        //Change the function state with previous Year and Month
        this.setState(state);
    }


    render() {
        return (
            <div className="calendar">
                <div className="calendar__content">
                    <Header
                            month={this.state.month}
                            year={this.state.year}
                            onPrev={() => {
                                return this.getPrev()
                            }}
                            onNext={() => {
                                return this.getNext()
                            }}>
                    </Header>
                    <MonthDates month={this.state.month}
                                year={this.state.year}
                                daysInMonth={this.state.daysInMonth}
                                firstOfMonth={this.state.firstOfMonth}>
                    </MonthDates>
                </div>
            </div>
        )
    }
}


export default Calendar;
