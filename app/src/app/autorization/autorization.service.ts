import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { AvatarsDicevearService } from "../random.avatars/avatars.dicevear.service";
import { Seed } from "../random.avatars/seed";
import { UserEntity } from "../websocket.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizationService {
  private _user!: UserEntity;
  private _logged: boolean = false;

  constructor() {
    if (!environment.debugg) {
      this._logged = this.isNameExist();
    }

    if (this._logged) {
      this.getLocalUserName();
    }
  }

  public setUser(user: UserEntity) {
    this._user = user;

    if (!environment.debugg) {
      this.saveUser();
    }
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
    const seed = String(localStorage.getItem('seed'));
    this._user = { name, seed };
  }

  private isNameExist() {
    return localStorage.getItem('name') != null;
  }
}
