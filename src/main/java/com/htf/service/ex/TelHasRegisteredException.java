package com.htf.service.ex;
/**
 * 电话号码已经注册
 * @author huotengfei
 *
 */
public class TelHasRegisteredException extends ServiceException {
	private static final long serialVersionUID = -1038064103946597229L;

	public TelHasRegisteredException() {
		super();
	}

	public TelHasRegisteredException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
		super(arg0, arg1, arg2, arg3);
	}

	public TelHasRegisteredException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public TelHasRegisteredException(String arg0) {
		super(arg0);
	}

	public TelHasRegisteredException(Throwable arg0) {
		super(arg0);
	}
	
}
