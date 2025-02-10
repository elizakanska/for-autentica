package com.kanskaeliza.autentica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kanskaeliza.autentica")
public class AutenticaApplication {
    public static void main(String[] args) {
        SpringApplication.run(AutenticaApplication.class, args);
    }
}

