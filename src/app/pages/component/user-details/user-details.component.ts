import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/service';
import {Location} from '@angular/common';
import {User} from '../../../shared/models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Friendship} from '../../../shared/models/friendship';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
  currentUser: User;
  friendShip: Friendship;

  userForm: FormGroup;

  subscribe = false;

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
  }

  ngOnInit() {

    this.createForm();

    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe(user => {
        if (user) {
          this.user = user;
          this.fillFormControl();
        }
      });
      this.userService.getFriendShipStatus(id).subscribe(friendShip => {
        if (friendShip) {
          this.friendShip = friendShip;
        }
      });
    } else {
      this.user = this.userService.currentUser;
      this.fillFormControl();
    }

    this.currentUser = this.userService.currentUser;

    console.log(this.user);
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      'id': new FormControl(''),
      'username': new FormControl(''),
      'firstname': new FormControl(''),
      'lastname': new FormControl(''),
      'password': new FormControl(''),
      'enabled': new FormControl(''),
      'email': new FormControl('')
    });
  }

  fillFormControl() {

    this.userForm.controls['id'].setValue(this.user.id);
    this.userForm.controls['username'].setValue(this.user.username);
    this.userForm.controls['firstname'].setValue(this.user.firstname);
    this.userForm.controls['lastname'].setValue(this.user.firstname);
    this.userForm.controls['password'].setValue(this.user.password);
    this.userForm.controls['enabled'].setValue(this.user.enabled);
    this.userForm.controls['email'].setValue(this.user.email);
  }

  getUser() {

  }

  goBack() {
    this.location.back();
  }

  onSubscribe() {

    this.subscribe = true;

    var friendship: Friendship;
    friendship.userId = this.currentUser.id;
    friendship.friendId = this.user.id;
    friendship.actionUser = this.currentUser.id;
    friendship.status = 0;

    this.userService.subscribe(friendship)
      .delay(500)
      .subscribe(friendship => {
        this.friendShip = friendship;
      });

  }

  save() {

  }
}
