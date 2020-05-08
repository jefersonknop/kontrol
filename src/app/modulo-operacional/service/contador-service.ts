
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/system/service/config-service';
import { SharedService } from 'src/app/system/service/shared.service';

import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Contador } from '../domain/contador';








@Injectable()
export class ContadorService {
  baseUrl: string = ConfigService.url_Knop_api+ '/contadores';

  contadors: Observable<Contador[]>= null;//** */

  constructor(private http: HttpClient) {
    
   }



  list(): Observable<Contador[]> {

      // Cache it once if Contador value is false
      if (!this.contadors) {
          this.contadors = this.http.get(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id).pipe(
            map((response: any) => {
              return response
            }),
              publishReplay(1), // this tells Rx to cache the latest emitted
              refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
          );
      }


      return this.contadors;
  }



    getById(id: number) {
      return this.http.get<Contador>(this.baseUrl + '/' + id);
    }
    
    createOrUpdate(contador: Contador) {
      contador.inquilino_id = SharedService.getInstance().usuario.inquilino_id.id; 
      this.clearCache(); 
        if (contador.id != null){
          return this.http.put(this.baseUrl, contador);
        
        }
        else{
          return this.http.post(this.baseUrl, contador);
        }
       
    }

    
    delete(id: number) {
      this.clearCache(); 
      return this.http.delete(this.baseUrl + '/' + id);
    }





    


 clearCache() {
     this.contadors = null;
  }
}