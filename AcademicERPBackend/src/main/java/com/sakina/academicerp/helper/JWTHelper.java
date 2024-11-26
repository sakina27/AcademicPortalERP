package com.sakina.academicerp.helper;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTHelper {
    private static String SECRET_KEY = "cr666N7wIV+JHnv78pWtcfAekL4YXd9gbnJMs8SJ9sI=";

    // Extract username from the token
    public Long extractUserId(String token) {
        return Long.parseLong(extractClaim(token, Claims::getSubject));
    }

    // Extract expiration date from the token
    public static Date getExpirationDate(String token) {
        try {
            // Parse claims without validating the token
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY) // Replace with your signing key
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getExpiration();
        } catch (ExpiredJwtException ex) {
            // Handle expired JWT separately
            return ex.getClaims().getExpiration();
        } catch (SignatureException ex) {
            throw new IllegalArgumentException("Invalid JWT token");
        }
    }

    // Extract claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    // Check if token is expired
    private Boolean isTokenExpired(String token) {
        Date d = getExpirationDate(token);
        Date now = new Date();
        return getExpirationDate(token).before(new Date());
    }

    // Generate token
    public String generateToken(Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("iat", new Date(System.currentTimeMillis()));
        claims.put("exp", new Date(System.currentTimeMillis() + 1000*10));  // Token valid for 1 hour
        claims.put("sub", userId.toString());
        return createToken(claims);
    }

    // Create token with claims
    private String createToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    // Validate token
    public Boolean validateToken(String token) {
//        final String extractedUsername = extractUserId(token);
//        return (extractedUsername.equals(username) && !isTokenExpired(token));
        return !isTokenExpired(token);
    }
}

