import { Component, OnInit } from '@angular/core';
import { HostService } from '../host.service';
import { TourguideService } from '../tourguide.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
hosts;
guides;
  constructor(private hostService:HostService, private guideService:TourguideService) { }

  ngOnInit()
  {
    document.body.classList.add('bg-userdashboard');
    this.hostService.getHost().subscribe(data=>{
    this.hosts=data;
    console.log(data);
    })

    this.guideService.getTourGuide().subscribe(data=>{
      this.guides=data;
    })

   
  }
  searchbycity(city)
  {
    this.hostService.getHostbyCity(city).subscribe(data=>{
      this.hosts=data;
      console.log(this.hosts);
  })
        
  this.guideService.getTourGuidebyCity(city).subscribe(data=>{
   this.guides=data;
        })
  }
}
