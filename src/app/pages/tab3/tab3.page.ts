import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from 'src/app/interfaces/interfaces';
import { UsersService } from '../../providers/users.service';
import { UiServiceService } from '../../providers/ui-service.service';
import { PostService } from 'src/app/providers/post.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: []
})
export class Tab3Page implements OnInit {

  user: User = {};

  constructor(
    private usersService: UsersService,
    private uiService   : UiServiceService,
    private postService : PostService 
  ) {}

  ngOnInit(): void {
    this.user = this.usersService.getUser();
  }

  logout(): void {
    this.postService.pagePost = 0;
    this.usersService.logout();
  }

  async update(form: NgForm): Promise<void> {
    if (form.invalid) return;
    const r = await this.usersService.updateUser(this.user);
    (r) ? this.uiService.presentToast('Usuario actualizado') 
        : this.uiService.presentToast('Error al actualizar');
  }

}
