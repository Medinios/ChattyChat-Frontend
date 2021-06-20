import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SocketManagerService } from 'src/app/shared/services/socket-manager.service';

@UntilDestroy()
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string;

  constructor(private socketManagerService: SocketManagerService) { }

  ngOnInit(): void {
    this.initialUser();

  }

  initialUser() {
    this.username = this.socketManagerService.username;
    this.socketManagerService.nameChangeSubject.pipe(untilDestroyed(this)).subscribe(() => {
      this.username = this.socketManagerService.username;
    })
  }

  saveChat() {
    this.socketManagerService.saveChat();
  }

  openChat() {
    this.socketManagerService.getChat();
  }
}
