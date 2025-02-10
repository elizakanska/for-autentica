package com.kanskaeliza.autentica.entity;

import com.kanskaeliza.autentica.entity.enums.HardwareType;
import com.kanskaeliza.autentica.entity.enums.RequestStatus;
import lombok.*;


import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Request {
    private Long id;
    private User user;
    private HardwareType hardwareType;
    private String parameters;
    private String justification;
    private LocalDateTime requestTime;
    private RequestStatus status;
}




