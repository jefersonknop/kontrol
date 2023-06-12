package br.com.knopsistemas.adapters.in.controller.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.com.knopsistemas.adapters.in.controller.request.ContatoRequest;
import br.com.knopsistemas.application.core.domain.Contato;

@Mapper(componentModel = "spring")
public interface ContatoMapper {
	
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "endereco", ignore = true)
	@Mapping(target = "cpfValido", ignore = true)
	Contato toContato(ContatoRequest contatoRequest);

}
