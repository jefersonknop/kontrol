
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config-service';
import { Usuario } from '../domain/usuario';


@Injectable()
export class UsuarioService {
  baseUrl: string = ConfigService.url_Knop_api+ '/usuarios';
  urlAuth: string = ConfigService.url_Knop_api+ '/api/auth';

  constructor(private http: HttpClient) { }


  login(usuario: Usuario){
    return this.http.post(this.urlAuth, usuario);
  }


  list() {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<Usuario>(this.baseUrl + '/' + id);
  }

  createOrUpdate(usuario: Usuario) {
      if (usuario.id != null){
         return this.http.put(this.baseUrl, usuario);
      }
      else{
         return this.http.post(this.baseUrl, usuario);
      }
  }

  

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}