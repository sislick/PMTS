package com.htf.service.ex;
/**
 * 密码不匹配异常
 * @author huotengfei
 *
 */
public class PasswordNotMatch extends ServiceException{
	private static final long serialVersionUID = 4925081991049980789L;

	public PasswordNotMatch() {
		super();
	}

	public PasswordNotMatch(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
		super(arg0, arg1, arg2, arg3);
	}

	public PasswordNotMatch(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public PasswordNotMatch(String arg0) {
		super(arg0);
	}

	public PasswordNotMatch(Throwable arg0) {
		super(arg0);
	}
	
}
