
import './LessionCalendarView.css';

import React from 'react';
import ReactDOM from 'react-dom';
import LessionCalendar from './LessionCalendar.jsx';
import SamHttpClient from "./SamHttpClient.js"


const LessionCalendarView = React.createClass({

    loadLessonTablecallback(result, status){

        let back = JSON.parse(result);
        if(back.session)  //正常session
        {
           console.log("loadlessontable result:" + result);
            this.setState(
                {
                    lessonlistFromServer: back.data
                }
            );
        }
    },


    /**
     * 初始状态
     * @returns {{tags: number[]}}
     */
    getInitialState() {

        this.joinClassroomcallback = this.joinClassroomcallback.bind(this);

        this.loadLessonTablecallback = this.loadLessonTablecallback.bind(this);
        let {loginSessionToken} = this.props;
        SamHttpClient.loadLessonTable(loginSessionToken,this.loadLessonTablecallback);


        return {
            tags : [5, 21]
        }
    },

    /**
     * 选择日期
     * @param year
     * @param month
     * @param day
     */
    selectDate(year, month, day) {
        console.log("选择时间为：" + year + '年' + month + '月' + day + '日' );
        let month1 =month;
        if(month<10) month1 = "0" + month;

        let day1 = day;
        if(day<10) day1 = "0" + day;

        let aa = year + "-" + month1 + "-" + day1;
        this.setState(
            {
                selectedDate: aa
            });
    },

    
    onClickShangKe(lessonid,e){

        let action =1;  //上课
        let {loginSessionToken} = this.props;

        SamHttpClient.joinClassroom(loginSessionToken, lessonid, action, this.joinClassroomcallback);

    },

    joinClassroomcallback(result,status){


        let back = JSON.parse(result);

        console.log("joinclass back:"+ result);
        if(back.session)  //正常session
        {
            skillroom.joinRoom(back.eclassroom,back.workmodel);
        }

    },



    previousMonth(year, month) {
        console.log("当前日期为：" + year + '年' + month + '月');
        this.setState({tags : [7, 11]});
    },

    
    nextMonth(year, month) {
        console.log("当前日期为：" + year + '年' + month + '月');
        this.setState({tags : [8, 23]});
    },

    
    render() {

        let lessonlistFromServer = this.state.lessonlistFromServer;

        let selectDate = this.state.selectedDate;

        let self = this;

        console.log("you selected data:" + selectDate);

        return (
            <div className="lessionviewbody">  
                <LessionCalendar
                    onSelectDate={this.selectDate}
                    onPreviousMonth={this.previousMonth}
                    onNextMonth={this.nextMonth}
                    year="2018"
                    month="6"
                    day="3"
                    tags={this.state.tags} />

                <div className="lessionlistoneday">
                {
                        lessonlistFromServer&&
                            lessonlistFromServer.map(function (onelessoninfo,index) {

                           // if(onelessoninfo.begintime.startwith(selectDate))
                           let dd = onelessoninfo.begintime.substring(0,10);
                           console.log("dd"+ dd + " seleced:" + selectDate );
                           if(dd == selectDate)
                            {
                                let displaylessiontime = onelessoninfo.begintime.substring(11) + " ~ " 
                                + onelessoninfo.endtime.substring(11);
                            return (
                                    <div key={index} className="onelession">
                                            <div className="lessionmeta">
                                                <span>  {onelessoninfo.lessionname}  </span>
                                                <span>  {displaylessiontime}  </span>
                                                <span>  {onelessoninfo.teacheruserfullname}  </span>
                                                <button  onClick={self.onClickShangKe.bind(self,onelessoninfo.lessionid)}>上课 </button>

                                            </div>                              
                                            <div className="lessionsummary">
                                                <span>  {onelessoninfo.summary}  </span>
                                            </div>
                                        </div>
                                    )
                                }
                    })

                }
                    


                </div> 



            </div>
        );
    }
});

export default  LessionCalendarView;

// ReactDOM.render(
//     <LessionCalendarView />,
//     document.getElementById('datePicker')
// );

