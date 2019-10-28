import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';

import { User } from '../../interfaces/interfaces';
import { UsersService } from '../../providers/users.service';
import { UiServiceService } from '../../providers/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [],
})
export class LoginPage implements OnInit {

  @ViewChild('loginSlide', null) slides: IonSlides;

  userLogin = {
    email   : 'acxelmorales97@gmail.com',
    password: '52341698'
  };

  userRegistry: User = {
    email   : 'test',
    password: '52341698',
    name    : 'Test',
    avatar  : 'av-1.png'
  };

  constructor(
    private usersService : UsersService,
    private navController: NavController,
    private uiService    : UiServiceService
  ) { }

  ngOnInit(): void {
    this.slides.lockSwipes(true);
  }

  async login(form: NgForm): Promise<void> {
    if (form.invalid) return;

    const valid = await this.usersService.login(this.userLogin.email, this.userLogin.password);

    if (valid) {
      this.navController.navigateRoot('/main/tabs/tab1', {
        animated: true
      });
    } else {
      this.uiService.presentAlert('Email/Password incorrectos');
    }
  }

  async registry(form: NgForm): Promise<void> {
    if (form.invalid) return;

    const valid = await this.usersService.registry(this.userRegistry);

    if (valid) {
      this.navController.navigateRoot('/main/tabs/tab1', {
        animated: true
      });
    } else {
      this.uiService.presentAlert('El email ingresado ya existe');
    }
  }

  showRegistry(): void {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  showLogin(): void {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
