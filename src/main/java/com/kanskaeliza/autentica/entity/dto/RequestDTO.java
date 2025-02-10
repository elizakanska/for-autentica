package com.kanskaeliza.autentica.entity.dto;

import com.kanskaeliza.autentica.entity.enums.HardwareType;
import com.kanskaeliza.autentica.entity.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Enumerated(EnumType.STRING)
    private HardwareType hardwareType;

    private String parameters;
    private String justification;
    private LocalDateTime requestTime;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;
}


