import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <div className="calendar__row">
                <div className="cell arrow__prev"
                     onClick={this.props.onPrev.bind(this)}
                     role="button">
                </div>
                <div className="cell calendar__title">{this.props.monthNames[this.props.month]}</div>
                <div className="cell arrow__next"
                     onClick={this.props.onNext.bind(this)}
                     role="button">
                </div>
            </div>)
    }
}

export default Header;