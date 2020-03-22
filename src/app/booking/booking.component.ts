import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import {FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  bookings;
  current_user;
  host_id;
  
  minDate: Date;
  mDate: Date;
  maxDate: Date;
  constructor(private order:OrdersService, private formBuilder:FormBuilder, private route: ActivatedRoute,
    private router: Router)
   {
    this.minDate=new Date();
    this.mDate=new Date();
   }

  ngOnInit()
  {

    this.host_id = this.route.snapshot.paramMap.get('hostid');
    this.current_user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.current_user)
    this.initform();
  }

  initform(){
    this.bookings=this.formBuilder.group({
      booked:new Date(),
      startDate:'',
      endDate:'',
      user: this.current_user._id,
      host: this.host_id,
      verified: false,
      complete: false,
    }, {validator : this.setDate('startDate')})
  }

  setDate(name){
    return (formdata) => {
      let startdate = formdata.controls[name].value;
      if(startdate){
        this.mDate.setDate(startdate.getDate() + 1);
        console.log(this.mDate);
      }
        
    }
  }
 

  booking(formdata)
  {
    console.log(formdata);
    this.order.addOrder(formdata).subscribe((message)=>
    {
      console.log(message); 
      this.router.navigate(['/userdashboard'])
      Swal.fire({
        icon: 'success',
        title: 'Booking Requested',
        text: 'You will be informed once the booking is confirmed from the host end!'
      })
    })
  }
}
