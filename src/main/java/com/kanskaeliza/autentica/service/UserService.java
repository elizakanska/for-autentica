package com.kanskaeliza.autentica.service;

import com.kanskaeliza.autentica.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();

    User saveUser(User user);

    User updateUser(Long id, User user);

    void deleteUser(Long id);

    User makeAdmin(Long id);

    Optional<User> getUserById(Long id);
}
