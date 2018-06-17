import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service';
import {Location} from '@angular/common';
import {User} from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  @Input() user1: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.userService.currentUser;

    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user1 => this.user1 = user1);
  }

  goBack() {
    this.location.back();
  }

}
