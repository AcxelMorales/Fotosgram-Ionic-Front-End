import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { IAvatar } from '../../interfaces/interfaces';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: [],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSelect: EventEmitter<string> = new EventEmitter<string>();
  @Input() show: boolean = true;
  @Input() avatarNow: string = 'av-1.png';

  avatars: IAvatar[] = [
    {
      img   : 'av-1.png',
      select: true
    },
    {
      img   : 'av-2.png',
      select: false
    },
    {
      img   : 'av-3.png',
      select: false
    },
    {
      img   : 'av-4.png',
      select: false
    },
    {
      img   : 'av-5.png',
      select: false
    },
    {
      img   : 'av-6.png',
      select: false
    },
    {
      img   : 'av-7.png',
      select: false
    },
    {
      img   : 'av-8.png',
      select: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor() { }

  ngOnInit(): void {
    this.avatars.forEach((av: IAvatar) => av.select = false);

    for (const av of this.avatars) {
      if (av.img === this.avatarNow) {
        av.select = true;
        break;
      }
    }
  }

  selectAvatar(avatar: IAvatar): void {
    this.avatars.forEach((av: IAvatar) => av.select = false);
    avatar.select = true;
    this.avatarSelect.emit(avatar.img);
  }

}
