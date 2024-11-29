import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users : User[] = [
    {
      id: 1,
      name: 'Jose',
      lastname : 'Ramírez',
      email: 'jose@email.com',
      username : 'jose',
      password : '1234'
    },
    {
      id: 2,
      name: 'Miguel',
      lastname : 'González',
      email: 'miguel@email.com',
      username : 'miguel',
      password : '1234'
    },
  ];
  
  constructor() { }

  findAll() : Observable<User[]>{
    return of(this.users);
  }

}
