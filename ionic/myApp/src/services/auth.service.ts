import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) { }

    authenticate(creds: CredentialsDTO) {
        return this.http.post(
            `${API_CONFIG.baseURL}/login`, 
            creds,
            { observe: 'response', responseType: 'text'}
        );
    }

    sucessfulLogin(authorization: string) {
        let tok = authorization.substring(7);
        let user : LocalUser = {
            token: tok
        }
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }

}