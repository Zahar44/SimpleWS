import { TestBed } from '@angular/core/testing';

import { AvatarsDicevearService } from './avatars.dicevear.service';

describe('AvatarsDicevearServiceService', () => {
  let service: AvatarsDicevearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarsDicevearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
