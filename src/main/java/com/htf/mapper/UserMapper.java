package com.htf.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.htf.pojo.User;

/**
 * 方法和实体类的映射
 * @author huotengfei
 *
 */
@Mapper
public interface UserMapper {
	
	/*添加操作*/
	/**
	 * 通过电话号码添加用户
	 * @param user
	 * @return
	 */
	Integer insUserByTel(User user);
	/*修改操作*/
	/**
	 * 通过手机号码修改用户
	 * @param user
	 * @return
	 */
	Integer updUserByTel(User user);
	/*查询操作*/
	/**
	 * 通过电话号码查询用户
	 * @param tel
	 * @return
	 */
	User selUserByTel(String tel);
	/**
	 * 通过用户名查询用户
	 * @param name
	 * @return
	 */
	User selUserByName(String name);
	/**
	 * 通过用户名或者电话号码查询用户
	 * @param value
	 * @return
	 */
	User selUserByNameOrTel(String value);
	/**
	 * 通过电话号码查询是否存在记录
	 * @param tel
	 * @return
	 */
	Integer selCountByTel(String tel);
	/**
	 * 通过用户名查询是否存在记录
	 * @param name
	 * @return
	 */
	Integer selCountByName(String name);
	/**
	 * 通过用户名和密码查询用户
	 * @return
	 */
	User selUserByNameAndPassword(@Param("name") String name,@Param("password") String password);
	
	/**
	 * 通过电话号码和密码查询用户
	 * @return
	 */
	User selUserByTelAndPassword(@Param("tel") String tel,@Param("password") String password);
}
