package com.htf.service;

import com.htf.pojo.User;

public interface UserService {
	
	/**
	 * 忘记密码
	 * @param tel
	 * @param password
	 * @param telCode
	 * @param myCode
	 * @return
	 */
	User forgetPassword(String tel, String password, String telCode,String myCode);
	/**
	 * 注册
	 * @param tel
	 * @param password
	 * @param telCode
	 * @param myCode
	 * @return
	 */
	User register(String tel, String password, String telCode,String myCode);
	/**
	 * 通过手机名登录
	 * @param tel
	 * @param telCode
	 * @param getCode	session中获取到的telCode
	 * @return
	 */
	User telLogin(String tel,String telCode,String getCode);
	/**
	 * 通过用户名登录
	 * @param name
	 * @param password
	 * @return
	 */
	User userLogin(String name,String password);
}
