import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainChatComponent } from './components/chat/main-chat/main-chat.component';
import { FormsModule } from '@angular/forms';
import { UserNicknameComponent } from './shared/ui/dialogs/user-nickname/user-nickname.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UsersOnlineComponent } from './components/chat/main-chat/side-chat/users-online/users-online.component';
import { WallComponent } from './components/chat/main-chat/wall/wall.component';
import { MessageComponent } from './shared/ui/components/message/message.component';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UserComponent } from './components/chat/main-chat/side-chat/user/user.component';
import { SideChatComponent } from './components/chat/main-chat/side-chat/side-chat.component';
import { RoomsComponent } from './components/chat/main-chat/side-chat/rooms/rooms.component';
import { CreateRoomComponent } from './shared/ui/dialogs/create-room/create-room.component';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
  declarations: [
    AppComponent,
    MainChatComponent,
    UserNicknameComponent,
    UsersOnlineComponent,
    WallComponent,
    MessageComponent,
    UserComponent,
    SideChatComponent,
    RoomsComponent,
    CreateRoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    PickerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    //material:
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
