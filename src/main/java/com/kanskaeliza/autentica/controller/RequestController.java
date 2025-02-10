package com.kanskaeliza.autentica.controller;

import com.kanskaeliza.autentica.entity.Request;
import com.kanskaeliza.autentica.entity.enums.RequestStatus;
import com.kanskaeliza.autentica.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RequestController {
    private final RequestService service;

    @GetMapping("/requests")
    public ResponseEntity<List<Request>> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    @GetMapping("/requests/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        return service.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/requests")
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        if (request == null) {
            return ResponseEntity.badRequest().build();
        }
        Request savedRequest = service.saveRequest(request);
        return ResponseEntity.status(201).body(savedRequest);
    }

    @PutMapping("/requests/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable Long id, @RequestBody Request request) {
        if (request == null) {
            return ResponseEntity.badRequest().build();
        }
        return service.editRequestById(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/requests/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        if (!service.getRequestById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteRequestById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/requests/{id}/status")
    public ResponseEntity<Request> updateRequestStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String statusValue = request.get("status");
        if (statusValue == null) {
            return ResponseEntity.badRequest().build();
        }
        RequestStatus status;
        try {
            status = RequestStatus.valueOf(statusValue.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        return service.changeStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
