import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SocketManagerService } from 'src/app/shared/services/socket-manager.service';
import { CreateRoomComponent } from 'src/app/shared/ui/dialogs/create-room/create-room.component';

@UntilDestroy()
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  roomsList = [];
  currentRoom: string = "General";
  constructor(private socketManagerService: SocketManagerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initialRooms();
  }
  initialRooms() {
      this.socketManagerService.roomsSubject.pipe(untilDestroyed(this)).subscribe((res:any) => {
        this.roomsList = res;
      });
  }

  changeRoom(roomName: string) {
    this.currentRoom = roomName;
    this.socketManagerService.changeRoom(roomName);
  }
  createRoom() {
    this.dialog.open(CreateRoomComponent);
  }
}
