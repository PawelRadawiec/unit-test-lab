import { UserSearchTerms } from './../../models/user-search.model';
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

  export class DeleteAll {
    static readonly type = '[Users] DeleteAll';
  }

  export class Edit {
    static readonly type = '[Users] Edit';

    constructor(public user: User) {}
  }

  export class List {
    static readonly type = '[Users] List';
    constructor() {}
  }

  export class Search {
    static readonly type = '[Users] Search';

    constructor(public terms: UserSearchTerms) {}
  }
}
