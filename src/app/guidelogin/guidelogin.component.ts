import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { GuideService } from '../guide.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-guidelogin',
  templateUrl: './guidelogin.component.html',
  styleUrls: ['./guidelogin.component.css']
})
export class GuideloginComponent implements OnInit {

  Username: String;
  Password: String;
  loginform;
  logged_user;
  constructor(private formBuilder: FormBuilder,private userservice: UserService, private guideservice: GuideService, private router: Router) { }

  ngOnInit() {
    this.initform();
    document.body.classList.add("bg-login");

  }
  initform() {
    this.loginform = this.formBuilder.group
      ({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
  }
  loginSubmit(formdata) {
    if (this.loginform.invalid) {
      Swal.fire("Invalid Entry.")
      return;
    }
    this.guideservice.getByUsername(formdata.username).subscribe(userobj => {
      this.logged_user = userobj;
      console.log(this.logged_user);
      if (this.logged_user) {
        if (this.logged_user.password == formdata.password) {
          console.log(this.logged_user);
          sessionStorage.setItem("user", JSON.stringify(this.logged_user));
          sessionStorage.setItem("isguide", JSON.stringify(true));
          this.userservice.setLogin();
          console.log("Login success");
          this.router.navigate(['/guidedash']);
        }

        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or Password is invalid!'
          })
          console.log("Password invalid");
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Username or Password is invalid!'
        })
        console.log("User not found");
      }
    }

    )
  }
  ngOnDestroy() { document.body.classList.remove("bg-login"); }

}
