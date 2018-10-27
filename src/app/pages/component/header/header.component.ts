import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService, UserService} from '../../../shared/service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pushRightClass: string = 'push-right';

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private translateService: TranslateService) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

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
    let firstname = user.firstname;
    let lastname = user.lastname;

    if (firstname != undefined && lastname != undefined) {
      return firstname.charAt(0).toUpperCase() + ' ' + lastname.charAt(0).toUpperCase();
    }
    return 'UU';
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  changeLang(language: string) {
    this.translateService.use(language);
  }

  onLoggedout() {

  }
}
