
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/system/service/config-service';
import { SharedService } from 'src/app/system/service/shared.service';

import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { AdmModulo } from '../domain/admModulo';








@Injectable()
export class AdmModuloService {
  baseUrl: string = ConfigService.url_Knop_api+ '/admModulos';

  admModulos: Observable<AdmModulo[]>= null;//** */

  constructor(private http: HttpClient) {
    
   }



  list(): Observable<AdmModulo[]> {

      // Cache it once if AdmModulo value is false
      if (!this.admModulos) {
          this.admModulos = this.http.get(this.baseUrl).pipe(
            map((response: any) => {
              return response
            }),
              publishReplay(1), // this tells Rx to cache the latest emitted
              refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
          );
      }


      return this.admModulos;
  }


  //  list() {
  //    return this.http.get<Unidade_medida[]>(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id);
     
  //  }

    getById(id: number) {
      return this.http.get<AdmModulo>(this.baseUrl + '/' + id);
    }
    
    createOrUpdate(admModulo: AdmModulo) {
      
      this.clearCache(); 
        if (admModulo.id != null){
          return this.http.put(this.baseUrl, admModulo);
        
        }
        else{
          return this.http.post(this.baseUrl, admModulo);
        }
       
    }

    
    delete(id: number) {
      this.clearCache(); 
      return this.http.delete(this.baseUrl + '/' + id);
    }





    


 clearCache() {
     this.admModulos = null;
  }
}