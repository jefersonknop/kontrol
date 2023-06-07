package br.com.knopsistemas.adapters.out.client.response;

import lombok.Data;

@Data
public class EnderecoResponse {
	private String logradouro;
	private String bairro;
	private String cidade;
	private String estado;

}
