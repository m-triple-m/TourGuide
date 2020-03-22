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
  
  constructor(private userservice:UserService) { }

  ngOnInit()
   {
    this.ishost = sessionStorage.getItem('host');
    this.isadmin = sessionStorage.getItem('admin');
    console.log(this.ishost);
   }

logout()
{
  this.userservice.logout();
}
  

}
