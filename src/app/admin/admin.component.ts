import { Component, OnInit } from '@angular/core';
import { HostService } from '../host.service';
import { FormBuilder } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
hosts;
verification;
selectedhost;
hostform;
delete = faTrashAlt;
showform = false;
constructor(private hostService:HostService, private formbuilder:FormBuilder) {}
 ngOnInit() 
  {
  this.verification=this.formbuilder.group({
  verified:[''],
  verify:[''],
  username:['']
})
this.refreshData();    
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
}