import { UsersService } from './../../services/users.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UsersState } from './users.state';
import { UsersActions } from 'src/app/state/user/users.actions';
import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { User } from 'src/app/models/user.model';
import { EMPTY, of } from 'rxjs';

const userMock: User = {
  name: 'Robert',
  surname: 'Surname',
  age: '67',
  city: 'Gdasnk',
  email: 'email@email.com',
  id: 3,
};

describe('UserState', () => {
  let store: Store;
  let modalService: any;
  let userService: any;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('NzModalService', ['closeAll']);
    userService = jasmine.createSpyObj('UsersService', [
      'create',
      'delete',
      'edit',
      'list',
      'search'
    ]);

    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UsersState])],
      providers: [
        {
          provide: NzModalService,
          useValue: modalService,
        },
        {
          provide: UsersService,
          useValue: userService,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    store.reset({
      users: {
        users: [
          {
            name: 'Jan',
            surname: 'Nowak',
            age: 12,
            email: 'email@email.com',
            id: 1,
          },
          {
            name: 'Jan',
            surname: 'Nowak',
            age: 12,
            email: 'email@email.com',
            id: 2,
          },
        ],
      },
    });
  });

  it('should call create and add user', () => {
    const user: User = { ...userMock, id: 3 };
    userService.create.and.returnValue(of(user));
    store.dispatch(new UsersActions.Create(user));

    const users = store.selectSnapshot((state) => state.users.users);

    expect(users[users.length - 1])
      .withContext('should add user after create')
      .toEqual(user);
    expect(userService.create).toHaveBeenCalledWith(user);
    expect(modalService.closeAll).toHaveBeenCalled();
  });

  it('should call delete and remove from users', () => {
    userService.delete.and.returnValue(of({}));

    store.dispatch(new UsersActions.Delete(1));

    const users = store.selectSnapshot((state) => state.users.users);

    expect(users.find((user) => user.id === 1))
      .withContext('should remove user')
      .toBeFalsy();
    expect(userService.delete)
      .withContext('should call UserService delete')
      .toHaveBeenCalledWith(1);
  });

  it('should call UserService edit and update user', () => {
    const newUser: User = { ...userMock, id: 1 };
    userService.edit.and.returnValue(of(newUser));
    store.dispatch(new UsersActions.Edit(newUser));

    const users = store.selectSnapshot((state) => state.users.users);

    expect(users[users.findIndex((user) => user.id === newUser.id)])
      .withContext('should update user after edit')
      .toEqual(newUser);
    expect(userService.edit).toHaveBeenCalledWith(newUser);
    expect(modalService.closeAll).toHaveBeenCalled();
  });

  it('should call UserService list and set users', () => {
    const newUsers = [{ ...userMock, id: 1 }];

    userService.list.and.returnValue(of(newUsers));
    store.dispatch(new UsersActions.List());

    const users = store.selectSnapshot((state) => state.users.users);

    expect(users).toEqual(newUsers);
    expect(userService.list).toHaveBeenCalled();
  });

  it('should call UserService search and set users', () => {
    const newUsers = [{ ...userMock, id: 1 }];

    userService.search.and.returnValue(of(newUsers));
    const terms = {name: 'Name', surname: 'Surname'};
    store.dispatch(new UsersActions.Search(terms));

    const users = store.selectSnapshot((state) => state.users.users);

    expect(users).toEqual(newUsers);
    expect(userService.search).toHaveBeenCalledWith(terms);
  });
});
