import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GuideService } from '../guide.service';

@Component({
  selector: 'app-guide-dashboard',
  templateUrl: './guide-dashboard.component.html',
  styleUrls: ['./guide-dashboard.component.css']
})
export class GuideDashboardComponent implements OnInit {

  guide;
  showBlogs = false;
  showeditform = false;
  showBlogForm = true;

  blogs;
  editform;
  

  constructor(private formbuilder: FormBuilder, private guideservice: GuideService) { }

  ngOnInit() {
    document.body.classList.add('grey-back')
    this.guide = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.guide)
    this.initForm(this.guide);
    this.getBlogs();
  }

  getBlogs(){
    this.guideservice.getBlogByGuide(this.guide._id).subscribe(data => {
      console.log(data);
      this.blogs = data;
    })
  }

  initForm(user){
    user.languages = [user.languages];
    this.editform = this.formbuilder.group(user);
  }

  toggleBookings(){
    this.showeditform = false;
    this.showBlogs = true;
    this.showBlogForm = false;
  }

  toggleEditForm(){
    this.showeditform = true;
    this.showBlogs = false;
    this.showBlogForm = false;
  }

  toggleBlogForm(){
    this.showBlogForm = true;
    this.showeditform = false;
    this.showBlogs = false;
  }

  updateProfile(formdata){
    this.guideservice.updateGuide(this.guide._id, formdata).subscribe(data => {
      console.log(data);
      this.guide = data;
      sessionStorage.setItem('user', JSON.parse(this.guide));
    })
  }

  returnControls(){
    return this.editform.controls;
  }

}
