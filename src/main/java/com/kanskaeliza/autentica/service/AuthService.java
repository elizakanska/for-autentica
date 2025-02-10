package com.kanskaeliza.autentica.service;

import com.kanskaeliza.autentica.entity.User;

import java.util.List;

public interface AuthService {
    Boolean emailExists(String email);

    User createUser(User user);

    User login(User user);

}
