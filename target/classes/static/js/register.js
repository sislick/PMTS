window.onload=function(){
	 /*文本框校验*/
       $("#tel").blur(function(){
       		checkTel($(this),$("#tel_hid"));
       });
       $("#code_input").blur(function(){
       		checkInput($(this),$("#code_hid"));
       }); 
       $("#tel_code").blur(function(){
       		checkInput($(this),$("#tel_code_hid"));
       });
       $("#password").blur(function(){
       		checkInput($(this),$("#password_hid"));
       		if($(this).val()!=null && $(this).val()!=""){
       			checkPassword($(this),$("#password_hid"));
       		}
       });
       $("#password_re").blur(function(){
       		checkInput($(this),$("#password_re_hid"));
       		checkRePassword();
       });
       
       /*业务功能*/
       $("#register").click(function() {
       		if(checkAll()){
       			var res = verifyCode.validate($("#code_input").val());
				var tel = $("#tel").val();
				var telCode = $("#tel_code").val();
				var password = $("#password").val();
				if (res) { //验证码正确
					var data = "tel=" + tel + "&telCode=" + telCode + "&password=" + password;
					$.ajax({
						type: "post",
						url: "userRegister",
						data: data,
						async: true,
						dataType: "json",
						success: function(json) {
							if (json.state == 200) { //登录成功
								alert("注册成功");
							} else if (json.state == 1116) { //电话号码已经注册过了
								$("#tel_code").val("");
								$("#code_input").val("");
								inputError($("#tel"),$("#tel_hid"),json.message);
							} else if (json.state == 1115) { //手机验证码不正确
								$("#tel_code").val("");
								inputError($("#tel_code"),$("#tel_code_hid"),json.message);
							}
						}
					});
				} else { //验证码错误
					$("#code_input").val("");
					inputError($("#code_input"),$("#code_input_hid"),'验证码不正确 &otimes;');
				}
       		}
       });
       /**
        * 检查所有文本框的校验
        */
       function checkAll(){
       		/*手机号码框校验*/
       		if(!checkTel($("#tel"),$("#tel_hid"))){
       			return false;
       		}
       		/*图形验证码框校验*/
       		if(!checkInput($("#code_input"),$("#code_hid"))){
       			return false;
       		}
       		/*短信验证码框校验*/
       		if(!checkInput($("#tel_code"),$("#tel_code_hid"))){
       			return false;
       		}
       		/*密码框校验*/
       		if(!checkInput($("#password"),$("#password_hid")) || !checkPassword($("#password"),$("#password_hid_i"))){
       			return false;
       		}
       		/*确认密码框校验*/
       		if(!checkInput($("#password_re"),$("#password_re_hid")) || !checkRePassword()){
       			return false;
       		}
       		return true;
       }
       /**
        * 电话号码的校验
        * @param {Object} $telInput 电话号码输入框
        * @param {Object} $telHid	错误提示隐藏框
        */
       function checkTel($telInput,$telHid) {
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test($telInput.val())) {
                inputError($telInput,$telHid,"手机号码格式不正确 &otimes;");
                return false;
            } else {
                inputOk($telInput,$telHid);
                return true;
            }
        }
       /**
        * 密码规则校验
        * @param {Object} $passwordInput
        * @param {Object} $passwordHid
        */
       function checkPassword($passwordInput,$passwordHid){
       		var myreg=/^[a-zA-Z0-9]{8,25}$/;
       		if (!myreg.test($passwordInput.val())) {
                inputError($passwordInput,$passwordHid,'密码不符合规则 &otimes;');
                return false;
            } else {
                inputOk($passwordInput,$passwordHid);
                return true;
            }
       }
       /**
        * 确认密码是否一致
        */
       function checkRePassword(){
       		var text1 = $("#password").val();
       		var text2 = $("#password_re").val();
       		if(text1 == text2 && text2 != ""){
       			inputOk($("#password_re"),$("#password_re_hid_i"));
       			return true;
       		}else{
       			inputError($("#password_re"),$("#password_re_hid"),'密码不一致 &otimes;');
       			return false;
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
