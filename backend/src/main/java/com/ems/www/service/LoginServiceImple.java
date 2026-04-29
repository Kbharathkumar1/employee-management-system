package com.ems.www.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.www.model.Register;
import com.ems.www.repository.RegisterRepo;

@Service
public class LoginServiceImple implements LoginService {
	@Autowired
	private RegisterRepo registerRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	//This is for Login
	
		public Map<String,Object> loginUser(Register user){

	        Register dbUser = registerRepo
	                .findByEmail(user.getEmail())
	                .orElseThrow(() ->
	                   new RuntimeException("User not found. Please register")
	                );


	        if(!passwordEncoder.matches(
	                user.getPassword(),
	                dbUser.getPassword()
	        )){

	            throw new RuntimeException("Invalid password");
	        }


	        Map<String,Object> response = new HashMap<>();

	        response.put("message","Login successful");
	        response.put("role",dbUser.getRole());
	        response.put("id",dbUser.getId());
	        response.put("email",dbUser.getEmail());

	        return response;

	    }
}
