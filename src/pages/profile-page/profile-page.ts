import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DevrantService } from './../../services/devrant.service';
import { Profile } from './../../models/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {

  @Input() userId: number;

  private profile: Profile;
  private avatar_url: string;
  private showSpinner: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private devrantService: DevrantService) {
    
    if (navParams.get('userId')) {
      this.userId = navParams.get('userId');
    } else {
      this.userId = 527263;      //TODO : This is the default userId. Should be set to the currently logged in user.( from user model) 
    }
  }

  ngOnInit() { 
    this.devrantService.getProfile(this.userId)
      .then(profile => {
        this.profile = profile;
        this.showSpinner = false;
        this.updateAvatar();
        console.log(profile);
      }).catch(err => {
        console.log(err);
        this.showSpinner = false;
      });
  }

  private updateAvatar() {
    if (this.profile.avatar.i) {
      this.avatar_url = "https://avatars.devrant.io/" + this.profile.avatar.i;
    }
    else {
      this.avatar_url = 'assets/img/default_avatar.png';
    }
  }

}
