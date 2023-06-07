package br.com.knopsistemas.adapters.out.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import br.com.knopsistemas.adapters.out.client.response.EnderecoResponse;

@FeignClient(
		name = "FindEnderecoByCepClient",
		url = "${knopsistemas.client.endereco.url}"
)


public interface FindEnderecoByCepClient {

	@GetMapping("/{cep}")
	EnderecoResponse find(@PathVariable("cep") String cep);
}
