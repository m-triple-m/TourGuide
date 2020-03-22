import { Component, OnInit } from '@angular/core';
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons';
@Component
({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit 
{
  faCoffee=faCoffee;
  faPen=faPen;
  
  ngOnInit() 
  {
    document.body.classList.add("bg-home");
    document.body.classList.add("is-preload");
  }

ngOnDestroy()
{
  document.body.classList.remove("bg-home");
}
}
