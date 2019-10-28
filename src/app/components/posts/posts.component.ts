import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: [],
})
export class PostsComponent implements OnInit {

  @Input() posts: Post[];

  constructor() { }

  ngOnInit(): void {}

}
