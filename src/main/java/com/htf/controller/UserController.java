package com.htf.controller;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.htf.pojo.ResponseResult;
import com.htf.pojo.User;
import com.htf.service.UserService;
import com.htf.util.SmsService;

@Controller
@RequestMapping("/user")
public class UserController extends BaseController{
	
	@Autowired
	private UserService userService;
	//---------业务请求---------
	
	@PostMapping("/exit")
	@ResponseBody
	public ResponseResult exit(HttpSession session) {
		session.invalidate();
		return new ResponseResult();    
	}
	/**
	 * 发送手机验证码
	 * @param tel   
	 * @param session
	 * @return
	 */
	@PostMapping("/sendCode")
	@ResponseBody
	public ResponseResult sendCode(
			@RequestParam("tel") String tel,
			HttpSession session
			) {
		String myCode = (new Date().getTime()+"");//获得一个时间戳
		myCode=myCode.substring(myCode.length()- 4);//截取最后四位
		session.setAttribute("telCode", myCode);//将手机验证码绑定到session中
		session.setMaxInactiveInterval(5*60);//session失效时间5分钟
		System.out.println("tel="+tel+" myCode="+myCode);
		SmsService.send(tel,myCode);//调用发送手机验证码
		return new ResponseResult();
	}           
	/**
	 * 电话号码登录
	 * @param tel
	 * @param telCode
	 * @param session
	 * @return  
	 */    
	@PostMapping("/telLogin")  
	@ResponseBody
	public ResponseResult telLogin(
			@RequestParam("tel") String tel,
			@RequestParam("telCode") String telCode,
			HttpSession session
			) {       
		String getCode = (String)session.getAttribute("telCode");
		User user = userService.telLogin(tel, telCode, getCode );//手机验证码登录
		System.out.println(user); 
		session.setAttribute("login", user);
		session.setMaxInactiveInterval(10*60);//session失效时间10分钟
		return new ResponseResult();     
	}
	/**
	 * 用户名登录
	 * @param name
	 * @param password
	 * @param session
	 * @return
	 */
	@PostMapping("/userLogin")
	@ResponseBody
	public ResponseResult userLogin( 
				@RequestParam("name") String name,
				@RequestParam("password") String password,
				HttpSession session
			) {
		User user = userService.userLogin(name, password);//用户名或者手机号码登录
		session.setAttribute("login", user);
		session.setMaxInactiveInterval(10*60);//session失效时间10分钟
		return new ResponseResult();
	}
	/**
	 * 用户注册
	 * @param tel
	 * @param telCode
	 * @param password
	 * @param session
	 * @return
	 */
	@PostMapping("/userRegister")
	@ResponseBody               
	public ResponseResult userRegister( 
				@RequestParam("tel") String tel,
				@RequestParam("telCode") String telCode,
				@RequestParam("password") String password,
				HttpSession session
			) {
		String myCode = (String)session.getAttribute("telCode");
		User user = userService.register(tel, password, telCode, myCode);
		System.out.println(user);
		return new ResponseResult();  
	}
	/**
	 * 忘记密码，重新设置密码通过注册的手机号码
	 * @param tel
	 * @param telCode
	 * @param password
	 * @param session
	 * @return
	 */
	@PostMapping("/forget_password_handle")
	@ResponseBody  
	public ResponseResult forgetPassword(
			@RequestParam("tel") String tel,
			@RequestParam("telCode") String telCode,
			@RequestParam("password") String password,
			HttpSession session) {
		String myCode = (String)session.getAttribute("telCode");
		userService.forgetPassword(tel, password, telCode, myCode);
		return new ResponseResult();
	}
	
	//---------显示页面---------
	
	@GetMapping("/login")
	public String showLogin() {
		return "login";
	} 
	
	@GetMapping("/register") 
	public String showRegister() {
		return "register";
	} 
	
	@GetMapping("/forget_password") 
	public String showForgetPassword() {
		return "forget_password";
	}
}
