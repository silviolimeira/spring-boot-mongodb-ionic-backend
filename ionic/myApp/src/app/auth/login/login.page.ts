import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'api.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    console.log("login");

    this.http.post(
        `${API_CONFIG.baseURL}/login`, 
        { email: 'admin@gmail.com', password: 'admin1'},
        { observe: 'response', responseType: 'text'}
      ).subscribe( response => {
        console.log(response.headers.get('Authorization'));
      }, 
      error => {}
    )    
  }

}
