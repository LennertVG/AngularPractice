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

  // todo:any helps the code select the right todo to update
  changeDone (todo:any) {
    todo.done = !todo.done;
  }

  postData () {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      // Stringify omdat we tekst moeten meegeven
      body: JSON.stringify({
        'title': this.myContent,
        'owner': 'V',
        'done':false,
      })
    };
    
    fetch('http://localhost:3000/todo', options)
      .then(response => response.json())
      .then(response =>{ 
        console.log(response);
        // refresh data
        this.fetchMyData();
        // make sure the content cleared upon post
        this.myContent = '';
      })
      .catch(err => console.error(err));
  }
}
