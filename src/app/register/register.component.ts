import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ToastrModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  

  onSubmit(){
    this.userService.register(this.username, this.password);
    this.toastr.succes('You have been registered', 'Yay');
    
  }
password: any;
username: any;
}
