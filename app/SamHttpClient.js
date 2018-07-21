import $ from 'jquery';


class SamHttpClient {


    getServerIP(){
        var curWwwPath=window.document.location.href; //获取当前网址，如： http://baudu.com:8080/hello/index.jsp
        console.log(curWwwPath);

        var tempstr=curWwwPath.substring(curWwwPath.indexOf("//")+2,curWwwPath.length-1);
        var serverip = tempstr.substring(0,tempstr.indexOf(":"));


        // serverip = "192.168.43.110";

        return serverip;
    }



    loadLessonTable(loginSessionToken,callback){


        let serverip = this.getServerIP();

        let meta={
	token:loginSessionToken
        };

        $.ajax(
            {
                type:'POST',
                url : 'http://122.152.210.96/loadlessontable',
                contentType: "application/json",
                data: JSON.stringify(meta),  //还是POST String
                success  :callback,
                error : function(result, status) {
                    console.log("loadLessonTable:" +JSON.stringify(result) +  status);
                }
            }
        );

    }





    joinClassroom(loginSessionToken,targetClassroom,action,callback){


        let serverip = this.getServerIP();

        let meta={
	    token:loginSessionToken,
            roomid: targetClassroom,
            roomaction: action
        };

        $.ajax(
            {
                type:'POST',
                url : 'http://122.152.210.96/joinclassroom',
                contentType: "application/json",
                data: JSON.stringify(meta),  //还是POST String
                success  :callback,
                error : function(result, status) {
                    console.log("joinClassroom:" +JSON.stringify(result) +  status);
                }
            }
        );

    }


}


export default new SamHttpClient();
