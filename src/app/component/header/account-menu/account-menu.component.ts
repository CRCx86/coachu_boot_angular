import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, ConfigService, UserService} from '../../../service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  user: any;

  constructor(    private config: ConfigService,
                  private authService: AuthService,
                  private router: Router,
                  private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

}
