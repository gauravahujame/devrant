import { Component, style, animate, state, transition, trigger } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SimpleRant } from './../../models/simple-rant';
import { DevrantService } from './../../services/devrant.service';

/**
 * Generated class for the RantsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export enum RantType {
  Algo = <any>"algo",
  Top = <any>"top",
  Recent = <any>"recent"
}

@Component({
  selector: 'page-rants-page',
  templateUrl: 'rants-page.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
  
export class RantsPage {
  private currentRantType = RantType.Algo;
  private currentRants: SimpleRant[];
  private showSpinner: boolean;
  private showSortBar: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private devrantService: DevrantService) {
  }  

  ngOnInit(): void{
    this.loadRants();
  }

  loadRants() {
    this.showSpinner = true;
    this.currentRants = [];
    this.devrantService
    .getRants(this.currentRantType.toString(), this.getMode("rant-length"))
    .then(rants => {
      this.currentRants = rants;
      this.showSpinner = false;
      this.showSortBar = false;
      console.log(rants);
    })
    .catch(error => {
      this.showSpinner = false;
      this.showSortBar = false;
      console.error(error);
    });
  }

  getMoreRants(): Promise<any> {
    console.log('Fetching Rants');

    return this.devrantService
      .getRants(this.currentRantType.toString(), this.getMode("rant-length"), this.currentRants.length)
      .then(rants => {
        this.currentRants = rants;
        console.log(rants);
      })
      .catch(error => {
        // ToDo: Show Errors the User
        console.error(error);
      });
  }

  switchRants() {
    switch (this.currentRantType) {
      case (RantType.Algo)   : { this.currentRantType = RantType.Algo
                                break; 
                              }
      case (RantType.Top)    : { this.currentRantType = RantType.Top
                          break; 
                              }
      case (RantType.Recent) : { this.currentRantType = RantType.Recent
                          break; 
                              }
    }
  }

  refreshRants(refresher): Promise<any> {
    return this.devrantService
      .getRants(this.currentRantType.toString(), this.getMode("rant-length"))
      .then(rants => {
        this.currentRants = [];
        this.currentRants = rants;
        refresher.complete();
        console.log(rants);
      })
      .catch(error => {
        // ToDo: Show Errors the User
        refresher.complete();
        console.error(error);
      });
  }

  toggleSortBar() {
    this.showSortBar = !this.showSortBar;
  }

   private getMode (key: string): string {
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    }
    return undefined;
  }
}
