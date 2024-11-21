import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as mockRaw from '../../../data/user.json';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any)
  let httpClientSpy: {post: jasmine.Spy}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post'])
    service = new AuthService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Prueba del sendCredential
  it('Should return a "data" and "tokenSession" object', (done: DoneFn) => {
    //Arrange
    const user: any = mockUser.userOk
    const mockResponse = {
      data:{},
      tokenSession: 'asasap'
    }
    httpClientSpy.post.and.returnValue(
      of(mockResponse)
    ) //API response

    //Act
    service.sendCredentials(user.email, user.password).subscribe(apiResponse => { // ['data','tokenSession']
      const getProperties = Object.keys(apiResponse)
      expect(getProperties).toContain('data')
      expect(getProperties).toContain('tokenSession')
      done()
    })
  })
});
