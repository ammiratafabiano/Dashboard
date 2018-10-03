import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { HomePage } from '../home/home';

import { filter } from 'rxjs/operators';

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
    var pass = this.credentialsForm.value.password
    
    this.http.get("http://192.168.0.114:8081/users/all")
		.subscribe(
		  out => {
		  	var account = out.filter(x => x.username = user)[0];
		  	if (user == account.username && pass == account.password) {
		  		console.log(account);
				this.navCtrl.push(HomePage, { data: account });
			}
			else {
				this.popup("Wrong Username or Password");
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