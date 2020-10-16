import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'api.config';
import { CredentialsDTO } from 'src/app/models/credentials.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  creds: CredentialsDTO = {
    email: '',
    password: ''
  }

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    console.log("login");
    console.log(this.creds);

    this.http.post(
        `${API_CONFIG.baseURL}/login`, 
        this.creds,
        { observe: 'response', responseType: 'text'}
      ).subscribe( response => {
        console.log(response.headers.get('Authorization'));
      }, 
      error => {}
    )    
  }

}
