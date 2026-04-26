package com.ems.www.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ems.www.model.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee,Long> {
	
}
