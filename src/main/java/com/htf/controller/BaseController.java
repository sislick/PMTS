package com.htf.controller;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.htf.pojo.ResponseResult;
import com.htf.service.ex.PasswordNotMatch;
import com.htf.service.ex.ServiceException;
import com.htf.service.ex.TelCodeNotMatchException;
import com.htf.service.ex.TelHasRegisteredException;
import com.htf.service.ex.TelNotRegisterException;
import com.htf.service.ex.UserNameOrTelNotFoundException;

public abstract class BaseController {
	//处理异常的注解
		@ExceptionHandler(ServiceException.class)
		//响应一个json对象
		@ResponseBody
		public ResponseResult handleException(Exception e) {
			//判断异常的类型
			if(e instanceof UserNameOrTelNotFoundException) {
				//用户名或者电话号码不存在的异常
				return new ResponseResult(1104,e);
			}else if(e instanceof PasswordNotMatch) {
				//密码不匹配
				return new ResponseResult(1105,e);
			}else if(e instanceof TelNotRegisterException) {
				//电话号码没有注册
				return new ResponseResult(1114,e);
			}else if(e instanceof TelCodeNotMatchException) {
				//电话验证码不正确
				return new ResponseResult(1115,e);
			}else if(e instanceof TelHasRegisteredException) {
				//电话号码已经注册过了
				return new ResponseResult(1116,e);
			}else {  
				//其他未知异常
				return new ResponseResult(1200,e);
			}    
		}
}
