import { Fabricante } from './../domain/fabricante';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/system/service/config-service';
import { SharedService } from 'src/app/system/service/shared.service';




@Injectable()
export class FabricanteService {
  baseUrl: string = ConfigService.url_Kestoque_api+ '/fabricantes';

  constructor(private http: HttpClient) {
    
   }


   


    list() {
      return this.http.get<Fabricante[]>(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id);
  
    
    }

    getById(id: number) {
      return this.http.get<Fabricante>(this.baseUrl + '/' + id);
    }
    
    createOrUpdate(fabricante: Fabricante) {
      fabricante.inquilino_id = SharedService.getInstance().usuario.inquilino_id.id; 
        if (fabricante.id != null){
          return this.http.put(this.baseUrl, fabricante);
        }
        else{
          return this.http.post(this.baseUrl, fabricante);
        }
    }

    
    delete(id: number) {
      return this.http.delete(this.baseUrl + '/' + id);
    }
}