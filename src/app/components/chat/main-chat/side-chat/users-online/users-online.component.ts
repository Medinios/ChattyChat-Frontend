import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SocketManagerService } from 'src/app/shared/services/socket-manager.service';

@UntilDestroy()
@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.scss']
})
export class UsersOnlineComponent implements OnInit {

  usersOnline: Array<any>= [];
  constructor(private socketManagerService: SocketManagerService) { }

  ngOnInit(): void {
    this.initialUsersOnline();
  }

  initialUsersOnline() {
    this.socketManagerService.usersListSubject.pipe(untilDestroyed(this)).subscribe((res) => {
        this.usersOnline = res;
    })
    this.typingSubscriber();
  }

  typingSubscriber() {
    this.socketManagerService.userTypingSubject.pipe(untilDestroyed(this)).subscribe((data: any)=> {
      const id = this.usersOnline.findIndex(x => x.username === data.username || x == data.username);
      this.usersOnline[id] = data;
    });
  }

}
