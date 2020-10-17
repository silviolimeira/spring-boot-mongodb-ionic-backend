import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';

import jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) { }

    authenticate(creds: CredentialsDTO) {
        console.log('authenticate: ' + JSON.stringify(creds));
        console.log(`${API_CONFIG.baseURL}/login`);
        return this.http.post(
            `${API_CONFIG.baseURL}/login`, 
            creds,
            { observe: 'response', responseType: 'text'}
        );
    }

    sucessfulLogin(authorization: string) {

        console.log('successfulLogin');
        let tok = authorization.substring(7);

        let decoded = jwt_decode(tok);
        console.log("decoded:");
        console.log(decoded);


        let user : LocalUser = {
            token: tok,
            email: jwt_decode(tok).sub
        }
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }

}