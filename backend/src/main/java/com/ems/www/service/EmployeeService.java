package com.ems.www.service;

import java.util.List;

import com.ems.www.model.Employee;

public interface EmployeeService {

	    public Employee saveEmployee(Employee employee);

	    public List<Employee> getAllEmployees();

	    public Employee getEmployeeById(Long id);

	    public Employee updateEmployee(Long id, Employee employee);

	    public void deleteEmployee(Long id);

}
