package com.ems.www.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.www.model.Register;
import com.ems.www.service.RegisterService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173/")
public class RegisterController {
	
	@Autowired
	private RegisterService registerService;
	
	@PostMapping("/register")
	public String registerUser(@RequestBody Register user) {
		registerService.registerUser(user);
		return "User Registered Successfully...";
	}
}
