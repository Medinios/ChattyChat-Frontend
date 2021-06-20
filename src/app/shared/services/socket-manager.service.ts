import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketManagerService {
  usersListSubject =  new Subject<Array<string>>();
  messagesSubject = new Subject<any>();
  userTypingSubject = new Subject<string>();
  roomsSubject = new Subject<string>();
  readChatHistorySubject = new Subject<any>();
  roomChanger = new BehaviorSubject<string>('General');
  nameChangeSubject = new Subject<string>();
  messagesHistory: Array<any> = [];
  username: string = '';
  roomName: string;
  socket: any;

  constructor(private firebaseService: FirebaseService) { }

  setupSocket(username: any) {
    this.socket = io(environment.SOCKET_URL, {  query: {user: username}  });
    this.username = username;
    this.nameChangeSubject.next(username);
    this.socket.on('users-changed', (data: Array<string>) => {
      this.usersListSubject.next(data);
    })
    this.socket.on('message-broadcast', (data: any) => {
      if (data) {
          this.messagesSubject.next(data);
          this.messagesHistory.push(data);
       }
     });

     this.socket.on('user-typing', (data: any) => {
      this.userTypingSubject.next(data);
     });

     this.socket.on('room-created', (data: any) => {
        this.roomsSubject.next(data);
    });
     
  }

  sendMessage(message: String, roomName: String) {
    this.socket.emit('message',{message: message , room: roomName});
  }

  typing(typing: boolean, roomName: string) {
    this.socket.emit('typing', {username: this.username, typing: typing , room: roomName});
  }

  userExists(username: String) {
    this.socket.emit('check-user-exists', username);
  }

  createRoom(roomName: String) {
    this.socket.emit('create-room', roomName);
  }

  changeRoom(roomName: string) {
    this.socket.emit('join-room', roomName);
    this.roomChanger.next(roomName);
  }

  saveChat() {
    this.firebaseService.addMessagesHistory(this.messagesHistory, this.username);
  }

  getChat() {
    this.firebaseService.readMessagesHistory(this.username).pipe(take(1)).subscribe((res)=> {
      this.readChatHistorySubject.next({response:res, history: true});
    })
  }
}
