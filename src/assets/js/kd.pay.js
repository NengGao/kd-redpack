/**
 * Created by Neng.Gao on 2017/1/11.
 */
import common from '@/assets/js/common'
import Api from '@/fetch/api'

export default {
	
	getPayMethod : function(orderType,callback){
		Api.getPayMethod(callback,orderType){
				
		}
    }
}





(function($){


    var pay = {

        getPayMethod : function(orderType,callback){
        
			var token = localStorage.getItem("token");
            $.ajax({
                type: 'get',
                data: {token: token,orderType:orderType},
                dataType: 'json',
                url: '/trade/getPayMethod',
                success: function (data) {
                    if(data.msgCode == 200){
                        callback(data)
                    }else{
                        alert("获取支付方式失败！code："+ data.msgCode);
                    }
                }
            })
        },
        submit: function(payJson,$btn,callback){

			//测试
			//payJson.amount = '0.1';

            var userCode = localStorage.getItem("userCode");
            var token = localStorage.getItem("token");
          	payJson.userCode = userCode;
          	payJson.token = token;
            $.ajax({
                type: 'get',
                data: payJson,
                dataType: 'json',
                url: '/trade/submit',
                success: function(data){
					
					var code = data.msgCode;
                    $btn.attr("disabled",false);
                    if(code == 200){
                        var payResult = data.data;
                        //支付宝
                        if(payJson.payMethod == 'alipay'){
                            pay.toAlipay(payResult,payJson.returnUrl);
                        }
                        //微信App
                        if(payJson.payMethod == 'wxAppPay'){
                        	if(data.official) {
                                //官方微信支付
                                var official = data.official;
                                var weixinPay = data;
                                delete weixinPay.official;
                                delete weixinPay.msgCode;
                                weixinPay.returnCode = 'SUCCESS';
                                pay.toWxPay(JSON.stringify(weixinPay),official);
                            }else {
                                var tokenId = data.tokenId;
                                var appId = data.appId;
                                try {
                                    pay.toWxPay(tokenId,data.official,payJson.returnUrl,appId)
                                }catch (e){
                                    alert("调起微信支付失败");
                                }
                            }
                        }
                        //微信扫码
                        if(payJson.payMethod == 'wxScan'){
                        	
                            if(!AppUpdate()){
                                var url = data.imgUrl;
                                var html = '<div class="wxQrcode" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: #fff;z-index: 200">';
                                    html += '<div class="wxwxQrcodeHead" style="height: 4rem;z-index:101;background: linear-gradient(to right,#ff8c00,#ff5100);line-height: 4rem;text-align: center;color: #fff;font-size: 1.24rem;font-weight: 600"><i class="white_left wxQrcodeClose" style="position: absolute;left: 0;"></i>支付二维码<span class="Payment" style="position: absolute;color: #fff;right: 1rem;line-height: 4rem;font-weight: 300;font-size: 1rem">支付教程</span></div>';
                                    html += '<div class="Qrcode" style="display: block;margin: 0 auto; width: 82%;height:29rem;margin-bottom: 1.5rem">';
                                    html += '<img src="'+ url +'" alt="" style="width: 100%;display: block;margin:0 auto;">';
                                    html += '</div>';
                                    html += '<input type="button" value="保存图片并打开微信" class="saveQrcode" style="width: 82%;height: 3.2rem;font-size:1.2rem;background: #f22435;display: block;margin: 0 auto;border: 0;border-radius: 0.25rem;color: #fff">';
                                    html += '<div class="wxVideoBtn pulse" style="position:fixed;left:2rem;top:5.2rem;width:5rem;height:6rem;background:no-repeat center url(../images/public/wxVideoBtn.png);background-size:100%;"></div>';
                                    html += '<div class="payCourse" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: #fff;z-index: 201;display:none;">';
                                    html += '<div class="payCourseHeader" style="height: 4rem;background: linear-gradient(to right,#ff8c00,#ff5100);line-height: 4rem;color: #fff;font-size: 1.24rem;font-weight: 600"><span style="padding-left: 1.2rem">支付教程</span><i class="white_close payCourseClose" style="top: 0.75rem;right: 0.75rem"></i></div>';
                                    html += '<img src="../images/public/ic_wxqrcode_pay.jpg" style="width: 78%;margin: 1.6rem auto;" alt="">';
                                    html += '<div class="wxVideoBtn pulse" style="position:fixed;left:2rem;top:5.2rem;width:5rem;height:6rem;background:no-repeat center url(../images/public/wxVideoBtn.png);background-size:100%;"></div>';
                                    html += '</div>';
                                    html += '<video class="wxVideo hide" controls="controls" id="wxVideo" style="position: absolute;top:4rem;right:0;z-index: 999" width="100%"><source src="http://114.215.24.220:9003/wx002.mp4" type="video/mp4"/></video>'
                                    html += '</div>';
                                $("body").append(html);
                            }
                        }
                    }else if(code=='502'){
                        dialog.gray("安全登录超时",1500);
                    }else if(code=='500'){
                        dialog.gray("服务器异常，请求失败",1500)
                    }
                    callback(data);
                }
            })
        },

        /*************** 调起 微信 支付 *****************/
        toWxPay :function(wxJson,code,weixinUrl,fid) {
            if(!AppUpdate()){
                var u = navigator.userAgent;
                if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                    if(code){
                        window.ncp.toWxPay(wxJson);
                    }else {
                        window.ncp.weifutongPay(wxJson,weixinUrl,fid);
                    }
                } else if (u.indexOf('iPhone') > -1) {
                    var iosUrl = "url:toWxPay:" + wxJson;
                    document.location = iosUrl;   
                }
            }
        },
        /*************** 调起 支付宝 支付 *****************/
        toAlipay : function(data,returnUrl){

            var u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
                window.ncp.retureurl(returnUrl);
            }
            $("body").append(data);
            document.forms['alipaysubmit'].submit();
        }
    }
    window.pay = pay;

})(jQuery);