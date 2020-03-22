import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HostService } from '../host.service';
import { OrdersService } from '../orders.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hostmanage',
  templateUrl: './hostmanage.component.html',
  styleUrls: ['./hostmanage.component.css']
})
export class HostmanageComponent implements OnInit {
orders;
showform=false;
hostform;
verification;
  constructor( private order:OrdersService,private formbuilder:FormBuilder) {  }

  ngOnInit()
   {
    this.hostform=this.formbuilder.group({
      verified:[''],
      verify:[''],
      username:['']
    })

    this.refreshData();
   }
   refreshData()
   {
     this.order.getOrder().subscribe(data=>
     {
       this.orders=data;
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

// deletehost(id)
// {
//   this.hostService.delete(id).subscribe(data=>
//  {
//   Swal.fire("deleted");
  
//   this.showform=false;
// })
// }

  submitHostForm(formdata)
  { 
    this.order.UpdateOrder(formdata._id, formdata).subscribe(data => {
      console.log(data);
      this.showform = false;  
      this.refreshData();  
    });
  }

}


