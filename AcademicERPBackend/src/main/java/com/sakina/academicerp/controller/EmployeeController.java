package com.sakina.academicerp.controller;

import com.sakina.academicerp.dto.employee.EmployeeAuthResponse;
import com.sakina.academicerp.dto.employee.EmployeeResponse;
import com.sakina.academicerp.dto.employee.LoginRequest;
import com.sakina.academicerp.helper.JWTHelper;
import com.sakina.academicerp.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/employees")
@CrossOrigin("http:localhost:3000/")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final JWTHelper jwtHelper;

    @PostMapping("/newEmployee")
    public ResponseEntity<String> addEmployee(@RequestBody @Valid EmployeeResponse employee) {
        return ResponseEntity.ok(employeeService.addEmployee(employee));
    }

    @PostMapping("/login")
    public ResponseEntity<EmployeeAuthResponse> loginEmployee(@RequestBody @Valid LoginRequest loginRequest) {
        EmployeeAuthResponse employeeAuthResponse = employeeService.loginCustomer(loginRequest);
        if (employeeAuthResponse.statusCode() == 201) {
            return ResponseEntity.ok(employeeService.loginCustomer(loginRequest));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(employeeAuthResponse);
        }
    }
    @CrossOrigin("http://localhost:3000")
    @GetMapping("/get")
    public ResponseEntity<List<EmployeeResponse>> getEmployees(@RequestHeader(name="Authorization") String authToken) {
        String token = authToken.split(" ")[1].trim();
        Long id = jwtHelper.extractUserId(token);
        List<EmployeeResponse> response = employeeService.getAllEmployees(id);
        System.out.println(response);
        return ResponseEntity.ok(response);
    }

    @PutMapping()
    public ResponseEntity<String> updateEmployee(@RequestBody @Valid EmployeeResponse request) {
        return ResponseEntity.ok(employeeService.updateEmployee(request));
    }

    @PostMapping("/SalaryDisbursement")
    public ResponseEntity<String> disburseSalary(@RequestBody @Valid Set<EmployeeResponse> emps) {
        System.out.println(emps);
        return ResponseEntity.ok(employeeService.disburseSalary(emps));
    }

}
