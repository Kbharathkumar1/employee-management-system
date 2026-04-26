package com.ems.www.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ems.www.model.Register;

@Repository
public interface RegisterRepo extends JpaRepository< Register, Long> {
	
	boolean existsByEmail(String email); //-->register
		
	 Optional<Register> findByEmail(String email);//-->login
}
