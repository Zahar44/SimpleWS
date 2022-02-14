import { Component, Input, OnInit } from '@angular/core';
import { AvatarsDicevearService, SvgAvatar } from '../random.avatars/avatars.dicevear.service';
import { AvatarService } from './avatar.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  private avatarLoaded = false;
  private _seed: string = '';

  @Input() set seed(v: string) {
    this._seed = v;
  }
  avatar!: SvgAvatar;

  constructor(
    private readonly avatarsDicevearService: AvatarsDicevearService,
    private readonly avatarService: AvatarService,
  ) { 
    this.avatarService.seedChange.subscribe((seed) => {
      this.setLocalAvatar();
    })
  }

  async ngOnInit(): Promise<void> {
    if (!this._seed) {
      await this.setLocalAvatar();
    } else {
      await this.setCustomAvatar();
    }
  }

  public isAvatarLoaded() {
    return this.avatarLoaded;
  }

  private async setCustomAvatar() {
    this.avatar = await this.avatarsDicevearService.getAvatarFrom(this._seed);
    this.avatarLoaded = true;
  }

  private async setLocalAvatar() {
    this.avatar = await this.avatarsDicevearService.getAvatar();
    this.avatarLoaded = true;
  }
}
