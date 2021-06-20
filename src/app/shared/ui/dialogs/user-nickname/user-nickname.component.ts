import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SocketManagerService } from 'src/app/shared/services/socket-manager.service';

@Component({
  selector: 'app-user-nickname',
  templateUrl: './user-nickname.component.html',
  styleUrls: ['./user-nickname.component.scss']
})
export class UserNicknameComponent implements OnInit {
  username: string = "";

  constructor(private dialogRef: MatDialogRef<UserNicknameComponent>, private socketManagerService: SocketManagerService) { }

  ngOnInit(): void {
  }

  createUser() {
    localStorage.setItem('username', this.username);
    this.socketManagerService.setupSocket(this.username);
    this.dialogRef.close();

  }



}
