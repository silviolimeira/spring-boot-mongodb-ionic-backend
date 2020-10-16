import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { StorageService } from './storage.service';

export class UserService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEmail(email: string) {
        return this.http.get<any>(`${API_CONFIG.baseURL}/clientes/email?value=${email}`);
    }

}