
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config-service';
import { Inquilino } from '../domain/inquilino';


@Injectable()
export class InquilinoService {
  baseUrl: string = ConfigService.url_Knop_api+ '/iquilinos';

  constructor(private http: HttpClient) { }


    list() {
      return this.http.get<Inquilino[]>(this.baseUrl);
    }

    getById(id: number) {
      return this.http.get<Inquilino>(this.baseUrl + '/' + id);
    }

    createOrUpdate(inquilino: Inquilino) {
        if (inquilino.id != null){
          return this.http.put(this.baseUrl, inquilino);
        }
        else{
          return this.http.post(this.baseUrl, inquilino);
        }
    }

    
    delete(id: number) {
      return this.http.delete(this.baseUrl + '/' + id);
    }
}