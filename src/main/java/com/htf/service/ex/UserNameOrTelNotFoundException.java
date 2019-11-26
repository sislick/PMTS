package com.htf.service.ex;
/**
 * 用户名不存在的异常
 * @author huotengfei
 *
 */
public class UserNameOrTelNotFoundException extends ServiceException{
	private static final long serialVersionUID = -4385835533271695335L;

	public UserNameOrTelNotFoundException() {
		super();
	}

	public UserNameOrTelNotFoundException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
		super(arg0, arg1, arg2, arg3);
	}

	public UserNameOrTelNotFoundException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public UserNameOrTelNotFoundException(String arg0) {
		super(arg0);
	}

	public UserNameOrTelNotFoundException(Throwable arg0) {
		super(arg0);
	}
	
}
