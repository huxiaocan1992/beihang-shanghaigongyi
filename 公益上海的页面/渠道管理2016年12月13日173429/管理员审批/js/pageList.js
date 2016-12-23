function listing(curr) {
	var channel = GetQueryString("channel");
    var datastr = {
        channel: channel,
        pageSize: 10,
        pageNo: curr || 1
    }
    var ss = $(".input1").val();
    $.ajax({
        url: channel_url+'channelAdmin/queryOrderList',
        timeOut: 1000,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(datastr), 
        error: function(){        	
       	 console.log("错误！");
        }, //错误执行方法
        success:succFunction
    })
    function succFunction(datas) {
        var datalist = datas["data"]["list"];
        tableString(datalist);
        $("#channel span").html(channel);
        var totals = Math.ceil(datas["data"]["total"] / 10);
        laypage({
            cont: 'pages',
            pages: totals,
            curr: curr || 1,
            skin: '#1E9FFF',
            jump: function(obj, first) {
                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                    listing(obj.curr);
                }
            }

        });
    }
}


function ajaxEwm(){
	var orcode = GetQueryString("orcode");
	$('#qrcode').qrcode({
	    width: 64,
	    height: 64,
	    text: orcode
	});
//用户手机号
	var mobile = GetQueryString("mobile");
	var datastr = {keyWords:mobile};
	$.ajax({
    url: channel_url+'channelAdmin/queryList',
    timeOut: 1000,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(datastr),
    error: function(){
    	alert("出错了！");
		},
    success: function(datas){
    	 if (datas.code==0) {
		    	console.log(datas["data"])
		       		$("#user_name").text(datas["data"]["list"][0]["name"]);
		       		var shopType=datas["data"]["list"][0]["shopType"];
		       		if(shopType==10){
		       			$(".xc_character").text("个人");
		    
				        $('.xc_org').hide();
				        $('.xc_team').show();
		
		       		}else{
			       		$(".xc_character").text("团体");
			       		$('.xc_team').hide();
			        	$('.xc_org').show();
		      		}
		      // 	}
		      }else{
		    	alert("出错了！");
		  }
    }
})
}