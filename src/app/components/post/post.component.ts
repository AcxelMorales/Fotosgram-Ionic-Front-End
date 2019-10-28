import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [],
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  img1: string = '/assets/perro-1.jpg';
  img2: string = '/assets/perro-2.jpg';
  img3: string = '/assets/perro-3.jpg';

  constructor() { }

  ngOnInit(): void {}

}
