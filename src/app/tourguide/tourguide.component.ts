import {FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import{TourguideService} from '../tourguide.service'
import Swal from 'sweetalert2';



@Component({
  selector: 'app-tourguide',
  templateUrl: './tourguide.component.html',
  styleUrls: ['./tourguide.component.css']
})
export class TourguideComponent implements OnInit {
  forms;
  allusers;
  submitted=false;
  hide = true;

  constructor(private formBuilder:FormBuilder, private userservice:TourguideService) { this.forms; }
    LangList: string[] = ['Hindi', 'English', 'Tamil', 'Telugu', 'Punjabi', 'Malayalam', 'Urdu'];
  ngOnInit() {
    this.getAllTourGuide();
    document.body.classList.add("bg-r");
     this.forms=this.formBuilder.group({
     name:["",[Validators.required,Validators.maxLength(20)]],
     username:["",Validators.required],
     password:["",[Validators.required, Validators.minLength(5)]],
     confirm:"",
     address:["",Validators.required],
     email:["",Validators.required],
     phone:["", [Validators.required, Validators.maxLength(10)]],
     languages:[""],
     city:'',
     admin:false,
       tourist:false,
       tourguide:true,
       host:false,
   }, {validator : this.matchPassword('password','confirm')})
  }

  onsubmit(formdata){
    this.submitted=true;
  console.log(formdata);
  if(!this.forms.valid){
    return;
  }
  this.userservice.addTourguide(formdata).subscribe((message)=>{
console.log(message);
this.forms.reset();
this.submitted=false;

  })
  // this.userservice.addUser(formdata).subscribe((message)=>{
  //   console.log(message);
  //   console.log('users');
  //   this.forms.reset();
  //   this.submitted=false;})

}

  matchPassword(password,confirm_pass)
  {
    return (forms)=> 
    {
      let passControl=forms.controls[password];
      let confirmControl=forms.controls[confirm_pass];
      if(passControl.value !==confirmControl.value)
      {
        confirmControl.setErrors({match:true})
      }     
    }
 }

  returnControls()
  {
    return this.forms.controls;
  }

  getAllTourGuide()
  {
    this.userservice.getTourGuide().subscribe((users)=>{
      console.log(users);
      this.allusers=users;
    })
  }

  ngOnDestroy(){document.body.classList.remove("bg-r");}
}




  


