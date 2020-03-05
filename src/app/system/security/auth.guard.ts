import { CanActivate, Router} from '@angular/router';

import { Injectable } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Injectable()
export class AuthGuard implements CanActivate{

    public shared: SharedService; 

    constructor (private router: Router){
        this.shared = SharedService.getInstance();
    }

    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot,                
        state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
       if (this.shared.isLoggedIn()){
          return true; 
       }
       this.router.navigate(['/login'])
       return false;
    }

  

}