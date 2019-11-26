window.onload=function(){
	 /*文本框验证1*/
       $("#user").blur(function(){
       		checkInput($("#user"),$("#user_hid"));
       });
       $("#password").blur(function(){
       		checkInput($("#password"),$("#password_hid"));
       }); 
       $("#code_input").blur(function(){
       		checkInput($("#code_input"),$("#code_hid"));
       });
       /*文本框验证2*/
      $("#tel").blur(function(){
       		if(checkInput($("#tel"),$("#tel_hid"))){
       			if(isPoneAvailable($("#tel"))){
       				inputOk($("#tel"),$("#tel_hid"));
       			}else{
       				inputError($("#tel"),$("#tel_hid"),'手机号码格式不正确 &otimes;');
       			}
       		}
       });
       $("#code_input_i").blur(function(){
       		checkInput($("#code_input_i"),$("#code_hid_i"));
       });
       $("#tel_code").blur(function(){
       		checkInput($("#tel_code"),$("#tel_code_hid"));
       });
       /*用户名登录*/
       $("#login").click(function() {
			if(!checkInput($("#user"),$("#user_hid"))){
       			$("#password").val("");
       			$("#password").removeClass("text_ok");
       			return false;
			}
			if(!checkInput($("#password"),$("#password_hid"))){
				return false;
			}
			if(!checkInput($("#code_input"),$("#code_hid"))){
				return false;
			}
			
			var res = verifyCode.validate($("#code_input").val());
			var name = $("#user").val();
			var password = $("#password").val();
			if (res) { //验证码正确
				var data = "name=" + name + "&password=" + password;
				$.ajax({
					type: "post",
					url: "userLogin",
					data: data,
					async: true,
					dataType: "json",
					success: function(json) {
						if (json.state == 200) { //登录成功
							window.location.href = '/';
						} else if (json.state == 1104) { //用户名或者电话号码不存在
							$("#password").val("");
							$("#password").removeClass("text_ok");
							$("#code_input").val("");
							$("#code_input").removeClass("text_ok");
							verifyCode.refresh();
							inputError($("#user"),$("#user_hid"),json.message+'&otimes;');
						} else if (json.state == 1105) { //密码不匹配
							$("#password").val("");
							$("#code_input").val("");
							$("#code_input").removeClass("text_ok");
							verifyCode.refresh();
							inputError($("#password"),$("#password_hid"),json.message+'&otimes;');
						}
					}
				});
			} else { //验证码错误
				$("#code_input").val("");
				verifyCode.refresh();
				inputError($("#code_input"),$("#code_hid"),'验证码错误&otimes;');
			}
       });
       /*手机号码登录*/
       $("#login_i").click(function() {
			var code_input_i = $("#code_input_i").val();
			var tel_code = $("#tel_code").val();
			if(!checkInput($("#tel"),$("#tel_hid"))){
       			$("#tel_code").val("");
       			$("#tel_code").removeClass("text_ok");
       			return false;
			}
			if(!isPoneAvailable($("#tel"))){
       			$("#code_input_i").val("");
       			$("#tel_code").val("");
       			$("#code_input_i").removeClass("text_ok");
       			$("#tel_code").removeClass("text_ok");
       			inputError($("#tel"),$("#tel_hid"),'手机号码不符合规则&otimes;');
			}
			if(!checkInput($("#code_input_i"),$("#code_hid_i"))){
       			return false;
			}
			if(!checkInput($("#tel_code"),$("#tel_code_hid"))){
       			return false;
			}
			var res = verifyCode_i.validate($("#code_input_i").val());
			var tel = $("#tel").val();
			var telCode = $("#tel_code").val();
			if (tel == "" || telCode == "") {
				$("#code_input_i").val("");
				$("#code_input_i").removeClass("text_ok");
				return;
			}
			if (res) { //验证码正确
				var data = "tel=" + tel + "&telCode=" + telCode;
				$.ajax({
					type: "post",
					url: "telLogin",
					data: data,
					async: true,
					dataType: "json",
					success: function(json) {
						if (json.state == 200) { //登录成功
							alert("登录成功");
						} else if (json.state == 1114) { //电话号码未注册
							$("#tel_code").val("");
							$("#tel_code").removeClass("text_ok");
							$("#code_input_i").val("");
							$("#code_input_i").removeClass("text_ok");
							verifyCode_i.refresh();
							inputError($("#tel"),$("#tel_hid"),'电话号码未注册&otimes;');
						} else if (json.state == 1115) { //手机验证码不正确
							$("#tel_code").val("");
							$("#tel_code").removeClass("text_ok");
							$("#code_input_i").val("");
							$("#code_input_i").removeClass("text_ok");
							verifyCode_i.refresh();
							inputError($("#tel_code"),$("#tel_code_hid"),'手机验证码不正确&otimes;');
						}
					}
				});
			} else { //验证码错误
				$("#code_input").val("");
				verifyCode_i.refresh();
				inputError($("#code_input_i"),$("#code_hid_i"),'验证码错误&otimes;');
			}
       });
       /*用户名登录界面*/
       $("#name_login").click(function(){
       		var myform = $('#myform')[0].reset();
       		$(":input").removeClass("text_ok");
       		$(":input").removeClass("text_error");
       		$("span.span_hidden").html("");
       		verifyCode.refresh();
       		if($("#main_name_login").css("display") == "none"){
       			$("#main_name_login").css("display","block");
       			$("#main_tel_login").css("display","none");
       		}
       		$("#name_login").removeClass("hid_line");
       		$("#tel_login").addClass("hid_line");
       });
       /*手机号码登录页面*/
       $("#tel_login").click(function(){
       		var myform = $('#myform')[0].reset();
       		$(":input").removeClass("text_ok");
       		$(":input").removeClass("text_error");
       		$("span.span_hidden").html("");
       		verifyCode_i.refresh();
       		if($("#main_tel_login").css("display") == "none"){
       			$("#main_tel_login").css("display","block");
       			$("#main_name_login").css("display","none");
       		}
       		$("#tel_login").removeClass("hid_line");
       		$("#name_login").addClass("hid_line");
       });
       function isPoneAvailable($poneInput) {
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test($poneInput.val())) {
                return false;
            } else {
                return true;
            }
        }
       
       /**
        * 校验文本框是否为空
        * @param {Object} $input	需要校验的文本框
        * @param {Object} $inputHid	错误提示隐藏框
        */
       function checkInput($input,$inputHid){//true,非空，no，空
       		var text_value = $input.val();
       		if(text_value != null && text_value !=""){
       			inputOk($input,$inputHid);
       			return true;
       		}else{
       			inputError($input,$inputHid,'不能为空&otimes;');
       			return false;
       		}
       }
       /**
        * 文本框信息正确
        * @param {Object} $input
        * @param {Object} $inputHid
        */
       function inputOk($input,$inputHid){
       		$input.addClass("text_ok");
       		$input.removeClass("text_error");
       		$input.removeClass("text");
       		$inputHid.css("display","none");
       }
       /**
        * 文本框信息错误
        * @param {Object} $input
        * @param {Object} $inputHid
        */
       function inputError($input,$inputHid,message){
       		$input.addClass("text_error");
       		$input.removeClass("text_ok");
       		$input.removeClass("text");
       		$inputHid.html(message);
       		$inputHid.css("display","inline-block");
       }
}
