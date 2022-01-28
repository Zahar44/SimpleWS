import { Injectable } from "@angular/core";
import { UserEntity } from "../websocket.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizationService {
  private _user!: UserEntity;

  constructor() {}

  public setUser(user: UserEntity) {
    this._user = user;
  }

  public getUser() {
    return this._user;
  }

  public isAuthenticated(): boolean {
    return this._user != null;
  }
}
