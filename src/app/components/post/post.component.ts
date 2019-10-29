import { Component, Input } from '@angular/core';

import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [],
})
export class PostComponent {

  @Input() post: Post;

  onlySlideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
  };

  constructor() { }

}
