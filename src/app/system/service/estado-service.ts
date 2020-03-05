
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config-service';
import { Estado } from '../domain/estado';


@Injectable()
export class EstadoService {
  baseUrl: string = ConfigService.url_Knop_api+ '/estados';

  constructor(private http: HttpClient) { }


  list() {
    return this.http.get<Estado[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<Estado>(this.baseUrl + '/' + id);
  }

  createOrUpdate(estado: Estado) {
      if (estado.id != null){
         return this.http.put(this.baseUrl, estado);
      }
      else{
         return this.http.post(this.baseUrl, estado);
      }
  }

  

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}