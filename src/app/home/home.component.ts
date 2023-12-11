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
  urlUsers:string ='http://localhost:3000/users'
  // todos should be an array of objects, the usage of any is just temporary => Usually we use a model or an interface
  todos:any[]=[];
  // users should be an array of objects
  users: any[]=[];
  // single instance of user acquired using ngmodel on select in my view
  user: any;

  increaseCount() {
    this.count++;
    // toString omdat localstorage geen integers enzo kan opslaan
    localStorage.setItem('count', this.count.toString());
  }
  decreaseCount() {
    this.count--;
    // toString omdat localstorage geen integers enzo kan opslaan
    localStorage.setItem('count', this.count.toString());
  }


  fetchMyData() {
    fetch(this.url)
    .then(response => response.json())
    .then(json => this.todos = json)
  }

  fetchMyUsers() {
    fetch(this.urlUsers)
    .then(response => response.json())
    .then(json => this.users = json)
  }

  ngOnInit() {
    // Fetch data when initialized
    this.fetchMyData();
    this.fetchMyUsers();
    // Pull count from localStorage on initialization
    const storedCount = localStorage.getItem('count');
    this.count = storedCount !== null ? parseInt(storedCount) : 0;
  }

  // todo:any helps the code select the right todo to update
  changeDone(todo:any) {
    todo.done = !todo.done;
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0'},
      body: JSON.stringify(todo)
    };

    fetch('http://localhost:3000/todo/' + todo.id, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.fetchMyData();
      })
      .catch(err => console.error(err));
  } 


  postData () {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      // Stringify omdat we tekst moeten meegeven
      body: JSON.stringify({
        'title': this.myContent,
        'owner': this.user,
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

  // // WIP => Deletebutton
  // deleteData(todo:any) {
  //   let deleteURL = 'http://localhost:3000/todo'+'/'+todo.id
  //   const options = {
  //     method: 'DELETE',
  //     headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
  //     body: 'false'
  //   };
    
  //   fetch(deleteURL, options)
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err));
  // }
}
