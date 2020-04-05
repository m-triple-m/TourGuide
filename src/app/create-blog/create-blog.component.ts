import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GuideService } from '../guide.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  blogform;
  imgURL;
  user;
  blogImage = "assets/blog-example.png";
  @Input('guide') guide;

  constructor(private formbuilder: FormBuilder, private guideservice: GuideService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.initForm();
  }

  initForm(){
    this.blogform = this.formbuilder.group({
      guide : this.guide._id,
      title : ["", Validators.required],
      text : ["", Validators.required],
      created : new Date
    })
  }

  submitForm(formdata){
    if(!this.blogform.valid)
    {
      alert('nonsense');
      return;
    }
    formdata.blogImage = this.blogImage;
    this.guideservice.addBlog(formdata).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/guidedash']);
      this.guideservice.addLike({blog : data['_id']}).subscribe(dat => {
        console.log(dat);
      })
      Swal.fire({
        icon: 'success',
        title: 'Welcome to GuideMe',
        text: 'Now login to continue!'
      });
    });
  }

  getControls(){
    return this.blogform.controls;
  }

  setImage(event){
    let files = event.target.files;
    if(files.length===0)
      return;

    var mimeType=files[0].type;
    if(mimeType.match(/image\/*/)==null)
    { 
      Swal.fire("Images Only");
      return;
    }
    this.preview(event.target.files)
    let formData=new FormData();
    let selectedFile=files[0];
    this.blogImage=selectedFile.name;
    formData.append('image', selectedFile, selectedFile.name);
    this.guideservice.uploadImage(formData).subscribe(data=>
      {
      console.log(data)
      })
  }

  preview(files) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }
  }

}
