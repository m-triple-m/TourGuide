import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostService } from '../host.service';
import { OrdersService } from '../orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input('amt') amount;
  @Input('host') host;
  @Input('order') order;
  user;
  handler;

  constructor(private orderservice: OrdersService, private router: Router) { }

  ngOnInit() {
    console.log(`to pay ${this.amount}`)
    this.user = JSON.parse(sessionStorage.getItem('user')); 
    this.loadStripe();
  }


  addOrder(){
    this.orderservice.addOrder(this.order).subscribe((message)=>
          {
            console.log(message); 
            this.router.navigate(['/userdashboard'])
            Swal.fire({
              icon: 'success',
              title: 'Booking Requested',
              text: 'You will be informed once the booking is confirmed from the host end!'
            })
          })
  }

  makePayment(amt) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        Swal.fire({
          icon: 'success',
          title: 'Booking Requested',
          text: 'You will be informed once the booking is confirmed from the host end!'
        }).then(() => {
          
        //   this.orderservice.addOrder(this.order).subscribe((message)=>
        //   {
        //     console.log(message); 
        //     this.router.navigate(['/userdashboard'])
        //   })
        })
      }
    });

    handler.open({
      name: 'GuideMe',
      description: 'Great platform for couchsurfing and tourism!!',
      amount: 100 * amt,
    });
  }

  loadStripe() {
      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }
}
