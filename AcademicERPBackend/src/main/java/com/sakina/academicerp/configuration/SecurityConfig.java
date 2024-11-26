package com.sakina.academicerp.configuration;

import com.sakina.academicerp.helper.RequestInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig implements WebMvcConfigurer {

    private final RequestInterceptor requestInterceptor;


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Add CORS mapping for all endpoints
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Your frontend URL
                .allowedMethods("*")  // Allowed methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true);  // Allow credentials (JWT in headers)
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Apply the interceptor to all endpoints except /auth/login
        registry.addInterceptor(requestInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/api/v1/employees/login")
                .excludePathPatterns("/**/options");

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
