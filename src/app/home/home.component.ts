import { Component, OnInit } from '@angular/core';
import { faCoffee, faPen, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HostService } from '../host.service';
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

  constructor(private hostservice: HostService){
    
  }
  
  ngOnInit() 
  {
    document.body.classList.add("bg-home");
    document.body.classList.add("is-preload");
    this.getHosts();
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
