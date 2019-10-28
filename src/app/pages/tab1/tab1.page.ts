import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { PostService } from '../../providers/post.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: []
})
export class Tab1Page implements OnInit, OnDestroy {

  posts  : Post[] = [];
  enable : boolean = true;

  postSubscription: Subscription = new Subscription();

  constructor(private postService: PostService) { }

  async ngOnInit(): Promise<void> {
    this.next();
    this.postService.newPost.subscribe(post => this.posts.unshift(post));
  }

  reload(event?: any): void {
    this.next(event, true);
  }

  next(event?: any, pull: boolean = false): void {
    if (pull) {
      this.posts  = [];
      this.enable = true;
    }

    this.postSubscription = this.postService.getPosts(pull).subscribe(resp => {
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();
        if (resp.posts.length === 0) this.enable = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
