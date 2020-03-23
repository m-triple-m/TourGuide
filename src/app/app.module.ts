import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotComponent } from './forgot/forgot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatStepperModule,MatPaginatorModule,MatExpansionModule,MatCardModule,MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatOptionModule, MatSelectModule, MatNativeDateModule} from '@angular/material';
import { HostComponent } from './host/host.component';
import { TouristComponent } from './tourist/tourist.component';
import { TourguideComponent } from './tourguide/tourguide.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdminComponent } from './admin/admin.component';
import { WebsitestatsComponent } from './websitestats/websitestats.component';
import { HostmanageComponent } from './hostmanage/hostmanage.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowseComponent } from './browse/browse.component';
import { BookingComponent } from './booking/booking.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TourguidebookingComponent } from './tourguidebooking/tourguidebooking.component';
import { GuideprofileComponent } from './guideprofile/guideprofile.component';
import { HostprofileComponent } from './hostprofile/hostprofile.component';

import { NgxStarRatingModule } from 'ngx-star-rating';
import { HostDashboardComponent } from './host-dashboard/host-dashboard.component';
import { HostLoginComponent } from './host-login/host-login.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ImageManagerComponent } from './image-manager/image-manager.component';

import { SliderModule } from 'angular-image-slider';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotComponent,
    HostComponent,
    TouristComponent,
    TourguideComponent,
    ReviewsComponent,
    UserdashboardComponent,
    AdminComponent,
    WebsitestatsComponent,
    HostmanageComponent,
    BrowseComponent,
    BookingComponent,
    TourguidebookingComponent,
    GuideprofileComponent,
    HostprofileComponent,
    HostDashboardComponent,
    HostLoginComponent,
    ImageManagerComponent,
    PaymentComponent,
   ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
     AppRoutingModule,
     ReactiveFormsModule,
     FormsModule,
     HttpClientModule,
     BrowserAnimationsModule,
     MatCardModule,
     MatButtonModule,MatDatepickerModule,
     MatFormFieldModule, MatExpansionModule,
     MatInputModule, MatIconModule, MatOptionModule,
     MatSelectModule, DragDropModule,
     MatCheckboxModule,MatStepperModule, SweetAlert2Module,
     MatNativeDateModule, MatPaginatorModule,
     NgxStarRatingModule,
     NgbModule,
     SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
