package com.Pedidos360.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Configuramos CORS para permitir llamadas desde el API Gateway o Frontend
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 2. Deshabilitamos CSRF porque nuestra API es stateless y usa JWT
            .csrf(csrf -> csrf.disable())
            
            // 3. Exigimos autenticación para cualquier petición
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/health").permitAll() // Dejamos libre el health check (si tienes)
                .anyRequest().authenticated() // Bloqueamos el resto, exigiendo JWT
            )
            
            // 4. Activamos el modo "Resource Server" para que lea y valide el JWT usando Azure AD
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> {}) // Usa la config del application.yml (issuer-uri y audiences)
            );
        
        return http.build();
    }

    // Configuración básica de CORS para el microservicio
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Cuando configures el API Gateway en AWS, puedes restringir esto a la IP del API Gateway.
        configuration.setAllowedOrigins(Arrays.asList("*")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}