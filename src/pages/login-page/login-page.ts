import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  loader: any;
  credentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private auth: AuthProvider) {
  }

    login() {
      this.showLoader();
      this.auth.login(this.credentials.email, this.credentials.password).then(response => {
        console.log(JSON.parse(localStorage.getItem("auth_response")));
        this.hideLoader();
        this.navCtrl.setRoot(TabsPage);
      }).catch(error => { 
        this.showError("Login Failed");
      });
    }

    showLoader() {
      this.loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loader.present();
    }

    hideLoader() {            //Workaround for ionic bug
          this.loader.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
    }

    showError(text) {
    setTimeout(() => {
      this.hideLoader();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
