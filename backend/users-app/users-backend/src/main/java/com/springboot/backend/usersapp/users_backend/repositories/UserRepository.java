package com.springboot.backend.usersapp.users_backend.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.springboot.backend.usersapp.users_backend.entities.User;
import java.util.List;


public interface UserRepository extends CrudRepository<User, Long>{
    
    Page<User> findAll(Pageable pageable); // Paginar usuarios

    Optional<User> findByUsername(String username); // Login
    
}
