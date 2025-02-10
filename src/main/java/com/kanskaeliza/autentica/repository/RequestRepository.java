package com.kanskaeliza.autentica.repository;

import com.kanskaeliza.autentica.entity.Request;
import com.kanskaeliza.autentica.entity.dto.RequestDTO;
import com.kanskaeliza.autentica.entity.enums.HardwareType;
import com.kanskaeliza.autentica.entity.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<RequestDTO, Long> {
    List<RequestDTO> findRequestById(Long id);
    List<RequestDTO> findRequestByHardwareType(HardwareType hardwareType);
    List<RequestDTO> findRequestByStatus(RequestStatus status);
    List<RequestDTO> findRequestByUserId(Long userId);
    List<RequestDTO> findRequestByRequestTime(LocalDateTime requestTime);

    List<RequestDTO> findAll();
}
