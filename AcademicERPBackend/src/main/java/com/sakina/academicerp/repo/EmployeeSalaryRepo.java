package com.sakina.academicerp.repo;


import com.sakina.academicerp.entity.EmployeeSalary;
import com.sakina.academicerp.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeSalaryRepo extends JpaRepository<EmployeeSalary, Long> {
    EmployeeSalary findByEmployee(Employees employee);
}
