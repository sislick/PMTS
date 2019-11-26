package com.htf.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import com.htf.mapper.UserMapper;
import com.htf.pojo.User;
import com.htf.service.UserService;
import com.htf.service.ex.PasswordNotMatch;
import com.htf.service.ex.TelCodeNotMatchException;
import com.htf.service.ex.TelHasRegisteredException;
import com.htf.service.ex.TelNotRegisterException;
import com.htf.service.ex.UserNameOrTelNotFoundException;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserMapper userMapper;
	
	/**
	 * 忘记密码
	 */
	@Override
	public User forgetPassword(String tel, String password, String telCode, String myCode) {
		User user = userMapper.selUserByTel(tel);
		if(user == null) {
			throw new TelNotRegisterException("您输入的手机号码未注册");
		}else {//能查到这个用户
			if(!myCode.equals(telCode)) {
				throw new TelCodeNotMatchException("您输入的手机验证码不正确");
			}else {//手机验证码正确
				password = myMd5(password, user.getSalt());
				user.setPassword(password);
				user.setUpdateTime(new Date());
				System.out.println("忘记密码："+user);
				int resultNum = userMapper.updUserByTel(user);
			}
		}
		return null;
	}
	/**
	 * 手机号码注册
	 */
	@Override
	public User register(String tel, String password, String telCode,String myCode) {
		User user = userMapper.selUserByTel(tel);
		if(user != null) {
			throw new TelHasRegisteredException("您输入的手机号码已经注册");
		}else if(!myCode.equals(telCode)){
			throw new TelCodeNotMatchException("您输入的手机验证码不正确");
		}else {
			password = myMd5(password,telCode);
			user = new User();
			user.setId("U"+tel);
			user.setTel(tel);
			user.setName("用户"+tel);
			user.setPassword(password); 
			user.setSalt(myCode);
			user.setRoleId("R002");
			user.setUserPic("user.png");
			user.setCreateUser("用户"+tel);
			user.setCreateTime(new Date());
			user.setUpdateUser("用户"+tel);
			user.setUpdateTime(new Date());
			int resultNum = userMapper.insUserByTel(user);
		}
		return user;
	}
	/**
	 * 通过手机号码验证登录
	 */
	@Override
	public User telLogin(String tel, String telCode,String getCode) {
		User user = userMapper.selUserByTel(tel);
		if(user == null) {
			throw new TelNotRegisterException("您输入的手机号码未注册");
		}else if(!telCode.equals(getCode)){
			throw new TelCodeNotMatchException("您输入的手机验证码不正确");
		}
		return user;
	}
	/**
	 * 通过用户名和密码登录
	 */
	@Override
	public User userLogin(String name, String password) {
		User resultUser = userMapper.selUserByNameOrTel(name);
		if(resultUser == null) {
			throw new UserNameOrTelNotFoundException("用户名或者电话号码不存在");//抛出用户名或者电话号码不存在的异常
		}else {
			password = myMd5(password, resultUser.getSalt());//使用相同的md5算法加密输入的密码
			resultUser = userMapper.selUserByNameAndPassword(name, password);
			if(resultUser == null) {
				resultUser = userMapper.selUserByTelAndPassword(name, password);
				if(resultUser == null) {
					throw new PasswordNotMatch("账号密码不匹配");//抛出密码不匹配的异常
				}     
			} 
		}          
		return resultUser;                                                                 
	}  
	
	/*自定义md5加密算法*/
	private String myMd5(String password,String salt) {
		String str = password+""+salt;
		for(int i=0;i<5;i++) {
			str = DigestUtils.md5DigestAsHex(str.getBytes());
		}
		return str;
	}
}
