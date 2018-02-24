import React, {Component} from 'react';

const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Header extends Component {

    render() {
        return (
            <div className="calendar__header">
                <button className="calendar__nav_prev"
                        onClick={this.props.onPrev.bind(this)}/>
                <div className="calendar__title">{monthNamesFull[this.props.month]}</div>
                <button className="calendar__nav_next"
                        onClick={this.props.onNext.bind(this)}/>
            </div>)
    }
}

export default Header;