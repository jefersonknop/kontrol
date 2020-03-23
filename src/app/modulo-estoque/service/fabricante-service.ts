import { Fabricante } from './../domain/fabricante';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/system/service/config-service';
import { SharedService } from 'src/app/system/service/shared.service';

import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';





@Injectable()
export class FabricanteService {
  baseUrl: string = ConfigService.url_Kestoque_api+ '/fabricantes';
  fabricantes: Observable<Fabricante[]>= null;

  constructor(private http: HttpClient) {
    
   }


   list(): Observable<Fabricante[]> {
  
    if (!this.fabricantes) {
        this.fabricantes = this.http.get(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id).pipe(
          map((response: any) => {
            return response
          }),
            publishReplay(1), // this tells Rx to cache the latest emitted
            refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
        );
    }
    return this.fabricantes;
}


   // list() {
    //  return this.http.get<Fabricante[]>(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id);
  
  //  

    getById(id: number) {
      return this.http.get<Fabricante>(this.baseUrl + '/' + id);
    }
    
    createOrUpdate(fabricante: Fabricante) {
      fabricante.inquilino_id = SharedService.getInstance().usuario.inquilino_id.id; 
       this.clearCache(); 
        if (fabricante.id != null){
          return this.http.put(this.baseUrl, fabricante);
        }
        else{
          return this.http.post(this.baseUrl, fabricante);
        }
    }

    
    delete(id: number) {
      this.clearCache(); 
      return this.http.delete(this.baseUrl + '/' + id);
    }



    clearCache() {
      this.fabricantes = null;
   }
}