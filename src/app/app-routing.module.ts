import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotComponent } from './forgot/forgot.component';
import { TouristComponent } from './tourist/tourist.component';
import { TourguideComponent } from './tourguide/tourguide.component';
import { HostComponent } from './host/host.component';
import { LoginGuard } from './guards/login.guard';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdminComponent } from './admin/admin.component';
import { WebsitestatsComponent } from './websitestats/websitestats.component';
import { BrowseComponent } from './browse/browse.component';
import { BookingComponent } from './booking/booking.component';
import { GuideprofileComponent } from './guideprofile/guideprofile.component';
import { HostprofileComponent } from './hostprofile/hostprofile.component';
import { HostDashboardComponent } from './host-dashboard/host-dashboard.component';
import { HostLoginComponent } from './host-login/host-login.component';
import { HostmanageComponent } from './hostmanage/hostmanage.component';
import { PaymentComponent } from './payment/payment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GuideDashboardComponent } from './guide-dashboard/guide-dashboard.component';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { GuideloginComponent } from './guidelogin/guidelogin.component';
import { HostloginGuard } from './guards/hostlogin.guard';
import { GuideloginGuard } from './guards/guidelogin.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component : LoginComponent,},
  {path: 'home', component : HomeComponent},
  {path: 'registration',component:RegistrationComponent },
  {path: 'otpverify',component:ForgotComponent},
  {path: 'tourist', component:TouristComponent},
  {path: 'tourguide', component:TourguideComponent},
  {path: 'host', component:HostComponent},
  {path: 'checkout/:hostid', component:PaymentComponent, canActivate : [LoginGuard]},
  {path: 'forgot',component:ForgotComponent},
  {path: 'userdashboard', component:UserdashboardComponent, canActivate : [LoginGuard]},
  {path: 'guidedash', component:GuideDashboardComponent, canActivate : [GuideloginGuard]},
  {path: 'admin', component:AdminComponent, canActivate : [AdminGuard]},
  {path: 'browse', component:BrowseComponent},
  {path: 'browseblog', component:DisplayBlogComponent},
  {path: 'booking/:hostid', component: BookingComponent, canActivate : [LoginGuard]},
  {path: 'guidebook/:guideid', component:TourguideComponent, canActivate : [LoginGuard]},
  {path: 'Guideprofile/:guideid', component:GuideprofileComponent},
  {path: 'hostprofile/:hostid', component:HostprofileComponent},
  {path: 'hostdash', component:HostDashboardComponent, canActivate : [HostloginGuard]},
  {path: 'hostlogin', component:HostLoginComponent},
  {path: 'guidelogin', component:GuideloginComponent},
  {path : '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
