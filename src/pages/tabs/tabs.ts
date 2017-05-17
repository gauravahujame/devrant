import { NotificationsPage } from './../notifications-page/notifications-page';
import { ProfilePage } from './../profile-page/profile-page';
import { RantsPage } from './../rants-page/rants-page';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RantsPage;
  tab2Root = ProfilePage;
  tab3Root = NotificationsPage;

  constructor() {

  }
}
