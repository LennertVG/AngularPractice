import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 /*  
  In our components we will instantiate this class and user
  its methods and properties to fetch the data from the API.

  myuser = new UsersService();
  myuser.getUsers();
  myuser.url; 
  */

  constructor() { }

  url:string = 'http://localhost:3000/users';

  getUsers() {
    return fetch(this.url)
      .then(res => res.json())
  }
}
