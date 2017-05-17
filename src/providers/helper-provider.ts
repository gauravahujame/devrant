import { SimpleRant } from './../models/simple-rant';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SocialSharing } from '@ionic-native/social-sharing';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HelperProvider {

  constructor(public http: Http,
    private shareCtrl: SocialSharing) {
    console.log('Hello HelperProvider Provider');
  }

  shareRant(rant: SimpleRant) {
    this.shareCtrl.shareWithOptions({
      message: "https://www.devrant.io/" + `${rant.link}`
    }).then(() => {
      console.log('Shared!');
    }).catch((err) => {
      console.log('Oops, something went wrong while sharing : ', err);
    });
  }

}
