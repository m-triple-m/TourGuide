import { Component, OnInit, Input } from '@angular/core';
import { HostService } from '../host.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit 
{ 
  reviewForm;
  @Input() reviews;
  @Input() myreview;
  @Input() host_id;
  currentUser;
  newreview = true;
  constructor(private formbuilder: FormBuilder, private hostservice: HostService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    
    if(this.reviews){
      this.getMyReview();
    }
    this.initForm(this.myreview);
  }

  addReview(formdata){
    if(this.newreview){
      this.hostservice.addReview(formdata).subscribe(data => {
        console.log(data);
      })
    }
  }

  initForm(review){
    console.log(review);
    if(review){
      this.reviewForm = this.formbuilder.group(review);
      return;
    }
    this.reviewForm = this.formbuilder.group({
      user : this.currentUser._id,
      host : this.host_id,
      rating : 0,
      review : ''
    })
  }

  getMyReview(){
    for(let review of this.reviews){
      if(review.user._id == this.currentUser._id){
        this.myreview = review;
        this.newreview = false;
      }
    }
  }
}
