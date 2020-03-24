import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBuilder, Validators} from '@angular/forms';
import { HostService } from '../host.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  hosts;
  imagePath;
  imgURL;
  message;
  selectedFile;
  avatarName;
  forms;
  submitted;

  constructor(private formBuilder:FormBuilder, private hostService:HostService) { this.hosts;}
  isLinear = false;
  hide = true;
  ngOnInit() {
    
    document.body.classList.add("bg-host");
    
    this.hosts=this.formBuilder.group({
      name:['', Validators.required],
      username:["", [Validators.required, Validators.minLength(5)]],
      password:['', Validators.required],
      confirm:['', Validators.required],
      email:["", [Validators.required, Validators.email]],
      phone:["", [Validators.required, Validators.maxLength(10)]],
      avatar:[""],
      state:["", Validators.required],
      city:["", Validators.required],
      address:["", Validators.required],
      aadhaar:["", [Validators.required, Validators.maxLength(12)]],
      verified:false,
      images:[],
    },
    {validator : this.matchPassword('password','confirm')})
    console.log(sessionStorage.getItem('user'));
  }

  onfileUpload(event)
  {
    console.log(event.target.files);
    this.uploadImage(event);
  }

    matchPassword(password,confirm_pass)
    {
      return (hosts)=> 
      {
        let passControl=hosts.controls[password];
        let confirmControl=hosts.controls[confirm_pass];
        if(passControl.value !==confirmControl.value)
        {
          confirmControl.setErrors({match:true})
        }
     }
   }

  uploadImage(event)
  {
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
    this.selectedFile=files[0];
    this.avatarName=this.selectedFile.name;
    console.log(this.avatarName);
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.hostService.uploadImage(formData).subscribe(response=>
      {
      console.log(response.message)
      })
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }
  }

UserSubmit()
{
  let formdata = this.hosts.value;
  console.log(formdata);
  if(!(this.hosts.valid && this.avatarName))
  {
    Swal.fire("You Forgot Something", "question");
    return;
  }
  
  formdata.avatar=this.avatarName;
    this.hostService.addHost(formdata).subscribe((message)=>{
    console.log(message);
    this.hosts.reset();
  });

}
ngOnDestroy()
{
  document.body.classList.remove("bg-host");
}

returnControls()
{
return this.hosts.controls;
}

}
