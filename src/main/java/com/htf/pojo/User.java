package com.htf.pojo;

import java.util.Date;

public class User {
	private String id;			//用户id
	private String name;		//用户名
	private String password;	//密码
	private String salt;		//随机盐值
	private String roleId; 		//角色
	private String tel;			//电话
	private String provinceId;	//省份id
	private String cityId;		//市区id
	private String areaId;		//县id
	private String userPic;		//头像路径
	private String createUser;	//创建人
	private Date   createTime;	//创建时间
	private String updateUser;	//修改人
	private Date   updateTime;	//修改时间
	public String getUserPic() {
		return userPic;
	}
	public void setUserPic(String userPic) {
		this.userPic = userPic;
	}
	public String getId() {     
		return id;       
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getProvinceId() {
		return provinceId;
	}
	public void setProvinceId(String provinceId) {
		this.provinceId = provinceId;
	}
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	public String getAreaId() {
		return areaId;
	}
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public User(String id, String name, String password, String salt, String roleId, String tel, String provinceId,
			String cityId, String areaId, String userPic, String createUser, Date createTime, String updateUser,
			Date updateTime) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.salt = salt;
		this.roleId = roleId;
		this.tel = tel;
		this.provinceId = provinceId;
		this.cityId = cityId;
		this.areaId = areaId;
		this.userPic = userPic;
		this.createUser = createUser;
		this.createTime = createTime;
		this.updateUser = updateUser;
		this.updateTime = updateTime;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", password=" + password + ", salt=" + salt + ", roleId=" + roleId
				+ ", tel=" + tel + ", provinceId=" + provinceId + ", cityId=" + cityId + ", areaId=" + areaId
				+ ", userPic=" + userPic + ", createUser=" + createUser + ", createTime=" + createTime + ", updateUser="
				+ updateUser + ", updateTime=" + updateTime + "]";
	}
	public User() {
		super();
	}
	
}
