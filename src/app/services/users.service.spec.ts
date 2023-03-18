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
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call create and return user', () => {
    service.create(USER_MOCK).subscribe((response) => {
      expect(response).toEqual(USER_MOCK);
    });

    const httpMock = httpController.expectOne(BASE_URL);
    httpMock.flush(USER_MOCK);
    expect(httpMock.request.method).toBe('POST');
  });

  it('should call edit and return user', () => {
    service.edit(USER_MOCK).subscribe((response) => {
      expect(response).toEqual(USER_MOCK);
    });

    const httpMock = httpController.expectOne(`${BASE_URL}/${USER_MOCK.id}`);
    httpMock.flush(USER_MOCK);
    expect(httpMock.request.method).toBe('PUT');
  });

  it('should call list and return user lists', () => {
    const users = [USER_MOCK, USER_MOCK];
    service.list().subscribe((response) => {
      expect(response).toEqual(users);
    });

    const httpMock = httpController.expectOne(`${BASE_URL}`);
    httpMock.flush(users);
    expect(httpMock.request.method).toBe('GET');
  });

  it('should call search with params and retrun users', () => {
    const users = [USER_MOCK, USER_MOCK];
    const terms: UserSearchTerms = { name: 'Name', surname: 'Surname' };
    service.search(terms).subscribe((response) => {
      expect(response).toEqual(users);
    });

    const httpMock = httpController.expectOne(
      `${BASE_URL}?name=Name&surname=Surname`
    );
    httpMock.flush(users);
    expect(httpMock.request.method).toBe('GET');
  });

  it('should call delete', () => {
    service.delete(USER_MOCK.id).subscribe((response) => {
      expect(response).toBeFalsy();
    });

    const httpMock = httpController.expectOne(`${BASE_URL}/${USER_MOCK.id}`);
    httpMock.flush(null);
    expect(httpMock.request.method).toBe('DELETE');
  });
});
