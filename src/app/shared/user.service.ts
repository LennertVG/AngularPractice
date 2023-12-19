import { Injectable } from  '@angular/core';

@Injectable({
providedIn: 'root'
})

export  class  UserService {
	
	constructor() { }
	// Dummy users wich we can replace with actual api called users
	users = [
	{ id: 1, username: 'johndoe', password: 'password' },
	{ id: 2, username: 'janedoe', password: 'password' },
	];

	// Returns all users

	getUsers() {
	// just for demo purposes - here we would perform an api call
		return  this.users;
	}

	// Checks user credentials and returns a valid token or null
	async  login(username:  string, password:  string) {
		let user =  this.users.find((u)  => u.username  === username);
		if (!user || user.password  !== password) {
			return  null;
		}
		return user.id.toString();
	}
}