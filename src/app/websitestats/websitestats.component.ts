import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as CanvasJS from '../../assets/canvasjs.min.js'

@Component({
  selector: 'app-websitestats',
  templateUrl: './websitestats.component.html',
  styleUrls: ['./websitestats.component.css']
})
export class WebsitestatsComponent implements OnInit {
registeredusers;
count;
dataPoints=[];
  constructor(private userservice: UserService) { }

  ngOnInit() {
   this.registeredusers= this.userservice.getUser().subscribe(data=>{
     this.registeredusers=data;
     if(this.registeredusers.admin==false){
       this.count=data;
     }
        });

this.dataPoints=[
  {x: new Date(2020,6,24),y:31},
  {x: new Date(2020,6,25),y:31},
  {x: new Date(2020,6,26),y:29},
  {x: new Date(2020,6,27),y:29},
  {x: new Date(2020,6,28),y:31},
  {x: new Date(2020,6,29),y:30},
  {x: new Date(2020,6,30),y:29},
]
this.drawchart();
  }
  drawchart(){

    var chart = new CanvasJS.Chart("regByDate", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Daily Sales Data"
      },
      axisY: {
        title: "Units",
        titleFontSize: 24
      },
      data: [{
        type: "column",
        yValueFormatString: "#,### Units",
        dataPoints: this.dataPoints
        
      }]
    });
    chart.render();
  }

}
