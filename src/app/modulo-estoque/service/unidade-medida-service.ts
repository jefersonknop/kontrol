
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/system/service/config-service';
import { Unidade_medida } from '../domain/unidade-medida';
import { SharedService } from 'src/app/system/service/shared.service';

import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';








@Injectable()
export class Unidade_medidaService {
  baseUrl: string = ConfigService.url_Kestoque_api+ '/unidades_medida';

  unidades_medida: Observable<Unidade_medida[]>= null;//** */

  constructor(private http: HttpClient) {
    
   }



    list(): Observable<Unidade_medida[]> {

      // Cache it once if unidades_medida value is false
      if (!this.unidades_medida) {
          this.unidades_medida = this.http.get(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id).pipe(
            map((response: any) => {
              return response
            }),
              publishReplay(1), // this tells Rx to cache the latest emitted
              refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
          );
      }


      return this.unidades_medida;
  }


  //  list() {
  //    return this.http.get<Unidade_medida[]>(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id);
     
  //  }

    getById(id: number) {
      return this.http.get<Unidade_medida>(this.baseUrl + '/' + id);
    }
    
    createOrUpdate(unidade_medida: Unidade_medida) {
      unidade_medida.inquilino_id = SharedService.getInstance().usuario.inquilino_id.id; 
    //  this.clearCache(); 
        if (unidade_medida.id != null){
          return this.http.put(this.baseUrl, unidade_medida);
        
        }
        else{
          return this.http.post(this.baseUrl, unidade_medida);
        }
       
    }

    
    delete(id: number) {
      this.clearCache(); 
      return this.http.delete(this.baseUrl + '/' + id);
    }





    


 clearCache() {
     this.unidades_medida = null;
  }
}