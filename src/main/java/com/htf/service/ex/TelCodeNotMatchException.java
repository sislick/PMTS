package com.htf.service.ex;
/**
 * 电话验证码不匹配
 * @author huotengfei
 *
 */
public class TelCodeNotMatchException extends ServiceException {
	private static final long serialVersionUID = 10232196692495032L;

	public TelCodeNotMatchException() {
		super();
	}

	public TelCodeNotMatchException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
		super(arg0, arg1, arg2, arg3);
	}

	public TelCodeNotMatchException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public TelCodeNotMatchException(String arg0) {
		super(arg0);
	}

	public TelCodeNotMatchException(Throwable arg0) {
		super(arg0);
	}

}
