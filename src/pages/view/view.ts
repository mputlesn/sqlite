import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ViewUsersPage } from '../view-users/view-users';
/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  private ListUser : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');

  }

  add(stuffNo,name,surname,cell,email){
    this.database.CreateUser(stuffNo,name,surname,cell,email).then((data) => {
      console.log(data);
      this.navCtrl.push(ViewUsersPage);
      const toast = this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000
      });
      toast.present();
    }, (error) => {
      console.log(error);
      const toast = this.toastCtrl.create({
        message: 'User not added successfully error'+ error,
        duration: 3000
      });
      toast.present();
    });
    
  }
}
