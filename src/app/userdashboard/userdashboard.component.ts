import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {


  currentuser;
  bookings;
  editform;

  showeditform = false;
  showbookings = false;

  constructor(private formbuilder: FormBuilder,private userService: UserService,
    private orderservice: OrdersService) { }

  ngOnInit()
  {
    this.currentuser = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.currentuser);
    document.body.classList.add('bg-userdashboard');
    this.getallOrders(this.currentuser._id);
    this.initForm();
  }

  initForm(){
    this.editform = this.formbuilder.group(this.currentuser);
  }

  updateUser(formdata){
    this.userService.updateUser(this.currentuser._id, formdata).subscribe(data => {
      console.log(data);
      this.currentuser = data;
    })
  }

  getallOrders(user_id){
    this.orderservice.getOrderByUser(user_id).subscribe(data => {
      console.log(data);
      this.bookings = data;
    })
  }

  toggleBookings(){
    this.showeditform = false;
    this.showbookings = true;
  }

  toggleEditForm(){
    this.showeditform = true;
    this.showbookings = false;
  }

}
