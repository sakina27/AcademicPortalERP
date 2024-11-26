package com.sakina.academicerp.dto.employee;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record EmployeeRequest(
        @NotNull(message="Customer email is mandatory")
        @Email(message = "Please enter email in correct format")
        @JsonProperty("email")
        String email,

        @NotNull(message = "Password is Mandatory")
        @NotEmpty(message = "Password is Mandatory")
        @NotBlank(message = "Password is Mandatory")
        @Size(min = 6, max = 12)
        @JsonProperty("password")
        String password
) {
}
