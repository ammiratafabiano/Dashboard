import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

import {Md5} from 'ts-md5/dist/md5';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {

  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              public alertCtrl: AlertController) {

    this.credentialsForm = this.formBuilder.group({
      user: [''],
      password: ['']
    });
  }

  popup(message) {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  onSignIn() {
    var user = this.credentialsForm.value.user;
    var pass = Md5.hashStr(this.credentialsForm.value.password);
    
    console.log(pass);
    
    this.http.get("http://150.145.114.110:8008/users/all")
		.subscribe(
		  (out: Array<any>) => {
		  	if (user != "" && pass != "") {
				var account = out.filter(x => x.username = user)[0];
				if (account != undefined) {
					if (user == account.username && pass == account.password) {
						this.navCtrl.push(HomePage, { data: account });
					}
					else {
						this.popup("Wrong Username or Password");
					}
				}
				else {
					this.popup("Wrong Username or Password");
				}
			}
			else {
				this.popup("Please insert credentials");
			}
		  },
		  error => {
		  	this.popup("Error");
		  }
	);

  }

  onForgotPassword() {
    alert(this.credentialsForm.value.user + " " + this.credentialsForm.value.password);
  }
}