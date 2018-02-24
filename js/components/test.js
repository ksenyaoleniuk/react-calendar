import React, {Component} from 'react';
import ReactDOM from "react-dom";

class Test extends Component {
    constructor() {

        super();
        this.state = {
            numberOfDates: 30,

        }}

    renderRows(){
        

}
    renderDays(day){
        return(
        <div>day</div>)
    }

    render() {
        return (

            )
    }
}


const wrapper = document.getElementById("test");
wrapper ? ReactDOM.render(<Test/>, wrapper) : false;

