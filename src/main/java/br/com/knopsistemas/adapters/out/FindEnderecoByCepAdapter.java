package br.com.knopsistemas.adapters.out;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.knopsistemas.adapters.out.client.FindEnderecoByCepClient;
import br.com.knopsistemas.adapters.out.client.mapper.EnderecoResponseMapper;
import br.com.knopsistemas.adapters.out.client.response.EnderecoResponse;
import br.com.knopsistemas.application.core.domain.Endereco;
import br.com.knopsistemas.application.ports.out.FindEnderecoByCepOutputPort;

@Component
public class FindEnderecoByCepAdapter implements FindEnderecoByCepOutputPort {
	
	@Autowired
	private FindEnderecoByCepClient findEnderecoByCepClient;
	
	@Autowired
	private EnderecoResponseMapper enderecoResponseMapper;
	

	@Override
	public Endereco find(String cep) {
	    EnderecoResponse enderecoResponse = findEnderecoByCepClient.find(cep);
	    //var enderecoResponse = findEnderecoByCepClient.find(cep);
		return enderecoResponseMapper.toEndereco(enderecoResponse);
	}

}
