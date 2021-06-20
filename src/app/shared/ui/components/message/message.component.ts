import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  data: any;
  currentUser: string = '';

  constructor() { 
    if(localStorage.getItem('username')){
    this.currentUser = localStorage.getItem('username') || '';
    console.log(this.currentUser);
    }
  }

  ngOnInit(): void {
    
  }

}
