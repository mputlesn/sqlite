import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import stuff from '../../array';
import { ViewUsersPage } from '../view-users/view-users'

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {


  public user: any = [];
  stuffNum = stuff;
  email: string;
  name: string;
  surname:string;
  cell:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, public toastCtrl: ToastController) {
    this.database.GetUser(this.stuffNum).then((data: any) => {
      console.log(data);
      this.user.push(data);
      console.log(this.user);
      
    }, (error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }


  update(){
    console.log(this.stuffNum);
    
    this.database.UpdateUser(this.name,this.surname,this.cell,this.email,this.stuffNum).then((data) => {
      console.log(data);
      this.navCtrl.push(ViewUsersPage);
      const toast = this.toastCtrl.create({
        message: 'User was updated successfully',
        duration: 3000
      });
      toast.present();
    }, (error) => {
      console.log(error);
      const toast = this.toastCtrl.create({
        message: 'User not updated successfully error'+ error,
        duration: 3000
      });
      toast.present();
    });
  }
}
