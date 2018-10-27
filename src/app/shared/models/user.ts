import {UserRoles} from './user-roles';

export class User {

  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  enabled: boolean;
  email: string;
  userRoles: UserRoles[];

}
