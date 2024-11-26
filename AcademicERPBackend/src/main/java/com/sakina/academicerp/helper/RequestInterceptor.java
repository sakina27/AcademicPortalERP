package com.sakina.academicerp.helper;

import com.sakina.academicerp.exception.JwtTokenNotValid;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class RequestInterceptor implements HandlerInterceptor {
    private final JWTHelper jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        if(HttpMethod.OPTIONS.name().equals(request.getMethod())) { return true;}
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new JwtTokenNotValid("Authorization header is invalid");
        }

        String token = authorizationHeader.substring(7); // Extract token from "Bearer {token}"
        if (!jwtUtil.validateToken(token)) {
            throw new JwtTokenNotValid("Not Valid Token");
        }

        return true; // Allow request to proceed
    }
}

