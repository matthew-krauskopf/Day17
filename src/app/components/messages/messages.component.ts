import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from '../../features/message/message.entity';
import { MessageFacade } from '../../features/message/message.facade';
import { User } from '../../features/user/user.entity';
import { UserFacade } from '../../features/user/user.facade';
import { PostedMessage } from '../../model/posted-message';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { ConfirmActionComponent } from '../dialog/confirm-action/confirm-action.component';
import { EditMessageComponent } from '../dialog/edit-message/edit-message.component';
import { PostMessageComponent } from '../post-message/post-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ActionBarComponent,
    PostMessageComponent,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  user$: Observable<User | null>;
  messages$: Observable<Message[] | null>;
  usersFacade: UserFacade = inject(UserFacade);
  messageFacade: MessageFacade = inject(MessageFacade);
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);

  constructor() {
    this.user$ = this.usersFacade.user$;
    this.messages$ = this.messageFacade.messages$;
  }

  openThread(message: Message) {
    this.messageFacade.openMessage(message);
    this.router.navigate(['home', 'thread', message.uuid]);
  }

  addMessage($event: PostedMessage) {
    this.messageFacade.addMessage($event.text, $event.user);
  }

  editMessage($event: Event, message: Message) {
    $event.stopPropagation();

    const dialogRef = this.dialog.open(EditMessageComponent, {
      data: {
        text: message.text,
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (form) {
        this.messageFacade.editMessage({
          ...message,
          text: form.value.text,
        });
      }
    });
  }

  deleteMessage($event: Event, message: Message) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmActionComponent);

    dialogRef.afterClosed().subscribe((action) => {
      if (action && action == true) {
        this.messageFacade.deleteMessage(message);
      }
    });
  }

  toggleLike(user: User, message: Message) {
    this.messageFacade.toggleLike(user, message);
  }

  toggleRetwat(user: User, message: Message) {
    this.messageFacade.toggleRetwat(user, message);
  }
}
