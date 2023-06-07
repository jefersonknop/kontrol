package br.com.knopsistemas.application.ports.out;

import br.com.knopsistemas.application.core.domain.Endereco;

public interface FindEnderecoByCepOutputPort {
	
	Endereco find (String cep);
}
