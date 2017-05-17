import { HelperProvider } from './../../providers/helper-provider';
import { RantDetailPage } from './../../pages/rant-detail-page/rant-detail-page';
import { ProfilePage } from './../../pages/profile-page/profile-page';
import { NavController } from 'ionic-angular';
import { SimpleRant } from './../../models/simple-rant';
import { Component, Input } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the RantComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rant-component',
  templateUrl: 'rant-component.html'
})
export class RantComponent {

  @Input('rant') rant: SimpleRant;
  @Input('showButtons') showButtons: boolean = true;
  @Input('showShare') showShare: boolean = true;
  @Input('disableNavigation') disableNavigation: boolean = false;

  private avatar_url: string;

  constructor(private navCtrl: NavController,
    private helper: HelperProvider,
    private photoViewer: PhotoViewer) {
  }
//Create a method to check typeof 
  ngOnInit() {
      this.updateAvatar();
  }

  showUserProfile(userId: number) { 
    this.navCtrl.push(ProfilePage, {
      userId: userId
    });
  }

  showRantDetail(rantId: number) {
    if (!this.disableNavigation) {
      this.navCtrl.push(RantDetailPage, {
        rantId: rantId
      });
    }
  }

  showRantImage() {
    this.photoViewer.show(this.rant.attached_image.url);
  }

  shareRant() {
    this.helper.shareRant(this.rant);
  } 

  private updateAvatar() {
    if (this.rant.user_avatar.i) {
      this.avatar_url = "https://avatars.devrant.io/" + this.rant.user_avatar.i;
    }
    else {
      this.avatar_url = 'assets/img/anon.png';
    }
  }

}
