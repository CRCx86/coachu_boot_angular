import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {UserService} from '../../shared/service/index';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(): boolean {
    const currentUser = this.userService.currentUser;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
