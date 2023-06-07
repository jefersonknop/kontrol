package br.com.knopsistemas.adapters.out.repository.entity;

import lombok.Data;

@Data
public class EnderecoEntity {
	private String logradouro;
	private String bairro;
	private String cidade;
	private String estado;

}
