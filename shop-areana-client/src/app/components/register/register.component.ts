import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessage } from 'angular-flash-message';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname: String;
  lastname: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessage,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user ={
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }

    //Required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.danger('Please fill all the required fields..',{timeOut:3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.danger('Invalid Email..',{timeOut:3000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.status){
        this.flashMessage.success(data.message,{timeOut:3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.danger(data.message,{timeOut:3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
