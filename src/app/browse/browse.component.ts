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
  hostchoices = {city: '', state: ''};
  cities = [];
  states = [];
  type = "Name";

  searchoptions = ['name', 'city', 'state']

  constructor(private hostService:HostService, private guideService:TourguideService) { }

  ngOnInit()
  {
    document.body.classList.add('bg-userdashboard');
    this.getHosts();
    
  }

  getHosts(){
    this.hostService.getHost().subscribe(data=>{
      this.filterVerified(data);
      this.getDetails(this.hosts);
    })
    
  }

  search(value){
    console.log(value+this.type)
    if( this.type == 'City'){
      this.hostService.searchCity(value).subscribe(data=>{
        this.filterVerified(data);
    })
    }else if( this.type == 'Name'){
      this.hostService.searchName(value).subscribe(data=>{
        this.filterVerified(data);
    })
    }else if( this.type == 'State'){
      this.hostService.searchState(value).subscribe(data=>{
        this.filterVerified(data);
    })
    }
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

  filterByCity(city){
    this.hostService.getHost().subscribe(data=>{
      this.filterVerified(data);
      this.getDetails(this.hosts);
      this.hosts = this.hosts.filter( host => {
        return host.city == city;
      })
    })
  }

  filterByState(state){
    this.hostService.getHost().subscribe(data=>{
      this.filterVerified(data);
      this.getDetails(this.hosts);
      this.hosts = this.hosts.filter( host => {
        return host.state == state;
      })
    })
  }

  sortAZ(){
    this.hosts.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  }

  filterVerified(hosts){
    this.hosts = hosts.filter( host => {
      return host.verified;
    })
  }

  setType(type){
    this.type = type;
  }

}
