import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TourguideService {
  url="http://localhost:3000"
  constructor(private http:HttpClient) { }
  
  addTourguide(formdata){
    return this.http.post(this.url+'/tourguide/addtourguide',formdata)
  }
  addUser(formdata)
  {
    return this.http.post(this.url+'/allusers/adduser',formdata)
  }

  getTourGuide()
  {
  return this.http.get(this.url+'/tourguide/get')
  }
  
getTourGuidebyCity(city)
{
  return this.http.get(this.url+`/tourguide/getguidecity/${city}`)
}
}
