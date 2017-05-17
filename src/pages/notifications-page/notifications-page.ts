import { NotificationContent } from './../../models/notification-content';
import { Notification } from './../../models/notification';
import { AuthProvider } from './../../providers/auth-provider';
import { DevrantService } from './../../services/devrant.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthToken } from './../../models/auth-token';

/**
 * Generated class for the NotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export enum NotificationType{     
  CommentMyRant = <any>"comment_vote",
  UpvoteMyComment = <any>"content_vote",
  UpvoteMyRant = <any>"comment_discuss",
  CommentOtherRant = <any>"comment_content"
}

@Component({
  selector: 'page-notifications-page',
  templateUrl: 'notifications-page.html',
})
export class NotificationsPage {
  private notification: Notification;
  private showSpinner: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public devrantService: DevrantService,
    public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  ngOnInit() {
    let localToken: AuthToken = this.auth.getLocalToken();
    if (localToken) {
      this.devrantService.getNotifications(localToken)
        .then(notification => {
          this.notification = notification;
          this.mapUserNames(notification.items, notification.username_map);
          this.showSpinner = false;
          console.log(notification);
        }).catch(err => {
          console.log(err);
          this.showSpinner = false;
        });
    }
  }

  mapUserNames(notificationContents: NotificationContent[], usernameMap: any) { 
    notificationContents.forEach(notif => { 
      notif.username = usernameMap[notif.uid];
    });
  };

}
