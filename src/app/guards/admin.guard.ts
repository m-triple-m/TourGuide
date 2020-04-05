import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private user: UserService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let ishost = JSON.parse(sessionStorage.getItem('isadmin'))
      if(ishost && this.user.loggedin)
      {
        return true;
      }
      
      Swal.fire({
        title : "New Here?",
        text : "You Need to login as Admin",
        icon : "warning",
        confirmButtonText: 'Login Now'
      }).then((result) => {
        if(result.value)
          this.router.navigate(['/login']);
      })
       return false;
      }
  }