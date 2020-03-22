import { Component, OnInit, Input } from '@angular/core';
import { HostService } from '../host.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.css']
})
export class ImageManagerComponent implements OnInit {

  @Input('host')
  host;
  uploadedImages;
  constructor(private hostservice: HostService) { }

  ngOnInit() {
    console.log(this.host);
    this.uploadedImages = this.host['images'];
  }
  gethost(){
    this.hostservice.getHostbyId(this.host._id).subscribe(data => {
      console.log(data);
      this.host = data;
      this.uploadedImages = this.host['images'];
    })
  }

  onFileChange(event)
  {
    let files = event.target.files;
    if(files.length===0)
      return;

    var mimeType=files[0].type;
    if(mimeType.match(/image\/*/)==null)
    { 
      Swal.fire("Images Only");
      return;
    }
    let formDatas = [];
    let selectedFiles=[];
    
    for(let file of files){
      selectedFiles.push(file.name);
      // let fd = new FormData();
      // fd.append('image', file, file.name);
      // console.log(file);
      // formDatas.push(fd);

      let formData = new FormData();
      formData.append('image', file, file.name);
      this.hostservice.uploadImage(formData).subscribe( response =>
        {
        console.log(response);
        })
    }
    this.hostservice.addImages(this.host._id, {images: selectedFiles}).subscribe(data=> {
      console.log(data);
      this.gethost();
      
    })

    console.log(selectedFiles)
  }

    remImage(index){
      this.uploadedImages.splice(index, 1);
      this.hostservice.UpdateHost(this.host._id, {images: this.uploadedImages}).subscribe(data => {
        console.log(data);
      })
    }


    
    // let formData = new FormData();
    // formData.append('image', files[0], files[0].name);
    // this.hostservice.uploadImage(formData).subscribe(response=>
    //   {
    //   console.log(response)
    //   })
  }