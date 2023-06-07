package br.com.knopsistemas.adapters.out.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.knopsistemas.adapters.out.repository.entity.ContatoEntity;

public interface ContatoRepository extends MongoRepository<ContatoEntity, String>{

}
