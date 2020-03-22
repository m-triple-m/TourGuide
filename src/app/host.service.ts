import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HostService {
  url="http://localhost:3000";

  constructor(private http:HttpClient) { }

  addHost(formdata)
  {
    return this.http.post(this.url+'/host/addhost',formdata);
  }

  getHostbyId(id)
  {
    return this.http.get(this.url+`/host/getbyid/${id}`);
  }

  getHostbyUsername(username)
  {
    return this.http.get(this.url+`/host/getbyusername/${username}`);
  }

  delete(id)
  {
    return this.http.delete(this.url+`/host/deletehost/${id}`)
  }
  
updateStatus(id, formdata)
{
  
  return this.http.put(this.url+`/host/updatestatus/${id}`, formdata);
}

uploadImage(file): Observable<any>
{
return this.http.post(this.url+'/host/addimg',file)
}

addImages(host_id, data){
  return this.http.put(this.url+`/host/updateimg/${host_id}`, data);
}

getHostbyCity(city)
{
  return this.http.get(this.url+`/host/gethostcity/${city}`)
}

UpdateHost(host_id, hostdata){
  return this.http.put(this.url+`/host/updatestatus/${host_id}`, hostdata)
}
addUser(formdata)
{
  return this.http.post(this.url+'/allusers/adduser',formdata)
}
addReview(formdata)
{
  return this.http.post(this.url+`/review/addreview`,formdata)
}
getReviewsByHost(id)
{
  return this.http.get(this.url+`/review/getbyhost/${id}`)
}
gethostprofile(id){
  return this.http.get(this.url+`/host/getbyid/${id}`)
}

getHost()
{
return this.http.get(this.url+'/host/gethost')
}

getFilteredHosts(city, state){
  return this.http.get(this.url+`/host/filter/${city}/${state}`);
}

downloadImage(name): Observable<any>
{
  return this.http.get(this.url+'/host/getImg/'+name, {responseType:'blob'})
}

getImage(name)
{
  return Observable.create((observer)=>{
    this.downloadImage(name).subscribe((res)=>{
      var reader=new FileReader();
      reader.readAsDataURL(res);
      reader.onload=(_event)=>{
        console.log(reader.result);
        observer.next(reader.result);
      }
    })
  })
}
}