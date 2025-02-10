package com.kanskaeliza.autentica.controller;

import com.kanskaeliza.autentica.entity.User;
import com.kanskaeliza.autentica.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if(service.emailExists(user.getEmail())) {
            return new ResponseEntity<>("Email already in use!", HttpStatus.NOT_ACCEPTABLE);
        }

        User createdUser = service.createUser(user);
        if(createdUser == null) {
            return new ResponseEntity<>("User creation failed! Try again later&#128540;!", HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User dbUser = service.login(user);

        if(dbUser == null) {
            return new ResponseEntity<>("Username or password is incorrect!", HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(dbUser, HttpStatus.OK);
    }

}
