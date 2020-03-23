
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config-service';
import { Cidade } from '../domain/cidade';

import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';


@Injectable()
export class CidadeService {
  baseUrl: string = ConfigService.url_Knop_api+ '/cidades';

  cidades: Observable<Cidade[]>;//** */

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



    //********************************* */

    // Get configs from server | HTTP GET
    getCidades(): Observable<Cidade[]> {

      // Cache it once if configs value is false
      if (!this.cidades) {
          this.cidades = this.http.get(this.baseUrl).pipe(
            map((response: any) => {
              return response
            }),
              publishReplay(1), // this tells Rx to cache the latest emitted
              refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
          );
      }


      return this.cidades;
  }


 clearCache() {
     this.cidades = null;
  }






}