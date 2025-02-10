package com.kanskaeliza.autentica.utility.mappers;

import com.kanskaeliza.autentica.entity.Request;
import com.kanskaeliza.autentica.entity.dto.RequestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RequestMapper {
    @Mapping(target = "userId", source = "user.id")
    RequestDTO requestToDTO(Request request);

    @Mapping(target = "user", ignore = true)
    Request dtoToRequest(RequestDTO dto);
}


