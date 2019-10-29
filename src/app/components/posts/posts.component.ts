import { Component, Input } from '@angular/core';

import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: [],
})
export class PostsComponent {

  @Input() posts: Post[];

  constructor() { }

}
