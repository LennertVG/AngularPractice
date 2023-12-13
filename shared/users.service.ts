import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  url:string='http://localhost:3000'

  getUsers() {
		return fetch(this.url)
		.then(res => res.json())
	}
}
