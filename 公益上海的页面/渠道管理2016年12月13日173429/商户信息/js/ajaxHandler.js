//管理员登录时的界面
var compcareData={
	classService:function(v){
		var business="";
		 switch(v){
				case 'A': return business='保险业务';break;
				case 'B':return  business='平安银行';break;
				case 'C':return business='护照申请';break;
				case 'D':return business='护照激活';break;
				case 'E':return business='其他捐赠';break;
				default:
					return business='<select class="form-control team_or_org qd_business">'+
	            		'<option value="A" selected="selected">保险业务</option>'+
						'<option value="B">平安银行</option>'+
						'<option value="C">护照申请</option>'+
						'<option value="D">护照激活</option>'+
						'<option value="E">其他捐赠</option>'+
					'</select>';break;
			}
	},
	shopTypes:function(shopType){
		var st="";
		if(shopType=="10"){
			return	st="个人";
			}else if(shopType=="20"){
			return	st="团体";
			}else{
			return	st='<select class="form-control team_or_org qd_shopType">'+
                            		'<option value="10" selected="selected">个人（个税）</option>'+
									'<option value="20">团体（发票）</option>'+								
								'</select>'
			}
	}
	
}

function tableString(datalist){
	var tablebody="";
	
	for(var i=0;i<datalist.length;i++){
		 var shopType="",isapproval="";
		//商户类型

		//判断有没有批准
		if(datalist[i]["approval"]==10){//审批
			isapproval+="<button type='button' data-id="+datalist[i]["id"]+" class='approlist_mmczhi_item common_btn_item btn btn-primary btn-sm' onclick='ajaxPassword("+datalist[i]['id']+","+datalist[i]['mobile']+")'>密码重置</button> ";
			if(datalist[i]["frozen"]==10){//
				isapproval+="<button onclick='ajaxFrozen("+datalist[i]['id']+","+datalist[i]['frozen']+")'  type='button' class='approlist_jiedon_item common_btn_item btn btn-info btn-sm'>解冻</button> ";	
			}else{
				isapproval+="<button onclick='ajaxFrozen("+datalist[i]['id']+","+datalist[i]['frozen']+")'  type='button' class='approlist_donjie_item common_btn_item btn btn-danger btn-sm'>冻结</button> ";
			}
		}else{
			isapproval+="<button onclick='ajaxApproval("+datalist[i]['id']+")' type='button' class='approlist_shenpi_item common_btn_item btn btn-primary btn-sm'>审批</button> ";
			
		}
		
		tablebody+="<tr data-id="+datalist[i]["id"]+">";
		tablebody+="<td><a target='_blank' href='../商户信息/mobile.html?mobile="+datalist[i]["mobile"]+"'>"+datalist[i]["mobile"]+"</a></td><td>"+datalist[i]["name"]+"</td>"+
		"</td><td class='' data-business="+datalist[i]["business"]+">"+compcareData.classService(datalist[i]["business"])+"</td>"+
		"</td><td class='' data-shopType="+datalist[i]["shopType"]+">"+compcareData.shopTypes(datalist[i]["shopType"])+"</td>"+
		"</td><td>"+formatDate(new Date(datalist[i]["createTime"]))+"</td>"+
		"</td><td>"+datalist[i]["businessCode"]+"</td>"
		tablebody+="<td>"+isapproval+"</td>"
		
		tablebody+="</tr>"
	}
	$("#tbody").html(tablebody);
}


//点击审批按钮

function ajaxApproval(ids){
	var business=$(".table_cont tr[data-id="+ids+"]").find(".qd_business").val();
	var shopType=$(".table_cont tr[data-id="+ids+"]").find(".qd_shopType").val();
//	alert(ids)
//
//	alert(business);
//	alert(shopType);
	var datastr={
		"id":ids,
		"shopType":shopType,
		"business":business,
		"approval":10
	};
	$.ajax({
			 type: "post",
             url: channel_url+"channelAdmin/approve",
             dataType: "json",
           	 data:JSON.stringify(datastr),
           	 contentType: 'application/json; charset=utf-8',
             success:function(datas){
             	if (datas["code"]==0) {
             	//console.log(datas["data"]["list"][0]["name"]);
             	alert("审批成功");
             	window.location.reload();
             }else{
             	alert("审批失败");
             }
             },
             error:function(){
             	
             }
		})
}

function ajaxFrozen(ids,frozen){
	
	var datastr={
		"id":ids,
		"frozen":frozen==10?-10:10,
	}
	$.ajax({
			 type: "post",
             url: channel_url+"channelAdmin/froze",
             dataType: "json",
           	 data:JSON.stringify(datastr),
           	 contentType: 'application/json; charset=utf-8',
             success:function(datas){
             	//alert("密码重置成功 新的密码是"+frozen);
             	ajaxInit();
             },
             error:function(){
             	
             }
		})
}


//重置密码
function ajaxPassword(ids,password){		
  		var passwords=password.toString().substr(5,6);
  		var datastr={
			"id":ids,
			"passWord":passwords
		};
	$.ajax({
			 type: "post",
             url: channel_url+"channelAdmin/resetPassword",
             dataType: "json",
           	 data:JSON.stringify(datastr),
           	 contentType: 'application/json; charset=utf-8',
             success:function(datas){
             	alert("密码重置成功 新的密码是"+passwords);
             	ajaxInit();
             },
             error:function(){
             	
             }
		})
}


//新增
//渠道用户添加
$("#apply").click(function(){
    apply();
    
})
function apply(){
     var datastr = {
        mobile: $("#update_ID").val(),
        name: $("#update_name").val()
    }
    $.ajax({

        url: channel_url+'channelAdmin/create',
        timeOut: 1000,
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(datastr),
        contentType: 'application/json; charset=utf-8',
        beforeSend: LoadFunction, //加载执行方法    
        error: erryFunction, //错误执行方法    
        success: succFunction //成功执行方法    
    })

    function LoadFunction() {

    }

    function erryFunction() {
        alert("提交失败！");
    }
    function succFunction(dates) {
        if (dates.code == 0) {
            alert("提交成功！");
            ajaxInit();
            $("#update_ID").val("");
       		$("#update_name").val("");
        } else {
            alert("提交失败！");
        }
    }
}

