package com.sakina.academicerp.service;

import com.sakina.academicerp.dto.employee.EmployeeAuthResponse;
import com.sakina.academicerp.dto.employee.EmployeeResponse;
import com.sakina.academicerp.dto.employee.LoginRequest;
import com.sakina.academicerp.entity.Departments;
import com.sakina.academicerp.entity.EmployeeAccounts;
import com.sakina.academicerp.entity.EmployeeSalary;
import com.sakina.academicerp.helper.EncryptionService;
import com.sakina.academicerp.helper.JWTHelper;
import com.sakina.academicerp.mapper.EmployeesMapper;
import com.sakina.academicerp.repo.DepartmentsRepo;
import com.sakina.academicerp.repo.EmployeeAccountsRepo;
import com.sakina.academicerp.repo.EmployeeRepo;
import com.sakina.academicerp.entity.Employees;
import com.sakina.academicerp.repo.EmployeeSalaryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepo employeeRepo;
    private final EmployeeAccountsRepo employeeAccountsRepo;
    private final DepartmentsRepo departmentsRepo;
    private final EmployeesMapper employeesMapper;
    private final EncryptionService encryptionService;
    private final JWTHelper jwtHelper;
    private final EmployeeSalaryRepo employeeSalaryRepo;

    public String addEmployee(EmployeeResponse request) {
        Departments department = departmentsRepo.findByName(request.departmentName());
        if(department == null){
            department = Departments.builder().name(request.departmentName()).build();
            departmentsRepo.save(department);
        }
        Employees emp = Employees.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(encryptionService.encodePassword(request.password()))
                .title(request.title())
                .salary(request.salary())
                .department(department)
                .photographPath(request.photographPath())
                .build();

        employeeRepo.save(emp);
        return "Registered Successfully";
    }

    public EmployeeAuthResponse loginCustomer(LoginRequest request) {
        Optional<Employees> optionalEmployee = employeeRepo.findByEmail(request.email());

        Employees employee;
        if (optionalEmployee.isPresent()) {
            employee = optionalEmployee.get();
            if (encryptionService.verifyPassword(request.password(), employee.getPassword())) {
                if (Objects.equals(employee.getDepartment().getName(), "Accounts")) {
                    String token = jwtHelper.generateToken(employee.getEmployeeId());
                    return new EmployeeAuthResponse(token, "Login Successful", 201);
                } else return new EmployeeAuthResponse("null", "Only Accounts Department has the rights to access this!", 401);
            } else return new EmployeeAuthResponse("null", "Wrong Password!", 401);
        }

        return new EmployeeAuthResponse("null", "Email not found!", 401);
    }

    public List<EmployeeResponse> getAllEmployees(Long id) {
        List<Employees> employeesList = employeeRepo.getAllExcept(id);

        return employeesList.stream()
                .map(employeesMapper::toResponse
                )
                .toList();
    }

    public String updateEmployee(EmployeeResponse request) {
        Optional<Employees> optionalEmployee = employeeRepo.findById(request.employeeId());
        Departments department = departmentsRepo.findByName(request.departmentName());
        if(department == null){
            departmentsRepo.save(Departments.builder().name(request.departmentName()).build());
        }
        if (optionalEmployee.isPresent()) {
            Employees employee = optionalEmployee.get();
            employee.setSalary(request.salary());
            employeeRepo.save(employee);
        }
        return "Updated";
    }

    public String disburseSalary(Set<EmployeeResponse> request){
        for (EmployeeResponse emp : request) {
            // Find employee by ID
            Employees employee = employeeRepo.findById(emp.employeeId()).orElse(null);

            if (employee != null) {
                EmployeeSalary employeeSalary = EmployeeSalary.builder()
                        .employee(employee)
                        .amount(employee.getSalary())  // Assuming the salary is stored in the Employees table
                        .description("Salary Disbursed")
                        .paymentDate(LocalDateTime.now())  // Set current time as payment date
                        .build();

                // Save the employee salary record
                employeeSalaryRepo.save(employeeSalary);

                // Find or create employee account to update the balance
                EmployeeAccounts employeeAccounts = employeeAccountsRepo.findByEmployee(employee);

                if (employeeAccounts == null) {
                    // Create new EmployeeAccounts if not present
                    employeeAccounts = new EmployeeAccounts();
                    employeeAccounts.setEmployee(employee);
                    employeeAccounts.setEmployeeBalance(0.0); // Set initial balance if needed
                }

                // Update employee balance by subtracting the disbursed salary
                employeeAccounts.setEmployeeBalance(employeeAccounts.getEmployeeBalance() + employeeSalary.getAmount());

                // Save the updated employee account balance
                employeeAccountsRepo.save(employeeAccounts);
            } else {
                System.out.println("Employee with ID " + emp.employeeId() + " not found.");
                // You can also throw an exception or handle the error as needed
            }
        }

        return "Salary has been disbursed to selected employees.";
    }
}
