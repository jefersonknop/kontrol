
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/system/service/config-service';
import { Unidade_medida } from '../domain/unidade-medida';
import { SharedService } from 'src/app/system/service/shared.service';




@Injectable()
export class Unidade_medidaService {
  baseUrl: string = ConfigService.url_Kestoque_api+ '/unidades_medida';

  constructor(private http: HttpClient) {
    
   }


   


    list() {
      return this.http.get<Unidade_medida[]>(this.baseUrl + '/inquilino/' +  SharedService.getInstance().usuario.inquilino_id.id);
  
    
    }

    getById(id: number) {
      return this.http.get<Unidade_medida>(this.baseUrl + '/' + id);
    }
    
    createOrUpdate(unidade_medida: Unidade_medida) {
      unidade_medida.inquilino_id = SharedService.getInstance().usuario.inquilino_id.id; 
        if (unidade_medida.id != null){
          return this.http.put(this.baseUrl, unidade_medida);
        }
        else{
          return this.http.post(this.baseUrl, unidade_medida);
        }
    }

    
    delete(id: number) {
      return this.http.delete(this.baseUrl + '/' + id);
    }
}