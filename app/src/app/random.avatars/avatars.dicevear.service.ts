import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvatarService } from '../avatar/avatar.service';
import { DiceavearApi, SpitesType } from './dicevear.api';

@Injectable({
  providedIn: 'root'
})
export class AvatarsDicevearService {

  constructor(
    private readonly httpClient: HttpClient, 
    private readonly avatarService: AvatarService,
  ) {}

  public async getAvatar(): Promise<SvgAvatar> {
    const rawSvg = await this.getRawSvg();
    const strs = rawSvg.match(/<path[a-zA-Z ="0-9-#/]+>/g) || [];
    const pathValues = strs.map((p) => {
      return p.replace('<path ', '').replace('/>', '');
    })
    return this.buildAvatarFromRaw(pathValues);
  }

  private buildAvatarFromRaw(strs: string[]): SvgAvatar {
    const pathes = this.buildPathes(strs);
    return { pathes };
  }

  private buildPathes(strs: string[]) {
    const pathes: Path[] = [];

    for (const str of strs) {
      const d = this.getD(str);
      const fill = this.getFill(str);
      pathes.push({ d, fill });
    }

    return pathes;
  }

  private getD(str: string) {
    return String(str.match(/[d=\"][a-zA-Z0-9- ]+[\"]/)).replace('\"', '').slice(0, -1);
  }

  private getFill(str: string) {
    return String(str.match(/[fill="][a-zA-Z0-9#]+["]/)).replace('"', '').slice(0, -1);
  }

  private async getRawSvg(): Promise<string> {
    const uri = DiceavearApi.create()
      .withSprites(SpitesType.human)
      .withSeed(this.avatarService.getSeed())
      .getUri()
    const response = await this.httpClient.get(uri, { responseType: 'text' }).toPromise();
    return response || '';
  }
}

export interface SvgAvatar {
  pathes: Path[];
}

export interface Path {
  d: string;
  fill: string;
}