import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HostService } from '../host.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-host-login',
  templateUrl: './host-login.component.html',
  styleUrls: ['./host-login.component.css']
})
export class HostLoginComponent implements OnInit {

  Username : String;
  Password: String;
  loginform;
  logged_user;
  constructor(private formBuilder: FormBuilder, private hostservice: HostService, private router: Router, 
    private userservice: UserService) { }

  ngOnInit()
  {
    this.initform();
    document.body.classList.add("bg-host-login");

  }
initform(){
  this.loginform=this.formBuilder.group
  ({
    username:['', Validators.required],
    password: ['',Validators.required]
  })
}
loginSubmit(formdata)
{   
    if(this.loginform.invalid)
    {
      Swal.fire("Invalid Entry.")
      return;
    }
this.hostservice.getHostbyUsername(formdata.username).subscribe(userobj=>{
this.logged_user=userobj;
if(this.logged_user){
  if(this.logged_user.password==formdata.password)
{
  sessionStorage.setItem("user", JSON.stringify(this.logged_user));
  sessionStorage.setItem("host", 'true');
  this.userservice.setLogin();
  console.log("Login success");
  this.router.navigate(['/hostdash']);
  return;
}else
  Swal.fire({icon : "error",title: "OOps!" ,text: "Invalid Username or password"})
  console.log("password invalid");
  }else{
    Swal.fire({icon : "error",title: "OOps!" ,text: "Invalid Username or password"})
    console.log("user not found");
  }
}
  )
}
ngOnDestroy(){document.body.classList.remove("bg-host-login");}
}