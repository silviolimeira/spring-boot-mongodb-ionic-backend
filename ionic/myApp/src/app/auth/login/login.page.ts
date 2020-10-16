import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { AuthService } from 'src/services/auth.service';

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

  constructor(public http: HttpClient, public authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log("login");
    this.authService.authenticate(this.creds)
      .subscribe(response => {
        this.authService.sucessfulLogin(response.headers.get('Authorization'));
      },
      error => {})
  }

}
