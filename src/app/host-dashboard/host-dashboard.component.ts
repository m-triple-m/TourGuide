import { Component, OnInit } from '@angular/core';
import { HostService } from '../host.service';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent implements OnInit {

  bookings;
  host;
  constructor(private orderService: OrdersService, private activeroute: ActivatedRoute, private hostservice: HostService) { }

  ngOnInit() {
    let host_id = JSON.parse(sessionStorage.getItem('user'))._id;
    this.hostservice.getHostbyId(host_id).subscribe(data => {
      console.log(data);
      this.host = data;
    })
    this.getallOrders(host_id);
  }

  getallOrders(host_id){
    this.orderService.getOrderByHost(host_id).subscribe(data => {
      console.log(data);
      this.bookings = data;
    })
  }

  confirmBooking(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "By Confirming you agree Terms and conditions with user",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    }).then((result) => {
      if(result.value){
        this.updateOrder(id);
      }
    })
  }

  updateOrder(id){
    this.orderService.updateOrder(id, {verified: true}).subscribe(data => {
      console.log(data);
      this.getallOrders(this.host._id);
      Swal.fire({
        icon: 'success',
        title: 'Confirmed',
      })
    });
  }

  completed(date){
    return new Date() > new Date(date);
  }

}
