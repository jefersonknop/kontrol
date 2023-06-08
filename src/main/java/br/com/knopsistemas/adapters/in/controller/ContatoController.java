package br.com.knopsistemas.adapters.in.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contatos")
public class ContatoController {
	
	@PostMapping
	public ResponseEntity<Void> insert(){
		
	}

}
