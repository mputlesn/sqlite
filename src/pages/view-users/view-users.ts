import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { UpdatePage } from '../update/update';
import { ViewPage } from '../view/view';
import stuff from '../../array';
/**
 * Generated class for the ViewUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-users',
  templateUrl: 'view-users.html',
})
export class ViewUsersPage {

  public ListUser : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, public alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUsersPage');
  }

  ionViewWillEnter(){
    this.database.GetAllUsers().then((data: any) => {
      console.log(data);
      this.ListUser = data;
    }, (error) => {
      console.log(error);
    })
  }

  add(){
    this.navCtrl.push(ViewPage);
  }

  edit(id){
    const confirm = this.alertCtrl.create({
      title: 'Options',
      message: 'Do you wanna delete this user or update',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.database.DeleteUser(id);
            this.navCtrl.push(ViewUsersPage);                                                                                   
          }
        },
        {
          text: 'Update',
          handler: () => {
            stuff[0] = id;
            this.navCtrl.push(UpdatePage);
          }
        }
      ]
    });
    confirm.present();
  }
    

}
