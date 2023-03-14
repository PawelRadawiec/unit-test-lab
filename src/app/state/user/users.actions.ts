import { User } from './../../models/user.model';
export namespace UsersActions {
  export class Add {
    static readonly type = '[Users] Add';
    constructor(public user: User) {}
  }

  export class Edit {
    static readonly type = '[Users] Edit';

    constructor(public id: number, user: User) {}
  }

  export class List {
    static readonly type = '[Users] List';
    constructor() {}
  }

  export class Remove {
    static readonly type = '[Users] Remove';

    constructor(public id: number) {}
  }
}
