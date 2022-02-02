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
  @Input() set seed(v: string) {
    setTimeout(() => {
      console.log(v);
      this.seed = v;
    }, 0);
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
    if (!this.seed) {
      console.log(1);
      await this.setLocalAvatar();
    } else {
      console.log(2);
      await this.setCustomAvatar();
    }
  }

  public isAvatarLoaded() {
    return this.avatarLoaded;
  }

  private async setCustomAvatar() {
    console.log(this.seed);
    this.avatar = await this.avatarsDicevearService.getAvatarFrom(this.seed);
    this.avatarLoaded = true;
  }

  private async setLocalAvatar() {
    console.log(this.seed);
    this.avatar = await this.avatarsDicevearService.getAvatar();
    this.avatarLoaded = true;
  }
}
