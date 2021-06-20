import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { SocketManagerService } from 'src/app/shared/services/socket-manager.service';
import { MessageComponent } from 'src/app/shared/ui/components/message/message.component';

@UntilDestroy()
@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  @ViewChild('wallContainer', {read: ViewContainerRef}) viewContainer: ViewContainerRef | any;
  historyMode: boolean = false;

  constructor(private socketManagerService: SocketManagerService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.addMessage();
    this.readOldChat();
  }

  addMessage() { 
    this.socketManagerService.messagesSubject.pipe(untilDestroyed(this)).subscribe((message) => {
      if(!this.historyMode) {
      this._createMessage(message);
      }
    })
  }

  _createMessage(message) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory  (MessageComponent);
    const componentRef = this.viewContainer.createComponent(componentFactory);
    componentRef.instance.data = message;
    setTimeout(()=> {const elem =(document.getElementsByClassName('wall-messages') as unknown as HTMLElement);
    elem[0].scrollTop = elem[0].scrollHeight;}, 100);
  }

  readOldChat() {
   this.socketManagerService.readChatHistorySubject.pipe(untilDestroyed(this)).subscribe((res)=> {
     this.viewContainer.clear();
     if(res && res.response && res.response.history) {
       this.historyMode = true;
       res.response.history.map((message) => {
          this._createMessage(message);
       })
     }
   }); 
  }

  closeHistory() {
    this.historyMode = false;
    this.viewContainer.clear();
  }



}
