import { Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable
({
  providedIn: 'root'
})

export class UserService {
url="http://localhost:3000"
loggedin=false;
constructor(private http:HttpClient, private router: Router) 
{ 
  if(sessionStorage.getItem('user'))
  {this.loggedin=true;}
}

  addUser(formdata)
  {
    let message=this.http.post(this.url+'/user/add',formdata)
    return message;
  }

 getUser()
  {
  return this.http.get(this.url+'/user/get')
  }

//  getByUsername(username)
// {
//  return this.http.get(this.url+`/user/getbyusername/${username}`)
// }

getByUsername(username)
{
 return this.http.get(this.url+`/allusers/getbyusername/${username}`)
}

updateUser(id, userdata)
{
 return this.http.put(this.url+`/allusers/update/${id}`, userdata)
}

addUsers(formdata)
{
  return this.http.post(this.url+'/allusers/adduser',formdata)
}
changePass(formdata,confirm)
{
  return this.http.put(this.url+`/user/changepassword/${confirm}`, formdata)
}

setLogin()
{
  this.loggedin=true;
}

logout()
{
  console.log("logged out");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("ishost");
  sessionStorage.removeItem("isadmin");
  sessionStorage.removeItem("isguide");
  this.loggedin=false;
  if(sessionStorage.getItem('host')){
    this.router.navigate(['/hostlogin'])
  }
  else{
    this.router.navigate(['/login'])
  }
}
}
