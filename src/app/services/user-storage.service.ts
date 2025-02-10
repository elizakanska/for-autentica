import { Injectable } from '@angular/core';

const USER = 'q_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  static saveUser(user: any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user == null){return ''};
    return user.id;
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user == null){return ''};
    return user.role;
  }

  static isAdmin(): boolean{
    const role:string = this.getUserRole();
    return role == 'ADMIN';
  }

  static isUser(): boolean{
    const role:string = this.getUserRole();
    return role == 'USER';
  }

  static logout(): void{
    window.localStorage.removeItem(USER);
  }
}
