package br.com.knopsistemas.adapters.out.repository.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "contatos")
public class ContatoEntity {
	@Id
	private String id;
	private String nome;
	private String cpf;
	private String cep;
	private EnderecoEntity endereco;
	private String numero;
	private String telefone;
	private String email;
	private String informacoes;
	private Boolean cpfValido;
	

}
