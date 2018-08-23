import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(public http: HttpClient, public storage: SQLite) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "work.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS colleagues (id INTEGER PRIMARY KEY AUTOINCREMENT, stuffNo INTEGER, name TEXT, lastname TEXT, cell INTEGER, email TEXT)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  CreateUser(stuffNo: number, name:string, lastname:string, cell: number, email:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO colleagues (stuffNo, name, lastname, cell, email) VALUES (?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [stuffNo, name, lastname, cell, email]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetAllUsers(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM colleagues", []).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              id: data.rows.item(i).id,
              stuffNo: data.rows.item(i).stuffNo,
              name: data.rows.item(i).name,
              lastname: data.rows.item(i).lastname,
              cell: data.rows.item(i).cell,
              email: data.rows.item(i).email
            });            
          }          
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }

  DeleteUser(stuffNo){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("DELETE FROM colleagues where stuffNo=?", [stuffNo]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }

  GetUser(stuffNum){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM colleagues WHERE stuffNo=?", [stuffNum]).then((data) => {
        let user : any;
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            var stuffNo = data.rows.item(i).stuffNo
            if(stuffNum == stuffNo){
              user = {
                name: data.rows.item(i).name,
                lastname: data.rows.item(i).lastname,
                cell: data.rows.item(i).cell,
                email: data.rows.item(i).email
              }
            }           
          } 
        resolve(user);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  UpdateUser(name, lastname, cell, email, stuffNo){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("UPDATE colleagues SET name=?, lastname=?, cell=?, email=?  WHERE stuffNo=?", [name, lastname, cell, email, stuffNo]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }


}
