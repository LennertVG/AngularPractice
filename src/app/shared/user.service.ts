import { Injectable } from  '@angular/core';
import * as bcrypt from 'bcrypt';

@Injectable({
providedIn: 'root'
})

export  class  UserService {
	
	constructor() { }
	// // Dummy users wich we can replace with actual api called users
	// users = [
	// { id: 1, username: 'johndoe', password: 'password' },
	// { id: 2, username: 'janedoe', password: 'password' },
	// ];
	users= []

	// Returns all users

	async getUsers() {
		return (await fetch('http://localhost:3000/users')).json()
	}

	// Checks user credentials and returns a valid token or null
	async  login(username:  string, password:  string) {
		let users = await this.getUsers();
		let user =  users.find((u: {username:string;})  => u.username  === username);
		// The CryptoJS..... is part of the password hashing
		if (!user || user.password  !== password) {
			return  null;
		}
		return user.id.toString();
	}
}