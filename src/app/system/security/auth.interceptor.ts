import { HttpInterceptor, HttpRequest, HttpEvent} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  

    shared: SharedService;

    constructor(){
        this.shared = SharedService.getInstance();
    }


    intercept(req: HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<HttpEvent<any>> {
        let authRequest : any;

        if (this.shared.isLoggedIn()){
            authRequest = req.clone({
                setHeaders: {
                    'Authorization' : this.shared.token
                 //  'Authorization' :SharedService.getInstance().token
                }
            });
            return next.handle(authRequest);
        }
        else{
            return next.handle(req);
       }

     
    }
    


  

}