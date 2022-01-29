import { Injectable } from "@angular/core";
import { AvatarsDicevearService } from "../random.avatars/avatars.dicevear.service";
import { Seed } from "../random.avatars/seed";
import { UserEntity } from "../websocket.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizationService {
  private _user!: UserEntity;
  private _logged: boolean;

  constructor() {
    this._logged = this.isNameExist();

    if (this._logged) {
      this.getLocalUserName();
    }
  }

  public setUser(user: UserEntity) {
    this._user = user;
    this.saveUser();
  }

  public getUser(): UserEntity {
    return this._user;
  }

  public isAuthenticated(): boolean {
    return this._user != null;
  }

  private saveUser() {
    localStorage.setItem('name', this._user.name);
    this._logged = true;
  }

  private getLocalUserName() {
    const name = String(localStorage.getItem('name'));
    this._user = { name };
  }

  private isNameExist() {
    return localStorage.getItem('name') != null;
  }
}
