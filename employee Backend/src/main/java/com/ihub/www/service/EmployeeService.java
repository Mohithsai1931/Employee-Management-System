package com.ihub.www.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ihub.www.exception.ResourceNotFoundException;
import com.ihub.www.model.Employee;
import com.ihub.www.repo.EmployeeRepository;

@Service
public class EmployeeService 
{
	@Autowired
	EmployeeRepository employeeRepository;
	
	public Employee createEmployee(Employee employee)
	{
		return employeeRepository.save(employee);
	}
	public List<Employee> getEmployees()
	{
		return employeeRepository.findAll();
	}
	public Employee getEmployeeById(long id)
	{
		return employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Id Not Found"));
	}
	public ResponseEntity<Employee> updateEmployee(long id,Employee employee)
	{
		if(employeeRepository.existsById(id))
		{
			Employee existingEmployee = employeeRepository.findById(id).get();
			
			existingEmployee.setName(employee.getName());
			existingEmployee.setDoj(employee.getDoj());
			existingEmployee.setDept(employee.getDept());
			
			employeeRepository.save(existingEmployee);
			
			return new ResponseEntity<>(existingEmployee,HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	public ResponseEntity<HttpStatus> deleteEmployee(long id)
	{
		Employee emp=employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Id Not Found"));
		employeeRepository.delete(emp);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
