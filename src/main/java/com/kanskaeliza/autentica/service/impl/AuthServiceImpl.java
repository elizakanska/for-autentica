package com.kanskaeliza.autentica.service.impl;

import com.kanskaeliza.autentica.entity.User;
import com.kanskaeliza.autentica.entity.enums.Role;
import com.kanskaeliza.autentica.repository.UserRepository;
import com.kanskaeliza.autentica.service.AuthService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository repository;

    @PostConstruct
    public void createAdmin() {
        List<User> admins = repository.findByRole(Role.ADMIN);

        if (!admins.isEmpty()) {
            System.out.println("Admin already exists");
        } else {
            User user = new User();
            user.setName("admin");
            user.setEmail("admin@mail.com");
            user.setPassword("admin");
            user.setRole(Role.ADMIN);
            repository.save(user);
            System.out.println("Admin created");
        }
    }


    @Override
    public Boolean emailExists(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public User createUser(User user) {
        if (repository.existsByEmail(user.getEmail())) {
            return null;
        }
        user.setPassword(user.getPassword());
        return repository.save(user);
    }

    public User login(User user) {
        Optional<User> optionalUser = Optional.ofNullable(repository.findByEmail(user.getEmail()));
        if (optionalUser.isPresent() && user.getPassword().equals(optionalUser.get().getPassword())) {
            return optionalUser.get();
        }
        return null;
    }
}
