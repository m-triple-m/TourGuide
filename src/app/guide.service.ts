import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  url = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  addBlog(formdata){ 
    return this.http.post(this.url+'/blog/add', formdata);
  }

  getByUsername(username){
    return this.http.get(this.url+'/tourguide/getbyusername/'+username);
  }

  uploadImage(file){
  return this.http.post(this.url+'/blog/addimg',file);
  }

  getAllBlogs(){
    return this.http.get(this.url+'/blog/getall');
  }

  addLike(formdata){
    return this.http.post(this.url+'/like/addlike', formdata);
  }

  Like(blogid, userid){
    return this.http.put(this.url+'/like/like/'+blogid, {user : userid})
  }

  getLikeByBlog(blogid){
    return this.http.get(this.url+'/like/getbyblog/'+blogid);
  }

  getAllLikes(){
    return this.http.get(this.url+'/like/getall');
  }

  updateGuide(id, data){
    return this.http.put(this.url+'/tourguide/update/'+id, data);
  }

  getBlogByGuide(id){
    return this.http.get(this.url+'/blog/getbyguide/'+id);
  }

}
