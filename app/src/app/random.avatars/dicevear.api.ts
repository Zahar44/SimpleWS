import { Seed } from "./seed";

export enum SpitesType {
  male = 'male',
  female = 'female',
  human = 'human',
}

export class DiceavearApi implements DiceavearApiWithSprites, DiceavearApiBuildableWithSeed, DiceavearApiBuildable {
  private readonly baseApi: string;
  private sprites: SpitesType = SpitesType.human;
  private seed: string = '';

  private constructor() {
    this.baseApi = 'https://avatars.dicebear.com/api';
  }

  public static create() {
    return new DiceavearApi() as DiceavearApiWithSprites;
  }

  public withSprites(sprites: SpitesType) {
    this.sprites = sprites;;
    return this as DiceavearApiBuildableWithSeed;
  }

  public withSeed(seed: string) {
    this.seed = seed;
    return this as DiceavearApiBuildable;
  }

  public getUri() {
    this.setEmptyFields();
    return this.baseApi + '/' + this.sprites + '/' + this.seed + '.svg';
  }

  private setEmptyFields() {
    if(!this.seed) {
      this.seed = Seed.getRandom();
    }
  }
}

interface DiceavearApiWithSprites {
  withSprites(sprites: SpitesType): DiceavearApiBuildableWithSeed;
}

interface DiceavearApiBuildableWithSeed {
  withSeed(seed: string): DiceavearApiBuildable;
  getUri(): string;
}

interface DiceavearApiBuildable {
  getUri(): string;
}