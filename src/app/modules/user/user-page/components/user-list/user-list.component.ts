import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users = [
    {
      id: 1,
      name: 'John',
      email: 'email@gmail.com',
      age: 22,
      surname: 'Surname',
    },
    {
      id: 2,
      name: 'John',
      email: 'email@gmail.com',
      age: 43,
      surname: 'Surname',
    },
    {
      id: 3,
      name: 'John',
      email: 'email@gmail.com',
      age: 25,
      surname: 'Surname',
    },
    {
      id: 4,
      name: 'John',
      email: 'email@gmail.com',
      age: 12,
      surname: 'Surname',
    },
    {
      id: 5,
      name: 'John',
      email: 'email@gmail.com',
      age: 64,
      surname: 'Surname',
    },
    {
      id: 5,
      name: 'John',
      email: 'email@gmail.com',
      age: 64,
      surname: 'Surname',
    },
    {
      id: 5,
      name: 'John',
      email: 'email@gmail.com',
      age: 64,
      surname: 'Surname',
    },
    {
      id: 5,
      name: 'John',
      email: 'email@gmail.com',
      age: 64,
      surname: 'Surname',
    },
    {
      id: 5,
      name: 'John',
      email: 'email@gmail.com',
      age: 64,
      surname: 'Surname',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  edit() {}

  delete() {}
}
