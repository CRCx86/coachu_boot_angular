import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import {Router} from "@angular/router";
import {UserService} from '../../shared/service/index';
import {MockUserService} from '../../shared/service/mocks/index';

export class RouterStub {
  navigate(commands?: any[], extras?: any) {}
}

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard,
        {
        provide: Router,
        useClass: RouterStub
      }
        ,
        {
          provide: UserService,
          useClass: MockUserService
        }
      ]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
