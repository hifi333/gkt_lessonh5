'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import LessionCalendarView from './LessionCalendarView.jsx';


export default function tobeCalledfromLoginActivity(loginSessionToken){
  
    ReactDOM.render(<LessionCalendarView loginSessionToken={loginSessionToken} />, document.getElementById('lessionh5'));

}

window.tobeCalledfromLoginActivity = tobeCalledfromLoginActivity;  

console.log("run here..");

// tobeCalledfromLoginActivity("S1390tempsessiontoken1528209776078");