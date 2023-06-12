package br.com.knopsistemas.application.ports.in;

import br.com.knopsistemas.application.core.domain.Contato;

public interface InsertContatoInputPort {
	
	void insert(Contato contato);

}
