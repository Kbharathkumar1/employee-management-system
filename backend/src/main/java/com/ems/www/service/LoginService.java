package com.ems.www.service;

import java.util.Map;

import com.ems.www.model.Register;

public interface LoginService {
	
	public Map<String,Object> loginUser(Register user);
}
