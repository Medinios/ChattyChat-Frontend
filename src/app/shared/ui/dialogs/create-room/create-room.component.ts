import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SocketManagerService } from 'src/app/shared/services/socket-manager.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  room: string = "";
  constructor(private dialogRef: MatDialogRef<CreateRoomComponent>, private socketManagerService: SocketManagerService) { }

  ngOnInit(): void {
  }

  createRoom() {
    this.socketManagerService.createRoom(this.room);
    this.dialogRef.close();
  }

}
