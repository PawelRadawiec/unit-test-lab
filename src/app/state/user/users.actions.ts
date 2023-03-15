import { User } from './../../models/user.model';
export namespace UsersActions {
  export class Create {
    static readonly type = '[Users] Create';
    constructor(public user: User) {}
  }

  export class Delete {
    static readonly type = '[Users] Remove';

    constructor(public id: number) {}
  }

  export class Edit {
    static readonly type = '[Users] Edit';

    constructor(public id: number, user: User) {}
  }

  export class List {
    static readonly type = '[Users] List';
    constructor() {}
  }
}
