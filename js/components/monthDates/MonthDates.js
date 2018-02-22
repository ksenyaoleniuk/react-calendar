import React, {Component} from 'react';

class MonthDates extends Component {

    constructor() {
        super();
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            date: new Date().getDate(),
            today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        }
    }

    renderDay(d, daysInMonth) {
        return Array
            .apply(null, {length: 7})
            .map(Number.call, Number)
            .map(function (item, i) {
                d += 1;
                const dayOfMonth = d > 0 && d <= daysInMonth;
                if (dayOfMonth) {
                    return (
                        <div className="cell cell__date"
                             role="button"
                             key={i}> {d} </div>
                    )
                } else {
                    return (
                        <div className="cell" key={i}></div>
                    )
                }
            }
        )
    }

    renderRows(day, rows, daysInMonth) {
        return Array
            .apply(null, {length: rows})
            .map(Number.call, Number)
            .map((item, i) => {
            const d = day + i * 7;
            return (
                <div className="calendar__row" key={i}>
                    {this.renderDay(d, daysInMonth)}</div>
            );
        });
    }


    render() {
        let day,
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            rows = 5;

        const {daysInMonth} = this.props;

        if (startDay === 5 && daysInMonth === 31 || startDay === 6 && daysInMonth > 29) {
            rows = 6;
        }

        day = this.props.startDay + 1 - first;
        while (day > 1) {
            day -= 7;
        }
        day -= 1;


        return (
            <div className="cell__dates">
                {this.renderRows(day, rows, daysInMonth)}
            </div>
        )
    }
}

export default MonthDates;
