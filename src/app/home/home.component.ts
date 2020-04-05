import { Component, OnInit } from '@angular/core';
import { faCoffee, faPen, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HostService } from '../host.service';
import { GuideService } from '../guide.service';
@Component
({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit 
{
  faCoffee=faCoffee;
  faPen=faPen;
  more = faArrowRight;
  hosts;
  likesobj;

  constructor(private hostservice: HostService,private guideservice: GuideService){
    
  }

  getLikes(){
    this.guideservice.getAllLikes().subscribe((data : any) => {
      // console.log(data);
      this.likesobj = data.sort((e, f) => {
        return f.user.length - e.user.length;
      })
      console.log(this.likesobj);
    
    })
  }
  
  ngOnInit() 
  {
    document.body.classList.add("bg-home");
    document.body.classList.add("is-preload");
    this.getHosts();
    this.getLikes();
  }

  getHosts(){
    this.hostservice.getHost().subscribe(data => {
      console.log(data);
      this.hosts = data;
    })
  }

  ngOnDestroy()
  {
    document.body.classList.remove("bg-home");
  }
}
