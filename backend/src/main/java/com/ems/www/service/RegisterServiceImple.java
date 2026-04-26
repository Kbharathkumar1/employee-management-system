package com.ems.www.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.www.model.Register;
import com.ems.www.repository.RegisterRepo;

@Service
public class RegisterServiceImple implements RegisterService {
	
	@Autowired
	private RegisterRepo registerRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	//This is Registration
	public void registerUser(Register user) {
		String encodedpswd= passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedpswd);
		
		
		if(registerRepo.existsByEmail(user.getEmail())) {
			throw new RuntimeException("Email Already exists...");
		}
		
		registerRepo.save(user);
	}
	
	
}
