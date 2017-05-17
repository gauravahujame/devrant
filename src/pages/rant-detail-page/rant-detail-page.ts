import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DevrantService } from './../../services/devrant.service';
import { FullRant } from './../../models/full-rant';
import { HelperProvider } from './../../providers/helper-provider';

/**
 * Generated class for the RantDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-rant-detail-page',
  templateUrl: 'rant-detail-page.html'
})
export class RantDetailPage {
  private rantId: number;
  private rant: FullRant;
  private showSpinner: boolean = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private devrantService: DevrantService,
              private helper: HelperProvider
              ) {
    this.rantId = navParams.get('rantId');
  }

  ngOnInit(): void{
    this.getRant();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RantDetailPage');
  }

  private getRant(): Promise<any> {
    console.log('Fetching Rant id : ' + this.rantId);

    return this.devrantService
      .getRant(this.rantId)
      .then(rant => {
        this.rant = rant;
        this.showSpinner = false;
        console.log(rant);
      })
      .catch(error => {
        // ToDo: Show Errors the User
        this.showSpinner = false;
        console.error(error);
      });
  }

}
