import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <div className="calendar__header">
                <div className="calendar__nav_prev"
                     onClick={this.props.onPrev.bind(this)}
                     role="button">
                </div>
                <div className="calendar__title">{this.props.monthNames[this.props.month]}</div>
                <div className="calendar__nav_next"
                     onClick={this.props.onNext.bind(this)}
                     role="button">
                </div>
            </div>)
    }
}

export default Header;