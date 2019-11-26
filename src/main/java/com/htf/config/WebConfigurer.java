package com.htf.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.htf.config.interceptors.LoginInterceptor;

@Configuration
public class WebConfigurer implements WebMvcConfigurer {

	@Autowired
	private LoginInterceptor loginInterceptor;
  
	// 这个方法用来注册拦截器,我们自己写好的拦截器需要通过这里添加注册才能生效
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // addPathPatterns("/**") 表示拦截所有的请求,
        // excludePathPatterns("/login", "/register") 表示除了登陆与注册之外,因为登陆注册不需要登陆也可以访问
        registry.addInterceptor(loginInterceptor)
        	.addPathPatterns("/**")
        	.excludePathPatterns("/","/index")       
        	.excludePathPatterns("/user/login", "/user/register","/user/telLogin","/user/userLogin","/user/userRegister","/user/sendCode")
        	.excludePathPatterns("/user/forget_password","/user/forget_password_handle")
        	.excludePathPatterns("/css/**","/js/**","/imgs/**");//静态资源的放行
    }                 
}
