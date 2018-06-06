import React, {Component} from "react";
import "./LessionView.less";

import SamHttpClient from "./SamHttpClient.js"


export default class LessionView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lessonActionTake: false

        };
        this.loadLessonTablecallback = this.loadLessonTablecallback.bind(this);
        this.joinClassroomcallback = this.joinClassroomcallback.bind(this);


        let {loginSessionToken} = this.props;

        SamHttpClient.loadLessonTable(loginSessionToken,this.loadLessonTablecallback);

    }

    componentDidMount() {



    }

    loadLessonTablecallback(result, status){

        let back = JSON.parse(result);
        

        if(back.session)  //正常session
        {

            console.log(back.data);

            let result={

                'lessionlist':[
                    {
                        lessonid:"alessioid001a",
                        date: "2018-5-8",
                        name:"数学",
                        time: "17:30 ~ 18:30",
                        teacher: "高加盟",
                        status: "open"
                    },
                    {
                        lessonid:"alessioid002a",
                        date: "2018-5-8",
                        name:"数学",
                        time: "17:30 ~ 18:30",
                        teacher: "高加盟",
                        status: "open"
                    },
                    {
                        lessonid:"alessioid003a",
                        date: "2018-5-8",
                        name:"数学",
                        time: "17:30 ~ 18:30",
                        teacher: "高加盟",
                        status: "open"
                    },
                    {
                        lessonid:"alessioid004a",
                        date: "2018-5-8",
                        name:"数学",
                        time: "17:30 ~ 18:30",
                        teacher: "高加盟",
                        status: "open"
                    }
                ]
            };

          

            this.setState(
                {
                    lessonlistFromServer: result
                }
            );




        }


    }



    onClickShangKe(lessonid,e){

        let action =1;
        // SamHttpClient.joinClassroom(lessonid, action, this.joinClassroomcallback);

        console.log("js invoke activity callback: joinroom:" +  lessonid);
        skillroom.joinRoom(lessonid,action);

    }

    onClickbeike(lessonid,e){
        let action =2;
        SamHttpClient.joinClassroom(lessonid, action, this.joinClassroomcallback);
    }

    joinClassroomcallback(result,status){


        let back = JSON.parse(result);

        if(back.session)  //正常session
        {
            global.loginClassName = back.eclassroom;  //must have this value.

            global.workmodel = back.workmodel;


            console.log("join class:" + back.eclassroom + "  And workmodel:" + global.workmodel);
            this.setState(
                {
                    lessonActionTake: true
                }
            );

        }

    }


    render(){


       let lessonlistFromServer = this.state.lessonlistFromServer;

        let dispalydays= [];
        dispalydays.push("昨天");
        dispalydays.push("今天");
        dispalydays.push("明天");
        dispalydays.push("5月8日");
        dispalydays.push("5月9日");
        dispalydays.push("5月10日");
        dispalydays.push("5月11日");
        dispalydays.push("5月12日");
        dispalydays.push("5月13日");
        dispalydays.push("5月14日");


        let self = this;

        return(
            <div className="lessionpage">
                <div className="lessionheader" style={{'fontize':'large'}}>
                    <span> 欢迎张三同学</span>
                    <span style={{color:'blue'}}> 课程表  </span>

                    <span>  逛学堂  </span>
                    <span>  在线选课  </span>
                    <span>  学校后台  </span>

                    <span>  账号设置  </span>
                </div>

                <div className="lessonbody">
                    <div className="pre10"> <img style={{width:40,height:30,'margin-top':'5px'}} src="https://samskillfile-1255972110.cos.ap-shanghai.myqcloud.com/pre10b.png"/>  </div>

                    <div className="lessonlistmain">
            {
                //display one day ...
                dispalydays.map(function (oneday, index) {
                    return ( <div className="lessononeday" key={index}>
                        <div className="onedayheader"><span> {oneday} 周一 </span> <span> 4节课</span></div>
                        <div className="onedaybody" >

                        {
                            //dispaly one lession
                            lessonlistFromServer&&
                            lessonlistFromServer.lessionlist.map(function (onelessoninfo,index) {

                                let huigu = false;
                                if(oneday =="昨天") huigu=true;

                            return (

                                <div className="onelesson" key={index}>
                                    <div className="lessoninfo">
                                        <span>{onelessoninfo.name}</span>
                                        <span>{onelessoninfo.time}</span>
                                        <span>{onelessoninfo.teacher}</span>
                                    </div>
                                    <div className="lessonaciton">
                                        {
                                            !huigu&& (global.loginRole==1)&&
                                            <img onClick={self.onClickbeike.bind(self,onelessoninfo.lessonid)} style={{cursor:'pointer',width: '20px', height: '15px'}}
                                                 src="https://samskillfile-1255972110.cos.ap-shanghai.myqcloud.com/beike.png"/>

                                        }

                                        {
                                            huigu&&
                                            <img style={{cursor:'pointer',width: '20px', height: '15px'}}
                                                 src="https://samskillfile-1255972110.cos.ap-shanghai.myqcloud.com/huigu.png"/>
                                        }


                                        {
                                            !huigu&&(global.loginRole==1 || global.loginRole==0)&&
                                            <img  onClick={self.onClickShangKe.bind(self,onelessoninfo.lessonid)}  style={{cursor:'pointer',width: '20px', height: '15px'}}
                                              src="https://samskillfile-1255972110.cos.ap-shanghai.myqcloud.com/shangke.png"/>
                                        }

                                        <button  onClick={self.onClickShangKe.bind(self,onelessoninfo.lessonid)}>上课 </button>
                                    </div>
                            </div>)

                            })

                        }
                        </div>
                    </div>
                    )
                })


            }


        </div>
                    <div className="pre10"> <img style={{width:40,height:30,'margin-top':'5px'}} src="https://samskillfile-1255972110.cos.ap-shanghai.myqcloud.com/next10b.png"/>  </div>

                </div>
            </div>
        )
       

    }   
}