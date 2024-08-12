import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIService } from '../base-api.service';
import { Message } from './message.entity';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends BaseAPIService {
  endpoint = '/improvedMessages';

  loadMessage(uuid: string): Observable<Message[]> {
    return this.performGet(this.endpoint, { key: 'uuid', value: uuid });
  }

  loadComments(parentUuid: string): Observable<Message[]> {
    return this.performGet(this.endpoint, { key: 'parent', value: parentUuid });
  }

  getMessages(): Observable<Message[]> {
    return this.performGet(this.endpoint);
  }
}
