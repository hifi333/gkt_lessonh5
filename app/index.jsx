'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import LessionCalendarView from './LessionCalendarView.jsx';


export default function loginActivity_callwebviewjs_showLessionCalendarView(loginSessionToken){
  
   console.log("js:loginActivity_callwebviewjs_showLessionCalendarView called...ok with token:" + loginSessionToken);

    ReactDOM.render(<LessionCalendarView loginSessionToken={loginSessionToken} />, document.getElementById('lessionh5'));

}

window.loginActivity_callwebviewjs_showLessionCalendarView = loginActivity_callwebviewjs_showLessionCalendarView;  

console.log("js:LessonH5-webview:loginActivity_callwebviewjs_showLessionCalendarView(): export ok");

