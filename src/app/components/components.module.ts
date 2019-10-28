import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapComponent } from './map/map.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    AvatarSelectorComponent,
    MapComponent
  ],
  exports: [
    PostsComponent,
    AvatarSelectorComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
