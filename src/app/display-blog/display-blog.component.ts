import { Component, OnInit } from '@angular/core';
import { GuideService } from '../guide.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface Obj{
  blog : {},
  user : [],
}

@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.css']
})
export class DisplayBlogComponent implements OnInit {

  blogs: any;
  like = faThumbsUp;
  user;
  type;
  totalLikes = [];

  constructor(private guideservice: GuideService) { }

  ngOnInit() {
    document.body.classList.add('grey-back');
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getBlogs();
  }

  getBlogs(){
    this.guideservice.getAllBlogs().subscribe((data) => {
      console.log(data);
      this.blogs = data;

      this.guideservice.getAllLikes().subscribe((dat: Obj[]) => {
        console.log(dat)
        for(let obj of dat){
          this.totalLikes.push(obj['user'].length);
        }
      })
      console.log(this.totalLikes)
    })

    
  }

  ngOnDestroy(){
    document.body.classList.remove('grey-back');
  }

  addLike(blogid){
    this.guideservice.Like(blogid, this.user._id).subscribe(data => {
      console.log(data);
    })
  }

  setType(type){
    this.type = type;
  }

//   search(value){
//     console.log(value+this.type)
//     if( this.type == 'City'){
//       this.guideservice.searchBlog(value).subscribe(data=>{
//         this.blogs = data;
//     })
//     }else if( this.type == 'Name'){
//       this.guideservice.searchGuide(value).subscribe(data=>{
//         this.blogs = data;
//     })
//   }
// }

}
