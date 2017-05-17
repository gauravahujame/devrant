import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login-page/login-page';
import { AuthProvider } from './../providers/auth-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  alreadyAuthenticated: boolean = false;     //TODO: Check from localStorage

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              auth: AuthProvider) {
                platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
                statusBar.styleDefault();
                splashScreen.hide();

               if (auth.checkLoggedIn()) {
                    console.log("Already Authenticated");
                    this.rootPage = TabsPage;
                } else {
                    this.rootPage = LoginPage;
                }
        });
    }
}
