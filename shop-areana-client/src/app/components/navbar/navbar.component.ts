import { Component, OnInit } from '@angular/core';
import { FlashMessage } from 'angular-flash-message';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessage,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.success("You are logged out",{ timeOut: 3000});
    this.router.navigate(['/login']);
    return false;
  }

}
