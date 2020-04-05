import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-browse-orders',
  templateUrl: './browse-orders.component.html',
  styleUrls: ['./browse-orders.component.css']
})
export class BrowseOrdersComponent implements OnInit {

  @Input('orders') orders;
  constructor() { }

  ngOnInit() {
  }

}
