import { Component, OnInit } from '@angular/core';
import {ConfigService, UserService} from '../../shared/service/index';
import {User} from '../../shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allUserResponse = {};
  whoamIResponse = {};

  users: User[];

  constructor( private config: ConfigService,
               private userService: UserService) {
  }

  ngOnInit() {

    // PROD
    this.getUsers();

    // MOCK
    // this.users = [
    //   {id: 10001, email: 'user1@mail.ru', enabled: true, username: 'user1', firstname: 'user1', lastname: 'user1', password: '123'},
    //   {id: 10002, email: 'user2@mail.ru', enabled: true, username: 'user2', firstname: 'user2', lastname: 'user2', password: '123'},
    //   {id: 10003, email: 'user3@mail.ru', enabled: true, username: 'user3', firstname: 'user3', lastname: 'user3', password: '123'},
    //   {id: 10004, email: 'user4@mail.ru', enabled: true, username: 'user4', firstname: 'user4', lastname: 'user4', password: '123'}
    // ];
  }

  makeRequest(path) {
    if (path === this.config.foo_url) {
      // this.fooService.getFoo()
      //   .subscribe(res => {
      //     this.forgeResonseObj(this.fooResponse, res, path);
      //   }, err => {
      //     this.forgeResonseObj(this.fooResponse, err, path);
      //   });
    } else if (path === this.config.whoami_url) {
      this.userService.getMyInfo()
        .subscribe(res => {
          this.forgeResonseObj(this.whoamIResponse, res, path);
        }, err => {
          this.forgeResonseObj(this.whoamIResponse, err, path);
        });
    } else {
      this.userService.getAll()
        .subscribe(res => {
          this.forgeResonseObj(this.allUserResponse, res, path);
        }, err => {
          this.forgeResonseObj(this.allUserResponse, err, path);
        });
    }
  }

  forgeResonseObj(obj, res, path) {
    obj['path'] = path;
    obj['method'] = 'GET';
    if (res.ok === false) {
      // err
      obj['status'] = res.status;
      try {
        obj['body'] = JSON.stringify(JSON.parse(res._body), null, 2);
      } catch (err) {
        console.log(res);
        obj['body'] = res.error.message;
      }
    } else {
      // 200
      obj['status'] = 200;
      obj['body'] = JSON.stringify(res, null, 2);
    }
  }

  getUsers(): void {
    this.userService.getAll()
      .subscribe(users => this.users = users);
  }

  add() {
    // TODO: to add new user
  }
}
