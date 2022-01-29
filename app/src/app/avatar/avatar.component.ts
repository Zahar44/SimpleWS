import { Component, OnInit } from '@angular/core';
import { AvatarsDicevearService, SvgAvatar } from '../random.avatars/avatars.dicevear.service';
import { AvatarService } from './avatar.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  private avatarLoaded = false;
  avatar!: SvgAvatar;

  constructor(
    private readonly avatarsDicevearService: AvatarsDicevearService,
    private readonly avatarService: AvatarService,
  ) { 
    this.avatarService.seedChange.subscribe((seed) => {
      this.setAvatar();
    })
  }

  ngOnInit(): void {
    this.setAvatar();
  }

  public isAvatarLoaded() {
    return this.avatarLoaded;
  }

  private async setAvatar() {
    this.avatar = await this.avatarsDicevearService.getAvatar();
    this.avatarLoaded = true;
  }
}
