
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/system/service/config-service';
import { SharedService } from 'src/app/system/service/shared.service';

import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { ProdutoMarca } from '../domain/produtoMarca';








@Injectable()
export class ProdutoMarcaService {
  baseUrl: string = ConfigService.url_Knop_api+ '/produtoMarcas';

  produtoMarcas: Observable<ProdutoMarca[]>= null;//** */

  constructor(private http: HttpClient) {
    
   }



  list(): Observable<ProdutoMarca[]> {

      // Cache it once if ProdutoMarca value is false
      if (!this.produtoMarcas) {
          this.produtoMarcas = this.http.get(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id).pipe(
            map((response: any) => {
              return response
            }),
              publishReplay(1), // this tells Rx to cache the latest emitted
              refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
          );
      }


      return this.produtoMarcas;
  }


  //  list() {
  //    return this.http.get<Unidade_medida[]>(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id);
     
  //  }

    getById(id: number) {
      return this.http.get<ProdutoMarca>(this.baseUrl + '/' + id);
    }
    
    createOrUpdate(produtoMarca: ProdutoMarca) {
      produtoMarca.inquilino_id = SharedService.getInstance().usuario.inquilino_id.id; 
      this.clearCache(); 
        if (produtoMarca.id != null){
          return this.http.put(this.baseUrl, produtoMarca);
        
        }
        else{
          return this.http.post(this.baseUrl, produtoMarca);
        }
       
    }

    
    delete(id: number) {
      this.clearCache(); 
      return this.http.delete(this.baseUrl + '/' + id);
    }





    


 clearCache() {
     this.produtoMarcas = null;
  }
}