import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, UserService} from '../../service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(    private userService: UserService,
                  private authService: AuthService,
                  private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  userName() {
    const user = this.userService.currentUser;
    return user.firstname.charAt(0).toUpperCase() + ' ' + user.lastname.charAt(0).toUpperCase();
  }

}
