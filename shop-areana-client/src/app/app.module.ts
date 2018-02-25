import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { FlashMessageModule } from 'angular-flash-message';
import { AuthService } from './services/auth.service';
import { CategoryComponent } from './components/category/category.component';

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'userdashboard', component:UserDashboardComponent, canActivate: [AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserDashboardComponent,
    ProfileComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessageModule
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
