
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


   list(): Observable<Cidade[]> {  
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
    
  



    getById(id: number) {
      return this.http.get<Cidade>(this.baseUrl + '/' + id);
    }

    createOrUpdate(cidade: Cidade) {
       this.clearCache(); 
        if (cidade.id != null){
          return this.http.put(this.baseUrl, cidade);
        }
        else{
          return this.http.post(this.baseUrl, cidade);
        }
    }

    
    delete(id: number) {
      this.clearCache(); 
      return this.http.delete(this.baseUrl + '/' + id);
    }



    

 clearCache() {
     this.cidades = null;
  }




  //********************************************** */
  listByEstado_id(estado_id: number): Observable<Cidade[]> {  
   // if (!this.cidades) {
        this.cidades = this.http.get(this.baseUrl + '/estado/' +estado_id).pipe(
          map((response: any) => {
            return response
          }),
            publishReplay(1), // this tells Rx to cache the latest emitted
            refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
        );
   // }
    return this.cidades;
 }

 listByEstado(nome: string): Observable<Cidade[]> {  

       this.cidades = this.http.get(this.baseUrl + '/estado/nome/' +nome).pipe(
         map((response: any) => {
           return response
         }),
           publishReplay(1), // this tells Rx to cache the latest emitted
           refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
       );

   return this.cidades;
}


listBySiglaEstado(sigla: string) {  

  return this.http.get<Cidade[]>(this.baseUrl + '/estado/sigla/' +sigla);
  
  
}




}