import { TestBed } from '@angular/core/testing';
import { InjectSessionInterceptor } from './inject-session.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('InjectSessionInterceptor', () => {
  let interceptor: InjectSessionInterceptor
    
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        InjectSessionInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InjectSessionInterceptor,
          multi: true
        }
      ],
    });

    interceptor = TestBed.inject(InjectSessionInterceptor)
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
