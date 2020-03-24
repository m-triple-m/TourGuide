import { Component, OnInit } from '@angular/core';
import{faPen, faUser, faEnvelope,faEdit, faPhone, faHome,faEye} from '@fortawesome/free-solid-svg-icons'

import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HostService } from '../host.service';


@Component({
  selector: 'app-hostprofile',
  templateUrl: './hostprofile.component.html',
  styleUrls: ['./hostprofile.component.css']
})
export class HostprofileComponent implements OnInit {

  faPen=faPen;
  faUser=faUser;
  faPhone=faPhone;
  faEnvelope=faEnvelope;
  faEdit=faEdit;
  faHome=faHome;
  faEye=faEye;
  host;
  hostid;
  rev;
  currentUser;
  reviewForm;
  reviews;
  hostimages = ['assets/guest.jpeg', 'assets/images/cta01.jpg']

  constructor(private hosts:HostService,private formbuilder:FormBuilder,  private activatedroute:ActivatedRoute) { }

  ngOnInit() {
    
    document.body.classList.add("profile")
    this.currentUser = JSON.parse(sessionStorage.getItem('user'))
    this.hostid=this.activatedroute.snapshot.paramMap.get("hostid")
    console.log(this.currentUser)  
    this.profile(this.hostid);
    this.refreshReview(this.hostid);
  }

  initForm(hostid)
  {
    this.reviewForm = this.formbuilder.group({
      user : this.currentUser._id,
      host : hostid,
      rating: 5,
      review : '',
    })
  }

  profile(id)
  {
    this.hosts.gethostprofile(id).subscribe(data=>
    {
      console.log(data);
      this.host = data;
      this.initForm(data);
    })
  }

  addReview(formdata)
  { 
    this.hosts.addReview(formdata).subscribe((data)=>{
      console.log(data);
      this.refreshReview(this.hostid);
    })
  }

  refreshReview(id)
  {
    this.hosts.getReviewsByHost(id).subscribe(data =>
      {
        console.log(data);
        this.reviews=data;
      })
  }
  
}
