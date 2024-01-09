import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  constructor(private router: ActivatedRoute, private userService: UserService) {}
  myid:any;
  
  ngOnInit(){
    this.myid = this.router.snapshot.params['id']  
  }

}
