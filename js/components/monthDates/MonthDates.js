import React, {Component} from 'react';

class MonthDates extends Component {

    constructor() {
        super();
        this.state = {
            date: new Date(),
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
            className,
            weekStack = Array.apply(null, {length: 7}).map(Number.call, Number),
            that = this,
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            rows = 5;

        if (startDay === 5 && this.props.daysInMonth === 31 || startDay == 6 && this.props.daysInMonth > 29) {
            rows = 6;
        }

        className = rows === 6 ? 'cell__dates' : 'cell__dates';
        haystack = Array.apply(null, {length: rows}).map(Number.call, Number);
        day = this.props.startDay + 1 - first;
        while (day > 1) {
            day -= 7;
        }
        day -= 1;

        return (
            <div className={className}>
                {
                    haystack.map(function (item, i) {
                        d = day + i * 7;
                        return (<div className="calendar__row" key={i}>
                            {
                                weekStack.map(function (item, i) {
                                    d += 1;
                                    isDate = d > 0 && d <= that.props.daysInMonth;
                                    if (isDate) {
                                        current = new Date(that.props.year, that.props.month, d);
                                        className = current != that.constructor.today ? 'cell cell__date' : 'cell cell__date';
                                        return (<div className={className}
                                                     role="button"
                                                     key={i}> {
                                            d
                                        }
                                        </div>)
                                    }
                                    return (<div className="cell" key={i}></div>)
                                })


                            }
                        </div>);
                    })
                }

            </div>

        )
    }
}

export default MonthDates;
