package br.com.knopsistemas.application.core.usecase;

import br.com.knopsistemas.application.core.domain.Contato;
import br.com.knopsistemas.application.ports.out.FindEnderecoByCepOutputPort;
import br.com.knopsistemas.application.ports.out.InsertContatoOutputPort;

public class InsertContatoUserCase {
	
	private final FindEnderecoByCepOutputPort findEnderecoByCepOutputPort;
	private final InsertContatoOutputPort insertContatoOutputPort;
	
	public InsertContatoUserCase(FindEnderecoByCepOutputPort findEnderecoByCepOutputPort,
								 InsertContatoOutputPort insertContatoOutputPort) {
		this.findEnderecoByCepOutputPort = findEnderecoByCepOutputPort;
		this.insertContatoOutputPort = insertContatoOutputPort;
	}
	
	public void insert(Contato contato) {
		var endereco = findEnderecoByCepOutputPort.find(contato.getCep());
		contato.setEndereco(endereco);
		insertContatoOutputPort.insert(contato);		
	}

}
