import {FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import{TourguideService} from '../tourguide.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



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
  avatar;
  displayImg;

  constructor(private formBuilder:FormBuilder, private guideservice:TourguideService, private router: Router) { this.forms; }
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
  console.log(formdata);
  if(!this.forms.valid){
    return;
  }
  formdata.avatar = this.avatar;
  this.guideservice.addTourguide(formdata).subscribe((message)=>{
  console.log(message);
  this.forms.reset();
  Swal.fire({
    title : 'Welcome to GuideMe',
    text : 'Now Login to continue',
    icon : 'success'
  }).then(() => {
    this.router.navigate(['/guidelogin'])
  })

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
    this.guideservice.getTourGuide().subscribe((users)=>{
      console.log(users);
      this.allusers=users;
    })
  }

  setImage(event){
    let files = event.target.files;
    if(files.length===0)
      return;

    var mimeType=files[0].type;
    if(mimeType.match(/image\/*/)==null)
    { 
      Swal.fire("Images Only");
      return;
    }
    this.preview(event.target.files)
    let formData=new FormData();
    let selectedFile=files[0];
    this.avatar=selectedFile.name;
    formData.append('image', selectedFile, selectedFile.name);
    this.guideservice.uploadImage(formData).subscribe(data=>
      {
      console.log(data)
      })
  }

  preview(files) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => { 
      this.displayImg = reader.result;
    }
  }

  ngOnDestroy(){document.body.classList.remove("bg-r");}
}




  


