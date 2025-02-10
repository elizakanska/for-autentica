package com.kanskaeliza.autentica.service.impl;

import com.kanskaeliza.autentica.entity.User;
import com.kanskaeliza.autentica.entity.enums.Role;
import com.kanskaeliza.autentica.repository.UserRepository;
import com.kanskaeliza.autentica.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository repository;

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {return repository.findById(id);}

    @Override
    public User saveUser(User user) {
        if (repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }
        return repository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        Optional<User> existingUser = repository.findById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setName(user.getName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setRole(user.getRole());
            return repository.save(updatedUser);
        }
        throw new RuntimeException("User not found");
    }

    @Override
    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    @Override
    public User makeAdmin(Long id) {
        Optional<User> user = repository.findById(id);
        if (user.isPresent()) {
            User adminUser = user.get();
            adminUser.setRole(Role.ADMIN);
            return repository.save(adminUser);
        }
        throw new RuntimeException("User not found");
    }

}
