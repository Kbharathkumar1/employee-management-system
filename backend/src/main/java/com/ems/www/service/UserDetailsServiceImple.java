package com.ems.www.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.ems.www.model.Register;
import com.ems.www.repository.RegisterRepo;

@Service
public class UserDetailsServiceImple implements UserDetailsService {

@Autowired
private RegisterRepo registerRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	
		Register user = registerRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		return new User( user.getEmail(), user.getPassword(), List.of( new SimpleGrantedAuthority("ROLE_" + user.getRole()) ));
	
	}

}