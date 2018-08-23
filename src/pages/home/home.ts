import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewUsersPage} from '../view-users/view-users';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  start(){
    this.navCtrl.push(ViewUsersPage);
  }
}
