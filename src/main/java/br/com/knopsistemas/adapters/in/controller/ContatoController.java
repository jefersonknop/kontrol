package br.com.knopsistemas.adapters.in.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.knopsistemas.adapters.in.controller.mapper.ContatoMapper;
import br.com.knopsistemas.adapters.in.controller.request.ContatoRequest;
import br.com.knopsistemas.application.core.domain.Contato;
import br.com.knopsistemas.application.ports.in.InsertContatoInputPort;

@RestController
@RequestMapping("/api/v1/contatos")
public class ContatoController {
	
	@Autowired
	private InsertContatoInputPort insertContatoInputPort;
	

	@Autowired
	private ContatoMapper contatoMapper;
	
	@PostMapping
	public ResponseEntity<Void> insert(@Valid @RequestBody ContatoRequest contatoRequest){
		Contato contato = contatoMapper.toContato(contatoRequest);
		insertContatoInputPort.insert(contato);
		return ResponseEntity.ok().build();
	}
	

}
