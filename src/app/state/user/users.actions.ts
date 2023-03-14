import { User } from './../../models/user.model';
export namespace UsersActions {
  export class Add {
    readonly type = '[Users] Add';
    constructor(public user: User) {}
  }

  export class Edit {
    readonly type = '[Users] Edit';

    constructor(public id: number, user: User) {}
  }

  export class List {
    readonly type = '[Users] List';
    constructor() {}
  }

  export class Remove {
    readonly type = '[Users] Remove';

    constructor(public id: number) {}
  }
}
