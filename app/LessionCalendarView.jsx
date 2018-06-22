
import './LessionCalendarView.css';

import React from 'react';
import ReactDOM from 'react-dom';
import LessionCalendar from './LessionCalendar.jsx';
import SamHttpClient from "./SamHttpClient.js"
import H from './CanlendarUtilH.jsx';


const LessionCalendarView = React.createClass({


    componentDidMount() {

        this.joinClassroomcallback = this.joinClassroomcallback.bind(this);

        this.loadLessonTablecallback = this.loadLessonTablecallback.bind(this);
        let {loginSessionToken} = this.props;
        SamHttpClient.loadLessonTable(loginSessionToken,this.loadLessonTablecallback);

    },

    loadLessonTablecallback(result, status){

        let back = result; //JSON.parse(result);
        if(back.session)  //正常session
        {
           console.log("loadlessontable result:" + result);

            let currentyear = H.getFullYear();
            let currentmonth = H.getMonth()+1;
            console.log(currentyear);
            console.log(currentmonth);
            // this.settags(currentyear,currentmonth);    
    
            let newtags =[];
            if(back.data){
                back.data.map(function (onelessoninfo,index) {
    
                    let year1 = onelessoninfo.begintime.substring(0,4); 
                    let month1 = onelessoninfo.begintime.substring(5,7); //2018-09-12
                    let day1 = onelessoninfo.begintime.substring(8,10); //2018-09-12
    
                    if( parseInt(year1,10) == currentyear && parseInt(month1,10) == currentmonth)
                    newtags.push(parseInt(day1,10));
                    
                });
            }

            this.setState(
                {
                    lessonlistFromServer: back.data,
                    tags: newtags
                }
            );


            
   

        }
    },


    /**
     * 初始状态
     * @returns {{tags: number[]}}
     */
    getInitialState() {

        return {
            tags : []
        }
    },

    

    
    onClickShangKe(lessonid,e){

        let action =1;  //上课
        let {loginSessionToken} = this.props;

        SamHttpClient.joinClassroom(loginSessionToken, lessonid, action, this.joinClassroomcallback);

    },

    joinClassroomcallback(result,status){


        let back = result; //JSON.parse(result);

        console.log("joinclass back:"+ result);
        if(back.session)  //正常session
        {

         if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {

            try {
                let para = {
                    eclassroom: back.eclassroom,
                    workmodel: back.workmodel
                };

                window.webkit.messageHandlers.joinRoom.postMessage(para);
                console.log("window.webkit.messageHandlers.joinRoom: done");

             } catch (e){ 
                 console.log("window.webkit.messageHandlers.joinRoom:  error ");  
                }
         }else{

            skillroom.joinRoom(back.eclassroom,back.workmodel);
            console.log("skillroom.joinRoom: done");

         }
        
        
        }

    },


    onSelectDate(year, month, day) {
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

    onPreviousMonth(year, month) {
        console.log("当前日期为：" + year + '年' + month + '月');
        this.settags(year,month);

    },

    
    onNextMonth(year, month) {
        console.log("当前日期为：" + year + '年' + month + '月');
  
        this.settags(year,month);

    },

    settags(year,month){

        let newtags =[];
        // this.setState({tags : [8, 23]});

        if(this.state.lessonlistFromServer){
            this.state.lessonlistFromServer.map(function (onelessoninfo,index) {

                let year1 = onelessoninfo.begintime.substring(0,4); 
                let month1 = onelessoninfo.begintime.substring(5,7); //2018-09-12
                let day1 = onelessoninfo.begintime.substring(8,10); //2018-09-12

                if( parseInt(year1,10) == year && parseInt(month1,10) == month)
                newtags.push(parseInt(day1,10));
                
            });
            this.setState({tags : newtags});
    }
    },
    
    render() {

        let lessonlistFromServer = this.state.lessonlistFromServer;

        let youselectDate = this.state.selectedDate;

        let self = this;

        console.log("you selected data:" + youselectDate);

        return (
            <div className="lessionviewbody">  
                <LessionCalendar
                    onSelectDate={this.onSelectDate}
                    onPreviousMonth={this.onPreviousMonth}
                    onNextMonth={this.onNextMonth}
                    // year="2018"
                    // month="7"
                    // day="3"
                    tags={this.state.tags} />

                <div className="lessionlistoneday">
                {
                        lessonlistFromServer&&
                            lessonlistFromServer.map(function (onelessoninfo,index) {

                           // if(onelessoninfo.begintime.startwith(selectDate))
                           let dd = onelessoninfo.begintime.substring(0,10);
                           if(dd == youselectDate)
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

