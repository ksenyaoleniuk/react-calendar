import React, {Component} from 'react';

class MonthDates extends Component {
    constructor() {
        super();

    }

    renderDay(d, daysInMonth) {
        let length = 7;
        return Array(length)
            .fill(null)
            .map(function (item, i) {
                    d += 1;
                    if (d > 0 && d <= daysInMonth) { //check if the date is positive and the date exists in the current month
                        return (
                            <div className="cell cell__date"
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

    renderRows(day, daysInMonth) {
        let rows = 5;
        return Array(rows)
            .fill(null)
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
            first = this.props.firstOfMonth.getDay(); //day of week in digits usual (where sunday == 0)

        const {daysInMonth} = this.props;

        day = 1 - first; // 1 - current week day number = the last week Sunday num
        if (day > 0) {
            day -= 7
        }
        return (
            <div className="cell__dates">
                {this.renderRows(day, daysInMonth)}
            </div>
        )
    }
}

export default MonthDates;
