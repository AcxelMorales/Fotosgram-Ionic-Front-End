import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { UsersService } from '../providers/users.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(private usersService: UsersService) { }

  canLoad(): Promise<boolean> {
    return this.usersService.tokenValidate();
  }
  
}
