package com.kanskaeliza.autentica.repository;

import com.kanskaeliza.autentica.entity.User;
import com.kanskaeliza.autentica.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRole(Role role);

    User findByEmail(String email);

    boolean existsByEmail(String email);
}
