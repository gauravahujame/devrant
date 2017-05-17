import { DevrantService } from './../../services/devrant.service';
import { Component, Input } from '@angular/core';
import { SimpleRant } from './../../models/simple-rant';
import { NavController } from 'ionic-angular';
import { RantDetailPage } from './../../pages/rant-detail-page/rant-detail-page';

/**
 * Generated class for the RantListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rant-list-component',
  templateUrl: 'rant-list-component.html'
})
export class RantListComponent {

  @Input('rants') rants: SimpleRant[];

  constructor(private devrantService: DevrantService,
              public navCtrl: NavController ) {
  }

  ngOnInit() {
  }  
}
