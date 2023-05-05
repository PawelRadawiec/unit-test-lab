import { UserSearchTerms } from './../models/user-search.model';
import { User } from './../models/user.model';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';

const BASE_URL = 'http://localhost:3000/users';

const USER_MOCK: User = {
  id: 1,
  age: '12',
  city: 'City',
  email: 'email@gmail.com',
  name: 'Name',
  surname: 'Surname',
};

describe('UsersService', () => {
  let service: UsersService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    /*
      TestBed:
       - creates environment for testing service
       - configured like normal angular module with imports, declarations, providers

       TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], 
            providers: [UsersService],
        });
        
      Testing http services contains:
        - HttpClientTestingModule is mock implementation of HttpClientModule
        - HttpTestingController which will find our pending request

      We can split http service test into following steps:
        1. Call service method
        2. Find pedning request using HttpTestingController instance. For example using expectOne() function
        3. Return request response using flush() function
        4. Check response
        5. Check if there are no pending requests
        
    */
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call create and return user', () => {
    // 1
    service.create(USER_MOCK).subscribe((response) => {
      // 4
      expect(response).toEqual(USER_MOCK);
    });

    // 2
    const httpMock = httpController.expectOne(BASE_URL);
    // 3
    httpMock.flush(USER_MOCK);
    expect(httpMock.request.method).toBe('POST');

    // 5
    httpController.verify();
  });

  it('should call edit and return user', () => {
    // 1
    service.edit(USER_MOCK).subscribe((response) => {
      // 4
      expect(response).toEqual(USER_MOCK);
    });

    // 2
    const httpMock = httpController.expectOne(`${BASE_URL}/${USER_MOCK.id}`);
    // 3
    httpMock.flush(USER_MOCK);
    expect(httpMock.request.method).toBe('PUT');
    // 5
    httpController.verify();
  });

  it('should call list and return user lists', () => {
    // 1
    const users = [USER_MOCK, USER_MOCK];
    service.list().subscribe((response) => {
      // 4
      expect(response).toEqual(users);
    });
    // 2
    const httpMock = httpController.expectOne(`${BASE_URL}`);
    // 3
    httpMock.flush(users);
    expect(httpMock.request.method).toBe('GET');
    // 5
    httpController.verify();
  });

  it('should call search with params and retrun users', () => {
    const users = [USER_MOCK, USER_MOCK];
    const terms: UserSearchTerms = { name: 'Name', surname: 'Surname' };
    service.search(terms).subscribe((response) => {
      expect(response).toEqual(users);
    });
    // 2
    const httpMock = httpController.expectOne(
      `${BASE_URL}?name=Name&surname=Surname`
    );
    httpMock.flush(users);
    expect(httpMock.request.method).toBe('GET');
    // 5
    httpController.verify();
  });

  it('should call delete', () => {
    // 1
    service.delete(USER_MOCK.id).subscribe((response) => {
      // 4
      expect(response).toBeFalsy();
    });
    // 2
    const httpMock = httpController.expectOne(`${BASE_URL}/${USER_MOCK.id}`);
    // 3
    httpMock.flush(null);
    expect(httpMock.request.method).toBe('DELETE');
    // 5
    httpController.verify();
  });
});
