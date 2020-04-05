import { Component, OnInit } from '@angular/core';
import { faHome, faSignInAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  faHome = faHome;
  faSignInAlt=faSignInAlt;
  faUser=faUser;
  ishost;
  isadmin;
  isguide;

  loggedin = false;
  
  constructor(private userservice:UserService) { }

  ngOnInit()
   {
     let user = JSON.parse(sessionStorage.getItem('user'))
     if(user){
       this.loggedin = true;
     }
    this.ishost = sessionStorage.getItem('ishost');
    this.isadmin = sessionStorage.getItem('isadmin');
    this.isguide = sessionStorage.getItem('isguide');
    // console.log(this.ishost);
   }
   

logout()
{
  this.userservice.logout();
}
  

}
