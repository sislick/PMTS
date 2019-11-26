package com.htf.service.ex;
/**
 * 自定义异常的基类
 * @author huotengfei
 *
 */
public class ServiceException extends RuntimeException{

	private static final long serialVersionUID = -3469759861315689563L;

	public ServiceException() {
		super();
	}

	public ServiceException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
		super(arg0, arg1, arg2, arg3);
	}

	public ServiceException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public ServiceException(String arg0) {
		super(arg0);
	}

	public ServiceException(Throwable arg0) {
		super(arg0);
	}
	
}
