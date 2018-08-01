'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import LessionCalendarView from './LessionCalendarView.jsx';


export default function loginActivity_callwebviewjs_showLessionCalendarView(loginSessionToken){
  
   console.log("js:loginActivity_callwebviewjs_showLessionCalendarView called...ok with token:" + loginSessionToken);

    ReactDOM.render(<LessionCalendarView loginSessionToken={loginSessionToken} />, document.getElementById('lessonh5'));

}

window.loginActivity_callwebviewjs_showLessionCalendarView = loginActivity_callwebviewjs_showLessionCalendarView;  

console.log("js:LessonH5-webview:loginActivity_callwebviewjs_showLessionCalendarView(): export ok");

//loginActivity_callwebviewjs_showLessionCalendarView('S1391_tempsessiontoken_1533137222510');
