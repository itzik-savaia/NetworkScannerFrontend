import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _hubConnection: HubConnection | undefined;
  hubConnection;
  SendMessage: FormGroup;
  messages: any[] = [];
  message: any[] = [];
  start_ip
  end_ip
  ErrorMsg

  data200 = [];
  data400 = [];
  constructor(private _formBuilder: FormBuilder) {
    this.hubConnection = this._hubConnection

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://networkscanner-s.herokuapp.com/ip')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.start().catch(err => console.log(err.toString()));
    this.hubConnection.on('Send', (data: any) => {
      this.data200.push(data.endPoint);
      if (data.status == 200) {
        console.log(data);
        this.data200.push(data.endPoint);
        this.messages.push(data.endPoint);
      } else {
        this.ErrorMsg = data
        console.log(this.ErrorMsg);
        setTimeout(() => {
          this.ErrorMsg = undefined
        }, 5000);
        this.data400.push(data.endPoint);
      }
    });
  }

  ngOnInit() {
    this.SendMessage = this._formBuilder.group({
      StartIP: [null,
        [
          Validators.required,
          Validators.pattern("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
        ]],
      EndIP: [null,
        [
          Validators.required,
          Validators.pattern("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
        ]],
    })
  }
  IpRange(): void {
    this.start_ip = this.SendMessage.value.StartIP;
    this.end_ip = this.SendMessage.value.EndIP;
  }
  public sendMessage(): void {
    this.start_ip = this.SendMessage.value.StartIP;
    this.end_ip = this.SendMessage.value.EndIP;
    const data = this.start_ip + ',' + this.end_ip;
    try {
      if (this.hubConnection) {
        this.hubConnection.invoke('Send', data);
      }
      this.messages.push(data);
    } catch (error) {
      console.log(error);
    }
  }
}
