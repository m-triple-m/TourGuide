import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Username: String;
  Password: String;
  loginform;
  logged_user;
  constructor(private formBuilder: FormBuilder, private userservice: UserService, private router: Router) { }

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
    this.userservice.getByUsername(formdata.username).subscribe(userobj => {
      this.logged_user = userobj;
      if (this.logged_user) {
        if (this.logged_user.password == formdata.password) {
          console.log(this.logged_user);
          sessionStorage.setItem("user", JSON.stringify(this.logged_user));
          this.userservice.setLogin();
          console.log("Login success");
          if (this.logged_user.admin) {
            console.log('admin');
            sessionStorage.setItem("admin", 'true');
            this.router.navigate(['/admin']);
            return;
          }
          this.router.navigate(['/userdashboard']);
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
