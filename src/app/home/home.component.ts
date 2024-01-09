import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Add toaster import
import { ToastrService } from 'ngx-toastr';

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
  newUser: any;
  newPassword: any;
  newDone: any;
  payload: any;
  budget:number=0;
  storedBudget:number=0;
  totalPrice: any;
  newPrice:number=0;
  myPrice: number=0;
  username: any;

  // Add toasterservice
  constructor(private toastr: ToastrService) { }

  // Christmas counter increase or decrease value
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

// Fetches the todos api-endpoint and adds it to an array named todos
  fetchMyData() {
    fetch(this.url)
    .then(response => response.json())
    .then(json => {
      this.todos = json;
      // THIS WILL CALCULATE THE TOTAL SPENT IN THE SHOPPING LIST
      this.totalPrice = this.todos.reduce((total, todo)=>total +parseFloat(todo.price),0)
    })
  };
// fetches the users api-endpoint and adds it to an array named users
  fetchMyUsers() {
    fetch(this.urlUsers)
    .then(response => response.json())
    .then(json => this.users = json)
  }

  ngOnInit() {
    this.toastr.success('hello world!', 'Toastr fun!')
    // Fetch data when initialized
    this.fetchMyData();
    this.fetchMyUsers();
    // Pull count from localStorage on initialization
    const storedCount = localStorage.getItem('count');
    this.count = storedCount !== null ? parseInt(storedCount) : 0;
    // Initialise budget
    const storedBudget = localStorage.getItem('budget');
   this.budget = storedBudget !== null ? parseInt(storedBudget) : 1000;
  }

  // todo:any helps the code select the right todo to update
  // // Old method
  // changeDone(todo:any) {
  //   todo.done = !todo.done;
  //   const options = {
  //     method: 'PUT',
  //     headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0'},
  //     body: JSON.stringify(todo)
  //   };
  //   // The fetch is modified with the todo.id to use the current id as it's reference for what needs to be updated
  //   fetch('http://localhost:3000/todo/' + todo.id, options)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response);
  //       this.fetchMyData();
  //     })
  //     .catch(err => console.error(err));

  changeDone(todo: any) {
    // make the newDone the inverse of the current status
    let newDone = !todo.done;
    // Make the newDone-string so it's compatible with the requests
    let donePayload = JSON.stringify({ done: newDone }); // do not use double quotes
    console.log(donePayload);

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/2023.5.8'
        },
        // just add the payload as it is a json-object
        body: donePayload
    };

    fetch('http://localhost:3000/todo/' + todo.id, options)
        .then(response => response.json())
        // Always update your data
        .then(response => this.fetchMyData())
        .catch(err => console.error(err));
}

  postData () {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      // Stringify omdat we tekst moeten meegeven
      body: JSON.stringify({
        'title': this.myContent,
        'owner': this.username,
        'price': this.myPrice,
        'done':false,
      })
    };
    // Selects the todo-endpoint and uses the options in the postData command on that dataset
    fetch('http://localhost:3000/todo', options)
      .then(response => response.json())
      .then(response =>{ 
        console.log(response);
        // refresh data
        this.fetchMyData();
        // make sure the content cleared upon post
        this.myContent = '';
        this.myPrice = 0;
      })
      .catch(err => console.error(err));
  }

  // Deletebutton
  deleteData(todo: any) {
    // (taken from insomnia) uses the DELETE function to delete an entire element
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/2023.5.8'
      },
    };
  // The fetch is modified with the todo.id to use the current id as it's reference for what needs to be deleted
    fetch('http://localhost:3000/todo/' + todo.id, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.fetchMyData();
      })
      .catch(err => console.error(err));
  }

  // New user command
  addUser() {
    const userData = JSON.stringify({
      // the this.newUser and this.newPassword refer to the ngModel's in the HTML with the same values, don't forget to declare at the top
      'username': this.newUser,
      'password': this.newPassword
    })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/2023.5.8'
      },
      body: userData
    };
  
    fetch('http://localhost:3000/users/', options)
      .then(response => response.json())
      // This part of the code refreshes the list when a user is added
      .then(response => {
        this.fetchMyUsers()
      })
      .catch(err => console.error(err));
      // always clear your forms
      this.newUser = '';
      this.newPassword ='';
  }

  // delete user method
  deleteUser(user:any) {
    // (taken from insomnia) uses the DELETE function to delete an entire element
    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      body: 'false'
    };
    
    fetch('http://localhost:3000/users/'+user.id, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  // edit product button
  editData(user:any){
    let newItem = prompt("what is the new item?")
    let payload = JSON.stringify({ title: newItem })
    console.log(payload)
    const options = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      body: payload
    };
    
    fetch('http://localhost:3000/todo/'+user.id, options)
      .then(response => response.json())
      .then(response => this.fetchMyData())
      .catch(err => console.error(err));
  }

    // edit product button
    editPrice(user:any){
      let newPrice = prompt("what is the new price?")
      let payload = JSON.stringify({ price: newPrice })
      console.log(payload)
      const options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
        body: payload
      };
      
      fetch('http://localhost:3000/todo/'+user.id, options)
        .then(response => response.json())
        .then(response => this.fetchMyData())
        .catch(err => console.error(err));
    }
}
