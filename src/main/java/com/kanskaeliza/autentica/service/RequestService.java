package com.kanskaeliza.autentica.service;


import com.kanskaeliza.autentica.entity.Request;
import com.kanskaeliza.autentica.entity.enums.RequestStatus;

import java.util.List;
import java.util.Optional;

public interface RequestService {
    Optional<Request> getRequestById(Long id);
    Request saveRequest(Request request) throws IllegalArgumentException;
    Optional<Request> editRequestById(Long id, Request request);
    void deleteRequestById(Long id);

    Optional<Request> changeStatus(Long id, RequestStatus status);

    List<Request> getAllRequests();
}
