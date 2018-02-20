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

    render() {
        let haystack,
            day,
            d,
            current,
            isDate,
            renderDates,
            renderRows,
            weekStack = Array.apply(null, {length: 7}).map(Number.call, Number),
            that = this,
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            rows = 5;

        const {daysInMonth} = this.props;

        if (startDay === 5 && daysInMonth === 31 || startDay === 6 && daysInMonth > 29) {
            rows = 6;
        }

        haystack = Array.apply(null, {length: rows}).map(Number.call, Number);
        day = this.props.startDay + 1 - first;
        while (day > 1) {
            day -= 7;
        }
        day -= 1;


        renderDates = (d) => {
            return weekStack.map(function (item, i) {
                d += 1;
                isDate = d > 0 && d <= daysInMonth;
                if (isDate) {
                    current = new Date(that.props.year, that.props.month, d);
                    return (
                        <div className="cell cell__date"
                                 role="button"
                                 key={i}> {d} </div>
                    )
                }
                return (
                    <div className="cell" key={i}></div>)
            })
        };

        renderRows = () => {
            return haystack.map(function (item, i) {
                d = day + i * 7;
                return (<div className="calendar__row" key={i}>
                    {renderDates(d)}
                </div>);
            });
        };

        return (
            <div className="cell__dates">
                {renderRows()}
            </div>
        )
    }
}

export default MonthDates;
