// src/app/login/login.component.ts
import { Component } from  '@angular/core';
import { UserService } from  '../shared/user.service';
import { FormsModule } from  '@angular/forms';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})

export  class  LoginComponent {
	username!:  string;
	password!:  string;
	constructor(private  userService:  UserService) { }

	onSubmit() {
		this.userService.login(this.username, this.password)
			.then((token) => {
			if (token) {
				// Store token in local storage
				localStorage.setItem('token', token);
				// Redirect to protected component
				// ...
			} else {
				alert('Invalid username or password');
			}
			});
		}
// logout method
	logout() {
	localStorage.removeItem('token');
	}
}