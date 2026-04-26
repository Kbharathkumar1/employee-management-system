package com.ems.www.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.www.model.Register;
import com.ems.www.service.LoginService;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api")
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/login")
	public Map<String,Object> loginUser(@RequestBody Register user) {
		return loginService.loginUser(user);
	}
}
