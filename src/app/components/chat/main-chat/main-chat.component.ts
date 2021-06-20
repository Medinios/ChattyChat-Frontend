import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SocketManagerService } from 'src/app/shared/services/socket-manager.service';
import { UserNicknameComponent } from 'src/app/shared/ui/dialogs/user-nickname/user-nickname.component';

@UntilDestroy()
@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent implements OnInit {

  message: String ="";
  messagesList = [];
  roomName: string;
  isEmojiPickerVisible: boolean = false;
  
  typing = false;
  timeout: any;
  
  constructor(private socketManagerService: SocketManagerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initialChat();
  }

  initialChat() {
    if(localStorage.getItem('username')) {
      this.socketManagerService.setupSocket(localStorage.getItem('username'));
    } else {
      this.dialog.open(UserNicknameComponent,{ disableClose: true });
    }
    this.socketManagerService.roomChanger.pipe(untilDestroyed(this)).subscribe((res) => {
      this.roomName = res;
    })
  }

  sendMessage() {
    this.socketManagerService.sendMessage(this.message, this.roomName);
    this.message = '';
  }


  public addEmoji(event: any) {
     this.message = `${this.message}${event.emoji.native}`;
     this.isEmojiPickerVisible = false;
  }


  
  onKeyDownNotEnter(){
    if( this.typing == false) {
      this.typing = true;
      this.socketManagerService.typing(this.typing, this.roomName);
      this.timeout = setTimeout(()=> {
        this.typing = false;
        this.socketManagerService.typing(this.typing, this.roomName);
      }, 5000);
    } else {
      clearTimeout( this.timeout);
      this.timeout = setTimeout(()=> {
        this.typing = false;
        this.socketManagerService.typing(this.typing, this.roomName);
      }, 5000);
    }
  
  }

}
