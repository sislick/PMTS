package com.htf.pojo;
/**
 * 封装一个返回信息
 * @author huotengfei
 *
 */
public class ResponseResult {
	private String message;//错误信息
	private Integer state = 200;//状态码，默认200
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public ResponseResult(Integer state,Exception ex) {
		super();
		this.state = state;
		this.message = ex.getMessage();
	}
	public ResponseResult() {
		super();
	}
}
