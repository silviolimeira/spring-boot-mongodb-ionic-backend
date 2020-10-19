import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/api.config";
import { StorageService } from "./storage.service";

@Injectable()
export class UserService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findByEmail(email: string) {
    //let token = this.storage.getLocalUser().token;
    //let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
    //console.log('authHeader: ' + authHeader);

    console.log("findByEmail: " + email);
    console.log(`${API_CONFIG.baseURL}/users/email?value=${email}`);

    return this.http.get<any>(
      `${API_CONFIG.baseURL}/userss/email?value=${email}`
    );
  }
}
