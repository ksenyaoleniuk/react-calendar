import Calendar from './js/components/calendar/Calendar.js';
import React, {Component} from 'react';

import ReactDOM from "react-dom";

const wrapper = document.getElementById("calendar");
wrapper ? ReactDOM.render(<Calendar/>, wrapper) : false;


