import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import {FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { HostService } from '../host.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  bookform;
  current_user;
  host;
  booked=false;
  
  minDate: Date;
  mDate: Date;
  maxDate: Date;
  constructor(private order:OrdersService, private formBuilder:FormBuilder, private route: ActivatedRoute,
    private router: Router, private hostservice: HostService)
   {
    this.minDate=new Date();
    this.mDate=new Date();
   }

  ngOnInit()
  {
    let host_id = this.route.snapshot.paramMap.get('hostid');
    this.getHost(host_id);
    this.current_user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.current_user)
    this.initform(host_id);
  }

  getHost(host_id){
    this.hostservice.getHostbyId(host_id).subscribe(data => {
      console.log(data);
      this.host = data;
    })
  }

  initform(host_id){
    this.bookform=this.formBuilder.group({
      booked:new Date(),
      startDate:['', Validators.required],
      endDate:['', Validators.required],
      user: this.current_user._id,
      host: host_id,
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

  initiateOrder(){
    if(this.bookform.invalid){
      Swal.fire({
            icon: 'error',
            title: 'Invalid Request',
            text: 'Fill complete details to initiate a order!'
          })
      return;
    }
    this.booked = true;
  }
}
