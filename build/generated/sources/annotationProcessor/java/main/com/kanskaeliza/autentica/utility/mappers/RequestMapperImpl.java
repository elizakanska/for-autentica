package com.kanskaeliza.autentica.utility.mappers;

import com.kanskaeliza.autentica.entity.Request;
import com.kanskaeliza.autentica.entity.User;
import com.kanskaeliza.autentica.entity.dto.RequestDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-02-10T20:04:51+0200",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.12.1.jar, environment: Java 17.0.14 (Amazon.com Inc.)"
)
@Component
public class RequestMapperImpl implements RequestMapper {

    @Override
    public RequestDTO requestToDTO(Request request) {
        if ( request == null ) {
            return null;
        }

        RequestDTO requestDTO = new RequestDTO();

        requestDTO.setUserId( requestUserId( request ) );
        requestDTO.setId( request.getId() );
        requestDTO.setHardwareType( request.getHardwareType() );
        requestDTO.setParameters( request.getParameters() );
        requestDTO.setJustification( request.getJustification() );
        requestDTO.setRequestTime( request.getRequestTime() );
        requestDTO.setStatus( request.getStatus() );

        return requestDTO;
    }

    @Override
    public Request dtoToRequest(RequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Request request = new Request();

        request.setId( dto.getId() );
        request.setHardwareType( dto.getHardwareType() );
        request.setParameters( dto.getParameters() );
        request.setJustification( dto.getJustification() );
        request.setRequestTime( dto.getRequestTime() );
        request.setStatus( dto.getStatus() );

        return request;
    }

    private Long requestUserId(Request request) {
        if ( request == null ) {
            return null;
        }
        User user = request.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
