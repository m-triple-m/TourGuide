import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
otp;
resetForm;
showReset=false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private user:UserService ) { }

  ngOnInit() 
  {
    this.initForms();
  }

  initForms()
  {
    this.resetForm=this.formBuilder.group({
otp:'',
new:['',Validators.minLength(5)],
confirm:''
    }, {validation: this.matchPassword('new','confirm')})
  }
  
  sendOTP(email){
    this.showReset=true;
    this.otp=Math.floor(1000+Math.random()*9000)
    this.sendMail({from: 'pulkitsrivastava13@gmail.com',
    to: 'pulkitsrivastava13@gmail.com',
    message:` Your OTP for reseting password is ${this.otp}`})
    .subscribe((data) =>
    {
      console.log(data);
    })
  }
  
sendMail(data){
  return this.http.post('http://localhost:3000/util/sendmail', data);
}
matchPassword(password,confirm_pass){
  return (userform)=> {
    let passControl=userform.controls[password];
    let confirmControl=userform.controls[confirm_pass];

    if(passControl.value !==confirmControl.value)
    {
      confirmControl.setErrors({match:true})
    }
    }
  }
    resetPassword(formdata){
    console.log(this.otp)
    if(this.otp == formdata.otp)
    { 
      console.log("Correct OTP");
      this.user.changePass(formdata,confirm).subscribe(data => {
      console.log(data);  
    })
      return;
    }
    alert("Invalid OTP");
  }
}
