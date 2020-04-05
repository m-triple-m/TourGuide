import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJs from '../../assets/canvasjs.min.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-websitestats',
  templateUrl: './websitestats.component.html',
  styleUrls: ['./websitestats.component.css']
})
export class WebsitestatsComponent implements OnInit {

  @Input('users') users;
  @Input('orders') orders;
  @Input('locations') locs;

  regData;
  ordData;
  chartview = 'users';

  count;
  dataPoints=[];
  constructor() { }

  ngOnInit() {
    console.log(this.users);
    console.log(this.orders);
    this.prepareRegData(this.users);
  }
   
    viewUsers(){
      this.prepareRegData(this.users);
    }

    viewOrders(){
      this.prepareOrdData(this.orders);
    }

    drawchart(datapoints, title, unit, xlabel){
      var chart = new CanvasJs.Chart("regByDate", {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: title
        },
        axisY: {
          title: xlabel,
          titleFontSize: 24
        },
        data: [{
          type: "column",
          yValueFormatString: `#,### ${unit}`,
          dataPoints: datapoints
        }]
      });
      chart.render();

    }

    prepareRegData(users){
      this.getDatewiseValues(users, 'created').subscribe(data => {
        console.log(data);
        this.regData = data;
        this.drawchart(this.regData, 'Registration Data', 'registrations', 'No. of Registrations');
      })
    }

    prepareOrdData(orders){
      this.getDatewiseValues(orders, 'orderdate').subscribe(data => {
        console.log(data);
        this.ordData = data;
        this.drawchart(this.ordData, 'Storage Booking Data', 'orders', 'No. of Orders');
      })
    }

    getDatewiseValues(records, colname){
      return Observable.create(observer => {
        let datewise = [];
        this.getUniqueValues(colname, records).subscribe(unique_values => {
          for(let value of unique_values[1]){
            datewise.push({x: new Date(value), y: this.getCount(unique_values[0], value)})
          }
          observer.next(datewise);
        })
      })

    }

    getUniqueValues(col_name, data){
      // console.log(col_name+' '+data);
      return Observable.create( observer => {
        let values = data.map( ele => {
          let date = new Date(ele[col_name]).setHours(0, 0, 0, 0);
          // console.log(new Date(date).getTime());
          return new Date(date).getTime();
        })
  
        let uniquevalues = []
        for(let value of values){
          if(!uniquevalues.includes(value)){
            uniquevalues.push(value);
            // console.log(value);
          }
        }
        observer.next([values, uniquevalues]);
      })
    }

    getCount(records, item){
      let count = 0;
      for(let record of records){
        if(record == item){
          count++;
        }
      }

      return count;
    }
}
