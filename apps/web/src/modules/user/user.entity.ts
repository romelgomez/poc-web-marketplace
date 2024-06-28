import { Entity } from '../core/entity';
import type { IUser } from './user.types';

export class User extends Entity implements IUser {
  email: IUser['email'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
  nationality: IUser['nationality'];

  constructor(i?: Partial<User>) {
    super(i);

    this.email = i?.email;
    this.firstName = i?.firstName;
    this.lastName = i?.lastName;
    this.nationality = i?.nationality;
  }
}
