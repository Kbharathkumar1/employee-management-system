package com.ems.www.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SecurityConfig {
	
	@Bean
	public PasswordEncoder passwordEncode() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
            // 1. INTEGRATE CORS HERE (Modified to be more flexible for testing)
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                // We use setAllowedOriginPatterns("*") to allow ANY domain during this test
                config.setAllowedOriginPatterns(Collections.singletonList("*"));
                config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setAllowCredentials(true);
                return config;
            }))
            // 2. DISABLE CSRF (Crucial for the POST request to move past "Pending")
            .csrf(csrf -> csrf.disable())
            // 3. YOUR EXISTING AUTH RULES
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/register", "/api/login").permitAll()
                .requestMatchers("/api/employees/**").permitAll()
                .anyRequest().authenticated()
            );

		return http.build();
	}
}