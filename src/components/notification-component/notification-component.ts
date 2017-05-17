import { RantDetailPage } from './../../pages/rant-detail-page/rant-detail-page';
import { NavController } from 'ionic-angular';
import { NotificationContent } from './../../models/notification-content';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the Notification component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'notification-component',
  templateUrl: 'notification-component.html'
})
export class NotificationComponent {

  @Input('notification') notification: NotificationContent;
  private icon: string;

  constructor(private navCtrl: NavController ) {
  }
  
  ngOnInit() {
    console.log('Hello Notification Component : %s', this.notification);
    this.addNotificationMessage(this.notification);
  }

  addNotificationMessage(notif: NotificationContent) {
    switch (notif.type) {
      case "comment_discuss": notif.message = "New comments on a rant you commented on!";
        notif.username = "";
        this.icon = "chatbubbles";
        break;
      case "content_vote": notif.message = " +1'd your rant!";
        this.icon = "thumbs-up";  
        break;
      case "comment_vote": notif.message = " +1'd your comment!";
        this.icon = "thumbs-up"; 
        break;
      case "comment_content": notif.message = " commented on your rant!";
        this.icon = "chatbubbles"; 
        break;
      case "comment_mention": notif.message = " mentioned you in a comment!";
        this.icon = "pricetag"; 
        break;
      case "rant_sub": notif.message = " posted a new rant!";
        this.icon = "mail-open"; 
        break;
    }
  }

  showRantDetail(rantId: number) {
    this.navCtrl.push(RantDetailPage, {
      rantId: rantId
    });
  }
}
