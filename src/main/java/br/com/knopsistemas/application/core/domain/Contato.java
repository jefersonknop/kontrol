package br.com.knopsistemas.application.core.domain;

public class Contato {
	private String id;
	private String nome;
	private String cpf;
	private String cep;
	private Endereco endereco;
	private String numero;
	private String telefone;
	private String email;
	private String informacoes;
	private Boolean cpfValido;
	
	
	public Contato() {
		this.cpfValido = false;	
	}

	public Contato(String id, String nome, String cpf, String cep, Endereco endereco, String numero, String telefone,
			String email, String informacoes, Boolean cpfValido) {
		super();
		this.id = id;
		this.nome = nome;
		this.cpf = cpf;
		this.cep = cep;
		this.endereco = endereco;
		this.numero = numero;
		this.telefone = telefone;
		this.email = email;
		this.informacoes = informacoes;
		this.cpfValido = cpfValido;
	}
	

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public Endereco getEndereco() {
		return endereco;
	}
	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getInformacoes() {
		return informacoes;
	}
	public void setInformacoes(String informacoes) {
		this.informacoes = informacoes;
	}
	
	public Boolean getCpfValido() {
		return cpfValido;
	}
	public void setCpfValido(Boolean cpfValido) {
		this.cpfValido = cpfValido;
	}
	
	
	

}
