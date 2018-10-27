import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/service';
import {Location} from '@angular/common';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {

    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe(user => this.user = user);
    } else {
      this.user = this.userService.currentUser;
    }

  }

  goBack() {
    this.location.back();
  }

}
