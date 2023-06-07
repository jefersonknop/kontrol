package br.com.knopsistemas.adapters.out.client.mapper;

import org.mapstruct.Mapper;

import br.com.knopsistemas.adapters.out.client.response.EnderecoResponse;
import br.com.knopsistemas.application.core.domain.Endereco;

@Mapper(componentModel = "spring")
public interface EnderecoResponseMapper {
	
	Endereco toEndereco (EnderecoResponse enderecoResponse);

}
