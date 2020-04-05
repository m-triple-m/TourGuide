import { Component, OnInit } from '@angular/core';
import { HostService } from '../host.service';
import { FormBuilder } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { OrdersService } from '../orders.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
// hosts;
// verification;
// selectedhost;
hostform;
delete = faTrashAlt;
showform = false;

  users;
  orders;
  hosts;
  showstats = true;
  showusers = false;
  showhosts = false;
  showorders = false;
  admin;
constructor(private hostService:HostService, private formbuilder:FormBuilder, private orderservice: OrdersService,
  private userservice: UserService) {}

 ngOnInit() 
  {
    document.body.classList.add('bg-admin');
    this.admin = JSON.parse(sessionStorage.getItem('user'));

    this.hostService.getHost().subscribe(data => {
      this.hosts = data;
    })

    this.orderservice.getOrder().subscribe(data => {
      this.orders = data;
    })

    this.userservice.getUser().subscribe(data => {
      this.users = data;
    })

//   this.verification=this.formbuilder.group({
//   verified:[''],
//   verify:[''],
//   username:['']
// })


// this.refreshData();    
}
  refreshData()
  {
    this.hostService.getHost().subscribe(data=>
    {
      this.hosts=data;
      console.log(data);
      }
      )
  }

  initForm(host)
  {
    this.hostform = this.formbuilder.group(host);
  }

  toggleForm(host)
  {
    this.initForm(host);
    this.showform = true;
  }

deletehost(id)
{
  this.hostService.delete(id).subscribe(data=>
 {
  Swal.fire("deleted");
  this.refreshData(); 
  this.showform=false;
})
}
  submitHostForm(formdata)
  { 
    this.hostService.updateStatus(formdata._id, formdata).subscribe(data => {
      console.log(data);
      this.showform = false;
      this.refreshData();
    });
  }

  toggleStats(){
    this.showstats = true;
    this.showusers = false;
    this.showhosts = false;
    this.showorders = false;
  }

  toggleUsers(){
    this.showstats = false;
    this.showusers = true;
    this.showhosts = false;
    this.showorders = false;
  }

  toggleHosts(){
    this.showstats = false;
    this.showusers = false;
    this.showhosts = true;
    this.showorders = false;
  }

  toggleOrders(){
    this.showstats = false;
    this.showusers = false;
    this.showhosts = false;
    this.showorders = true;
  }

  ngOnDestroy(){
    document.body.classList.remove('bg-admin');
  }
}