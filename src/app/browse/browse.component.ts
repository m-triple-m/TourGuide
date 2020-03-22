import { Component, OnInit } from '@angular/core';
import { HostService } from '../host.service';
import { TourguideService } from '../tourguide.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  hosts = [];
  guides;
  hostchoices = {city: '', state: ''};
  cities = [];
  states = [];

  constructor(private hostService:HostService, private guideService:TourguideService) { }

  ngOnInit()
  {
    document.body.classList.add('bg-userdashboard');
    this.hostService.getHost().subscribe(data=>{
      console.log(data);
      
      this.filterVerified(data);
      this.getDetails(this.hosts);
    })

    this.guideService.getTourGuide().subscribe(data=>{
      this.guides=data;
    })

   
  }
  searchbycity(city)
  {
    this.hostService.getHostbyCity(city).subscribe(data=>{
      this.filterVerified(data);
      console.log(this.hosts);
  })
        
  this.guideService.getTourGuidebyCity(city).subscribe(data=>{
   this.guides=data;
        })
  }

  getDetails(hosts){
    this.cities = [];
    for(let host of hosts){
      if(!this.cities.includes(host.city)){
        this.cities.push(host.city);
      }
      if(!this.states.includes(host.state)){
        this.states.push(host.state);
      }
    }
  }

  filterresults(){
      if(this.hostchoices.city){
        let temp = this.hosts;
        this.hosts = [];
        for(let host of temp){
          if(host.city == this.hostchoices.city){
            console.log(host.name);
            if(!this.hosts.includes(host)){
              this.hosts.push(host);
            }
          }
        }
      }

      if(this.hostchoices.state){
        let temp = this.hosts;
        this.hosts = [];
        for(let host of temp){
          if(host.state == this.hostchoices.state){
            console.log(host.name);
            if(!this.hosts.includes(host)){
              this.hosts.push(host);
            }
          }
        }
      }
  }

  filterVerified(hosts){
    for(let host of hosts){
     if(host.verified){
      this.hosts.push(host);
     }
    }
  }

}
