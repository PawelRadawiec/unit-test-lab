import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'fullName',
})
export class UserFullNamePipe implements PipeTransform {
  transform(user: User): string {
    if (!user) {
      return null;
    }
    const { name, surname } = user;
    return `${name} ${surname}`;
  }
}
