import { Injectable } from '@angular/core';
import { UsersStateModel } from './../../state/user/users.state';
import { State } from '@ngxs/store';


@State<UsersStateModel>({
    name: 'users',
    defaults: {
        users: [
            {
                "name": "Jan",
                "surname": "Nowak",
                "email": "jan@gmail.com",
                "age": "12",
                "city": "City",
                "id": 1
              },
              {
                "name": "Paul",
                "surname": "Nowak",
                "email": "paul@gmail.com",
                "age": "24",
                "city": "New York",
                "id": 2
              }
        ]
    }
})
@Injectable()
export class UserStateMock {

}