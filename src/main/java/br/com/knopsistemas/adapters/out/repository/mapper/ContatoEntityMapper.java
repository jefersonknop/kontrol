package br.com.knopsistemas.adapters.out.repository.mapper;

import org.mapstruct.Mapper;

import br.com.knopsistemas.adapters.out.repository.entity.ContatoEntity;
import br.com.knopsistemas.application.core.domain.Contato;

@Mapper (componentModel = "spring")
public interface ContatoEntityMapper {
	
	ContatoEntity toContatoEntity (Contato contato);

}
