import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Deze zaken kunnen weergegeven worden met de databinding syntax {{todos}}, {{url}}, {{count}}......
  count:number = 0;
  title = 'xMas Shopping';
  myContent:string = '';
  url:string ='http://localhost:3000/todo';
  todos:any[]=[];

  increaseCount() {
    this.count++;
  }

  fetchMyData() {
    fetch(this.url)
    .then(response => response.json())
    .then(json => this.todos = json)
  }

  ngOnInit() {
    this.fetchMyData();
  }

}
