import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Authentication, StorageInfo, User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  botaoEdit: any;
  getUserList(usuarios: User) {
    throw new Error('Method not implemented.');
  }

  //private dataEdit = new BehaviorSubject<User>(null);
  //botaoEdit = this.dataEdit.asObservable();

  constructor(private http: HttpClient) { 
    console.log('resolução');
  }

  api_url = environment.api_url;

  authentication(authentication: Authentication){
    const headers = new HttpHeaders ({Authorization: 'Basic ' + btoa(authentication.username + ':' + authentication.password)});
    return this.http.get(this.api_url + 'user/login', {headers/*, responseType: 'text' as 'text'*/}).pipe(
      map(
        authData => {
          //return authData;
          let storageInformation: StorageInfo = {
            admin: authData[0],
            token: authData[1]
          }

          console.log(storageInformation);
          return storageInformation;
        }
      )
    );
  }
/*
  getUserList(usuarios: User){
    this.dataEdit.next(usuarios);
  } */
}
