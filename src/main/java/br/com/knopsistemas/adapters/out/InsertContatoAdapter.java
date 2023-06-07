package br.com.knopsistemas.adapters.out;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.knopsistemas.adapters.out.repository.ContatoRepository;
import br.com.knopsistemas.adapters.out.repository.entity.ContatoEntity;
import br.com.knopsistemas.adapters.out.repository.mapper.ContatoEntityMapper;
import br.com.knopsistemas.application.core.domain.Contato;
import br.com.knopsistemas.application.ports.out.InsertContatoOutputPort;

@Component
public class InsertContatoAdapter implements InsertContatoOutputPort {
	
	@Autowired
	private ContatoRepository contatoRepository;
	
	@Autowired
	private ContatoEntityMapper contatoEntityMapper;

	@Override
	public void insert(Contato contato) {
		ContatoEntity contatoEntity = contatoEntityMapper.toContatoEntity(contato);
		contatoRepository.save(contatoEntity);
		
	}

}
