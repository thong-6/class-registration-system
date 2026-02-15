package io.github.thongto.classregistrationsystem.auth;

import javax.management.RuntimeErrorException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.github.thongto.classregistrationsystem.auth.dto.AuthResponse;
import io.github.thongto.classregistrationsystem.auth.dto.LoginRequest;
import io.github.thongto.classregistrationsystem.auth.dto.RegisterRequest;
import io.github.thongto.classregistrationsystem.entity.Role;
import io.github.thongto.classregistrationsystem.entity.User;
import io.github.thongto.classregistrationsystem.repository.RoleRepository;
import io.github.thongto.classregistrationsystem.repository.UserRepository;
import io.github.thongto.classregistrationsystem.security.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public void register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername()))
            throw new RuntimeException("Username exists");
        Role role = roleRepository.findByRoleName("Student");
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(role);
        user.setEmail(req.getEmail());
        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        User user = userRepository.findByUsername(req.getUsername()).get();
        String token = jwtService.generateAccessToken(user);
        return new AuthResponse(token);
    }

}
