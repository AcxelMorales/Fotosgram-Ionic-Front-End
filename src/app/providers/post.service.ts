import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RespPost, Post } from '../interfaces/interfaces';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy {

  private urlSerive: string = `${environment.url}/api/v1/ft/posts`;
  public pagePost  : number = 0;

  newPost: EventEmitter<Post> = new EventEmitter<Post>();

  private postSubscription: Subscription = new Subscription();

  constructor(
    private http        : HttpClient,
    private usersService: UsersService,
    private fileTransfer: FileTransfer
  ) { }

  getPosts(pull: boolean = false): Observable<RespPost> {
    if (pull) this.pagePost = 0;

    this.pagePost++;
    return this.http.get<RespPost>(`${this.urlSerive}/list?page=${this.pagePost}`);
  }

  createPost(post: Post): Promise<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': this.usersService.token
    });

    return new Promise(resolve => {
      this.postSubscription = this.http.post(`${this.urlSerive}/create`, post, { headers }).subscribe(resp => {
        this.newPost.emit(resp['post']);
        resolve(true);
      });
    });
  }

  uploadImg(img: string): void {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: { 'x-token': this.usersService.token }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${this.urlSerive}/upload`, options);
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

}
