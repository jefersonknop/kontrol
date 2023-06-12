package br.com.knopsistemas.adapters.in.controller.request;



import javax.validation.constraints.NotBlank;

import br.com.knopsistemas.application.core.domain.Endereco;
import lombok.Data;

@Data
public class ContatoRequest {	
	@NotBlank
	private String nome;
	@NotBlank
	private String cpf;
	@NotBlank
	private String cep;	
	private String numero;
	private String telefone;
	private String email;
	private String informacoes;
	

}
