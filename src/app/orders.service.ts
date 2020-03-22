import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  url="http://localhost:3000/order";

  addOrder(formdata)
  {
    return this.http.post(this.url+'/addorder',formdata)
  }

  UpdateOrder(order_id, orderdata)
  {
    return this.http.put(this.url+`/updatestatus/${order_id}`, orderdata)
  }

  getOrder()
  {
    return this.http.get(this.url+'/getorder')
  }

  getOrderByHost(hostid){
    return this.http.get(this.url+`/getbyhost/${hostid}`);
  }

  updateOrder(orderid, data){
    return this.http.put(this.url+`/updatestatus/${orderid}`, data);
  }
}
