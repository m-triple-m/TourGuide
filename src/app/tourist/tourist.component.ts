import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tourist',
  templateUrl: './tourist.component.html',
  styleUrls: ['./tourist.component.css']
})
export class TouristComponent implements OnInit 
{
  userform;
  allusers;
  submitted=false;
  faCoffee=faCoffee;
  hide = true;

  constructor(private formBuilder: FormBuilder, private userservice:UserService, private router: Router) 
  {
    this.userform;
  }

  ngOnInit() 
  {
       this.getAllUsers();
       this.userservice.getUser().subscribe((message)=>{console.log(message)});    
       document.body.classList.add("bg-tourist");
       this.userform=this.formBuilder.group({
        name:["",[Validators.required,Validators.maxLength(20)]],
        username:["",Validators.required],
        password:["",[Validators.required, Validators.minLength(5)]],
        confirm:[""],
        address:["",Validators.required],
        email:["",Validators.required],
        admin:false,
        created:new Date(),
       }, 
       {validator : this.matchPassword('password','confirm')})   
    }
    
  
    onusersubmit(formdata)
    {
      this.submitted=true;
    console.log(formdata);
    if(!this.userform.valid)
    {
      return;
    }
    this.userservice.addUser(formdata).subscribe((message)=>{
      console.log(message);
      this.userform.reset();
      this.submitted=false;
      this.router.navigate(['/login']);
      Swal.fire({
        icon: 'success',
        title: 'Welcome to GuideMe',
        text: 'Now login to continue!'
      })
    })

    this.userservice.addUsers(formdata).subscribe((message)=>{
      console.log(message);
     this.userform.reset();
    
         })
  }

  getAllUsers()
  {
    this.userservice.getUser().subscribe((users)=>{
      console.log(users);
      this.allusers=users;
    })
  }
  
    matchPassword(password,confirm_pass)
    {
      return (userform)=> 
      {
        let passControl=userform.controls[password];
        let confirmControl=userform.controls[confirm_pass];
        if(passControl.value !==confirmControl.value)
        {
          confirmControl.setErrors({match:true})
        }
      }
    }

    returnControls()
    {
    return this.userform.controls;
    }

    ngOnDestroy(){
      document.body.classList.remove("bg-tourist");
    }  
  }


