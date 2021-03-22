import { TestBed } from '@angular/core/testing';

import { FirebaseAdminService } from './firebase-admin.service';

describe('FirebaseAdminService', () => {
  let service: FirebaseAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
