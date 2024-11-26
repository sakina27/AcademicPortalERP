package com.sakina.academicerp.repo;

import com.sakina.academicerp.entity.EmployeeAccounts;
import com.sakina.academicerp.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeAccountsRepo extends JpaRepository<EmployeeAccounts, Long> {
    EmployeeAccounts findByEmployee(Employees employee);
}
