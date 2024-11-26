package com.sakina.academicerp.dto.employee;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record LoginRequest (
        @NotNull(message="Customer email is Mandatory")
        @Email(message = "Please enter email in correct format")
        @JsonProperty("email")
        String email,

        @NotNull(message = "Password is mandatory")
        @NotEmpty(message = "Password is mandatory")
        @NotBlank(message = "Password is mandatory")
        @Size(min = 6, max = 12)
        @JsonProperty("password")
        String password
){
}
