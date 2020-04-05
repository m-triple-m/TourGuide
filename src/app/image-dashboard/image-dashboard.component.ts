import { Component, OnInit, Input } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { HostService } from '../host.service';
@Component({
  selector: 'app-image-dashboard',
  templateUrl: './image-dashboard.component.html',
  styleUrls: ['./image-dashboard.component.css']
})
export class ImageDashboardComponent implements OnInit {

  // @Input('host')
  // host;
  // delete = faTrashAlt;
  // currentUser;

  // constructor(private hostservice: HostService) { }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    // console.log(this.host);
  }

  // getTeam(){
  //   this.hostservice.getHostbyId(this.host._id).subscribe(data => {
  //     console.log(data);
  //     this.host = data;
  //   })
  // }

  // deleteFile(index){
  //   this.host.files.splice(index, 1);
  //   this.hostservice.UpdateHost(this.host._id, this.host).subscribe(data => {
  //     console.log(data);
  //     // this.teamdata = data;
  //   })
  // }

  // getext(filename){
  //   let l = filename.split('.');
  //   return l[l.length-1];
  // }

  // onFileChanged(event){
  //   let formdata = new FormData();
  //   let file_names = [];
  //   for(let file of event.target.files){
  //     formdata.append('file', file, file.name);
  //     file_names.push({name : file.name, size :  file.size, uploader : `${this.currentUser.first} ${this.currentUser.last}`, date : new Date()});
  //     this.hostservice.uploadImage(formdata).subscribe(response => {
  //       console.log(file.name);
  //     })
  //   }
  //   this.hostservice.addImages(this.host._id, {files: file_names}).subscribe(data => {
  //     console.log(data);
  //     this.getTeam();
  //   }); 
  // }

  // getSize(s){
  //   let size = s/1024;
  //   if(size>1024){
  //     return `${(size/1024).toFixed(2)} MB`;
  //   }
  //   return `${(size).toFixed(2)} KB`;
  // }

}
