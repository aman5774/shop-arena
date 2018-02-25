import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessage } from 'angular-flash-message';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessage,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  email: String;
  password: String;

  onLoginSubmit(){
    const user ={
      email: this.email,
      password: this.password
    }

    //Required fields
    if(!this.validateService.validateLogin(user)){
      this.flashMessage.danger('Please fill all the required fields..',{timeOut:3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.danger('Invalid Email..',{timeOut:3000});
      return false;
    }

    // Login User
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.status){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.success(data.message,{timeOut:5000});
        this.router.navigate(['/userdashboard']);
      } else {
        this.flashMessage.danger(data.message,{timeOut:3000});
        this.router.navigate(['/login']);
      }
    });
  }
}
