package br.com.knopsistemas.application.ports.out;

import br.com.knopsistemas.application.core.domain.Contato;

public interface InsertContatoOutputPort {
	
	void insert (Contato contato);

}
