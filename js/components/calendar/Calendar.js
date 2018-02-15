const Calendar = React.createClass({
    //check if it is valid month and year
    //return First day of the current month and Number of days in month
    calc: function (year, month) {
        if (this.state.selectedElement) {
            if (this.state.selectedMonth !== month || this.state.selectedYear !== year) {
                this.state.selectedElement.classList.remove('r-selected');
            } else {
                this.state.selectedElement.classList.add('r-selected');
            }
        }
        console.log("Nice", new Date(year, month, 1));
        return {
            firstOfMonth: new Date(year, month, 1),
            daysInMonth: new Date(year, month + 1, 0).getDate()
        };
    },


    // change the state of the function calc with new Year and Month
    componentWillMount: function () {
        this.setState(this.calc.call(null, this.state.year, this.state.month));
    },


    // ????
    componentDidMount: function () {},
    // if calendar was previously updated (the function checks if it is the same as a current date state)
    componentDidUpdate: function (prevProps, prevState) {
        if (this.props.onSelect && prevState.selectedDt !== this.state.selectedDt) {
            this.props.onSelect.call(this.getDOMNode(), this.state);
        }
    },

    // get current Date
    getInitialState: function () {
        var date = new Date();
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            selectedYear: date.getFullYear(),
            selectedMonth: date.getMonth(),
            selectedDate: date.getDate(),
            selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            startDay: 1,
            weekNumbers: false,
            minDate: this.props.minDate ? this.props.minDate : null,
            disablePast: this.props.disablePast ? this.props.disablePast : false,
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            firstOfMonth: null,
            daysInMonth: null
        };
    },


    //get previous month
    getPrev: function () {
        let state = {};
        if (this.state.month > 0) {
            state.month = this.state.month - 1;
            state.year = this.state.year;
        } else {
            state.month = 11;
            state.year = this.state.year - 1;
        }
        //copy previous Year and previous Month to the variable "state"
        Object.assign(state, this.calc.call(null, state.year, state.month));
        //Change the function state with previous Year and month
        this.setState(state);
    },


    //get next month
    getNext: function () {
        let state = {};
        if (this.state.month < 11) {
            state.month = this.state.month + 1;
            state.year = this.state.year;
        } else {
            state.month = 0;
            state.year = this.state.year + 1;
        }
        //copy next Year and next Month to the variable "state"
        Object.assign(state, this.calc.call(null, state.year, state.month));
        //Change the function state with previous Year and Month
        this.setState(state);
    },

    selectDate: function (year, month, date, element) {
        if (this.state.selectedElement) {
            this.state.selectedElement.classList.remove('r-selected');
        }
        element.target.classList.add('r-selected');
        this.setState({
            selectedYear: year,
            selectedMonth: month,
            selectedDate: date,
            selectedDt: new Date(year, month, date),
            selectedElement: element.target
        });
    },

    //
    render: function () {
        return React.createElement(
            'div',
            { className: 'calendar' },
            React.createElement(
                'div',
                { className: 'calendar_content' },
                React.createElement(Header, { monthNames: this.state.monthNamesFull, month: this.state.month, year: this.state.year, onPrev: this.getPrev, onNext: this.getNext }),
                React.createElement(MonthDates, { month: this.state.month, year: this.state.year, daysInMonth: this.state.daysInMonth, firstOfMonth: this.state.firstOfMonth, startDay: this.state.startDay, onSelect: this.selectDate, weekNumbers: this.state.weekNumbers, disablePast: this.state.disablePast, minDate: this.state.minDate })
            )
        );
    }
});


const Header = React.createClass({
    displayName: 'Header',

    render: function () {
        return React.createElement(
            'div',
            { className: 'calendar__row' },
            React.createElement('div', { className: 'cell arrow__prev', onClick: this.props.onPrev.bind(this), role: 'button', tabIndex: '0' }),
            React.createElement(
                'div',
                { className: 'cell calendar__title' },
                this.props.monthNames[this.props.month],
                // this.props.year
            ),
            React.createElement('div', { className: 'cell arrow__next', onClick: this.props.onNext.bind(this), role: 'button', tabIndex: '0' })
        );
    }
});

var MonthDates = React.createClass({
    displayName: 'MonthDates',

    statics: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    },
    render: function () {
        var haystack,
            day,
            d,
            current,
            onClick,
            isDate,
            className,
            weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
            that = this,
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            janOne = new Date(that.props.year, 0, 1),
            rows = 5;

        if (startDay == 5 && this.props.daysInMonth == 31 || startDay == 6 && this.props.daysInMonth > 29) {
            rows = 6;
        }

        className = rows === 6 ? 'cell__dates' : 'cell__dates';
        haystack = Array.apply(null, { length: rows }).map(Number.call, Number);
        day = this.props.startDay + 1 - first;
        while (day > 1) {
            day -= 7;
        }
        day -= 1;
        return React.createElement(
            'div',
            { className: className },
            haystack.map(function (item, i) {
                d = day + i * 7;
                return React.createElement(
                    'div',
                    { className: 'calendar__row' },
                    (() => {
                        if (that.props.weekNumbers) {
                            var wn = Math.ceil(((new Date(that.props.year, that.props.month, d) - janOne) / 86400000 + janOne.getDay() + 1) / 7);
                            return React.createElement(
                                'div',
                                { className: 'cell' },
                                wn
                            );
                        }
                    })(),
                    weekStack.map(function (item, i) {
                        d += 1;
                        isDate = d > 0 && d <= that.props.daysInMonth;

                        if (isDate) {
                            current = new Date(that.props.year, that.props.month, d);
                            className = current != that.constructor.today ? 'cell cell__date' : 'cell cell__date';
                            if (that.props.disablePast && current < that.constructor.today) {
                                className += ' r-past';
                            } else if (that.props.minDate !== null && current < that.props.minDate) {
                                className += ' r-past';
                            }

                            if (/r-past/.test(className)) {
                                return React.createElement(
                                    'div',
                                    { className: className, role: 'button', tabIndex: '0' },
                                    d
                                );
                            }

                            return React.createElement(
                                'div',
                                { className: className, role: 'button', tabIndex: '0', onClick: that.props.onSelect.bind(that, that.props.year, that.props.month, d) },
                                d
                            );
                        }

                        return React.createElement('div', { className: 'cell' });
                    })
                );
            })
        );
    }
});

ReactDOM.render(React.createElement(Calendar, {
}), document.getElementById("calendar"));