import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {

  public token   : string = null;
  private urlPath: string = 'api/v1/ft/users';
  private user   : User = {};

  private loginSubscription   : Subscription = new Subscription();
  private registrySubscription: Subscription = new Subscription();
  private tokenSubscription   : Subscription = new Subscription();
  private updateSubscription  : Subscription = new Subscription();

  constructor(
    private http         : HttpClient,
    private storage      : Storage,
    private navController: NavController
  ) { }

  getUser(): {} {
    if (!this.user._id) this.tokenValidate();
    return { ...this.user }
  }

  login(email: string, password: string): Promise<boolean> {
    const data = { email, password };

    return new Promise(resolve => {
      this.loginSubscription = this.http.post(`${URL}/${this.urlPath}/login`, data).subscribe(resp => {
        if (resp['ok']) {
          this.saveToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  registry(user: User): Promise<boolean> {
    return new Promise(resolve => {
      this.registrySubscription = this.http.post(`${URL}/${this.urlPath}/create`, user).subscribe(resp => {
        if (resp['ok']) {
          this.saveToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  private async saveToken(token: string): Promise<void> {
    this.token = token;
    await this.storage.set('token', token);
  }

  private async getToken(): Promise<void> {
    this.token = await this.storage.get('token') || null;
  }

  async tokenValidate(): Promise<boolean> {
    await this.getToken();

    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers: HttpHeaders = new HttpHeaders({
        'x-token': this.token
      });

      this.tokenSubscription = this.http.get(`${URL}/${this.urlPath}/`, { headers }).subscribe(resp => {
        if (resp['ok']) {
          this.user = resp['user'];
          resolve(true);
        } else {
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  updateUser(user: User): Promise<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.updateSubscription = this.http.put(`${URL}/${this.urlPath}/update`, user, { headers }).subscribe(resp => {
        if (resp['ok']) {
          this.saveToken(resp['token']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  logout(): void {
    this.storage.remove('token');
    this.navController.navigateRoot('/login')
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
    this.registrySubscription.unsubscribe();
    this.tokenSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

}
