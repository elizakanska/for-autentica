package com.kanskaeliza.autentica.service.impl;

import com.kanskaeliza.autentica.entity.Request;
import com.kanskaeliza.autentica.entity.dto.RequestDTO;
import com.kanskaeliza.autentica.entity.enums.RequestStatus;
import com.kanskaeliza.autentica.repository.RequestRepository;
import com.kanskaeliza.autentica.repository.UserRepository;
import com.kanskaeliza.autentica.service.RequestService;
import com.kanskaeliza.autentica.utility.mappers.RequestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {
    private final RequestRepository repository;
    private final UserRepository userRepository;

    @Qualifier("requestMapper")
    private final RequestMapper mapper;

    @Override
    public List<Request> getAllRequests() {
        List<RequestDTO> requestDTOs = repository.findAll();

        return requestDTOs.stream().map(dto -> {
            Request request = mapper.dtoToRequest(dto);
            request.setUser(userRepository.findById(dto.getUserId()).orElse(null)); // Fetch full user
            return request;
        }).collect(Collectors.toList());
    }


    @Override
    public Optional<Request> getRequestById(Long id) {
        log.info("Looking for request with id {}.", id);
        return repository.findById(id).map(mapper::dtoToRequest);
    }

    @Override
    public Request saveRequest(Request request) {
        if (request == null || request.getParameters().isBlank() || request.getJustification().isBlank() || request.getRequestTime() == null) {
            throw new IllegalArgumentException("Invalid request data");
        }

        RequestDTO requestDTO = mapper.requestToDTO(request);
        requestDTO = repository.save(requestDTO);

        Request savedRequest = mapper.dtoToRequest(requestDTO);
        savedRequest.setUser(userRepository.findById(request.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found")));

        return savedRequest;
    }


    @Override
    public Optional<Request> editRequestById(Long id, Request request) {
        return repository.findById(id).map(existingRequest -> {
            existingRequest.setParameters(request.getParameters());
            existingRequest.setJustification(request.getJustification());
            existingRequest.setRequestTime(request.getRequestTime());
            RequestDTO updatedRequest = repository.save(existingRequest);
            return mapper.dtoToRequest(updatedRequest);
        });
    }

    @Override
    public void deleteRequestById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            log.info("Request with id {} deleted.", id);
        } else {
            log.info("Request with id {} not found.", id);
        }
    }

    @Override
    public Optional<Request> changeStatus(Long id, RequestStatus status) {
        return repository.findById(id).map(existingRequest -> {
            existingRequest.setStatus(status);
            RequestDTO updatedRequest = repository.save(existingRequest);
            return mapper.dtoToRequest(updatedRequest);
        });
    }
}
