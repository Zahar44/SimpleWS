import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { AutorizationService } from '../autorization/autorization.service';
import { Seed } from '../random.avatars/seed';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private _seed: string = 'random';
  
  public readonly seedChange: Subject<string> = new Subject<string>();
  
  constructor(
    private readonly autorizationService: AutorizationService,
  ) {
    if (!this.autorizationService.isAuthenticated()) {
      this._seed = Seed.getRandom();
      this.saveSeed();
    } else {
      this._seed = String(localStorage.getItem('seed'));
    }
  }

  public getSeed() {
    return this._seed;
  }

  public changeAvatar() {
    this._seed = Seed.getRandom();
    this.saveSeed();
  }

  private saveSeed() {
    localStorage.setItem('seed', this._seed);
    this.seedChange.next(this._seed);
  }
}