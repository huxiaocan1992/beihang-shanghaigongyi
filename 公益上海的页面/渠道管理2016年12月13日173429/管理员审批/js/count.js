function userList(datalist){
        var tablebody="";

        for (var i=0;i<datalist.length;i++) {
            var finishData=formatDate(new Date(datalist[i]['finishDate']));

            tablebody+="<tr><td>"+datalist[i]['channel']+"</td><td>"+datalist[i]['orderCode']+"</td><td>"+finishData+"</td><td>"+datalist[i]['phone']+"</td><td>"+datalist[i]['name']+"</td><td></td><td>"+datalist[i]['passportCode']+"</td><td>"+datalist[i]['cardNo']+"</td><td>"+datalist[i]['money']+"</td><td>"+datalist[i]['pingAnOld']+"</td><td>"+datalist[i]['pingAnNew']+"</td></tr>";
            $("#userList").html(tablebody);
        }        
    }
function formatDate(now) {//时间戳转换成时间用-隔开
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date;

}

//二维码
function GetQueryString(orcode) {//截取字符串？ &
    var reg = new RegExp("(^|&)" + orcode + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        
        return unescape(r[2]);
    } else {
        return null;
    }
}