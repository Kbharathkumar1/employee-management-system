package com.ems.www.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.www.model.Employee;
import com.ems.www.repository.EmployeeRepo;

@Service
public class EmployeeServiceImple implements EmployeeService {
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	public Employee saveEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}
	
	public List<Employee> getAllEmployees(){
		return employeeRepo.findAll();
	}
	
	public Employee getEmployeeById(Long id) {
		return employeeRepo.findById(id).get();
	}
	
	//updating....
	public Employee updateEmployee(Long id, Employee employee) {

	    Employee existingEmployee = employeeRepo.findById(id).get();

	    existingEmployee.setName(employee.getName());
	    existingEmployee.setEmail(employee.getEmail());
	    existingEmployee.setDepartment(employee.getDepartment());
	    existingEmployee.setSalary(employee.getSalary());

	    return employeeRepo.save(existingEmployee);
	}
	
	//deleting....
	public void deleteEmployee(Long id) {
		employeeRepo.deleteById(id);
	}
	
	//later add this logic to delete(this logic is better than above),because this logic ensures " record exists before delete"
//	Employee emp = employeeRepo.findById(id).get();
//    employeeRepo.delete(emp);
}
