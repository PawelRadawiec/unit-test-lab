import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { UsersActions } from "../state/user/users.actions";


@Injectable()
export class UserListResolver implements Resolve<any> {

    constructor(private store: Store) {   
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.dispatch(new UsersActions.List());
    }
}