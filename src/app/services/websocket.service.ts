import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';  // IMPORTANTE - Valido para la version 2.3.0 tanto del back como del front - socket.io

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: any;
  readonly uri: string = 'ws://localhost:3000';

  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string): Observable<any>{
    return new Observable(subscriber => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any): any{
    this.socket.emit(eventName, data);
  }

}
