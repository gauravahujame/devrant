import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { ProfilePage } from './../pages/profile-page/profile-page';
import { NotificationsPage } from './../pages/notifications-page/notifications-page';
import { RantsPage } from './../pages/rants-page/rants-page';
import { TabsPage } from '../pages/tabs/tabs';
import { RantDetailPage } from './../pages/rant-detail-page/rant-detail-page';

import { TimestampDatePipe } from './../pipes/timestamp-date.pipe';
import { MomentsAgoPipe } from './../pipes/moments-ago';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from './../providers/auth-provider';
import { LoginPage } from './../pages/login-page/login-page';
import { HelperProvider } from './../providers/helper-provider';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './../components/notification-component/notification-component';
import { RantListComponent } from './../components/rant-list-component/rant-list-component';
import { RantComponent } from './../components/rant-component/rant-component';
import { DevrantService } from './../services/devrant.service';

@NgModule({
  declarations: [
    MyApp,
    RantsPage,
    ProfilePage,
    NotificationsPage,
    TabsPage,
    RantDetailPage,
    LoginPage,
    TimestampDatePipe,
    MomentsAgoPipe,
    RantComponent,
    RantListComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    HttpModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RantsPage,
    ProfilePage,
    NotificationsPage,
    TabsPage,
    RantDetailPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    PhotoViewer,
    AuthProvider,
    LoadingController,
    AlertController,
    DevrantService,
    HelperProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
