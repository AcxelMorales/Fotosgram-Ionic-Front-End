import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Post } from '../../interfaces/interfaces';
import { PostService } from '../../providers/post.service';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: []
})
export class Tab2Page {

  imagesTemp: string[] = [];
  loadGeo   : boolean = false;

  post: Post = {
    message : '',
    coords  : null,
    position: false
  };

  constructor(
    private postService: PostService,
    private router     : Router,
    private geolocation: Geolocation,
    private camera     : Camera
  ) {}

  async createPost(): Promise<void> {
    const ok: boolean = await this.postService.createPost(this.post);

    this.post = {
      message : '',
      coords  : null,
      position: false
    };

    if (ok) this.router.navigateByUrl('/main/tabs/tab1');
  }

  getGeolocation(): void {
    if (!this.post.position) {
      this.post.coords = null;
      return;
    }

    this.loadGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
    }).catch((error) => {
      console.log('Error getting location', error);
      this.loadGeo = false;
    });
  }

  openCamera(): void {
    const options: CameraOptions = {
      quality           : 60,
      destinationType   : this.camera.DestinationType.FILE_URI,
      encodingType      : this.camera.EncodingType.JPEG,
      mediaType         : this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType        : this.camera.PictureSourceType.CAMERA
    };
    
    this.camera.getPicture(options).then((imageData) => {
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);
      this.imagesTemp.push(img);
    }, (err) => {
     // Handle error
     console.log(err);
    });
  }

}
