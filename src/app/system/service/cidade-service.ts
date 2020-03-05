
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config-service';
import { Cidade } from '../domain/cidade';


@Injectable()
export class CidadeService {
  baseUrl: string = ConfigService.url_Knop_api+ '/cidades';

  constructor(private http: HttpClient) { }
  


    list() {
   
   //  this.http.get<Cidade[]>(this.baseUrl).subscribe(cidades => this.cidades = cidades);    
   //  return this.cidades;
       return this.http.get<Cidade[]>(this.baseUrl);
    }

    getById(id: number) {
      return this.http.get<Cidade>(this.baseUrl + '/' + id);
    }

    createOrUpdate(cidade: Cidade) {
        if (cidade.id != null){
          return this.http.put(this.baseUrl, cidade);
        }
        else{
          return this.http.post(this.baseUrl, cidade);
        }
    }

    
    delete(id: number) {
      return this.http.delete(this.baseUrl + '/' + id);
    }
}