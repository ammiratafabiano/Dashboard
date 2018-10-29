import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AddTabModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-tab-modal',
  templateUrl: 'add-tab-modal.html',
})
export class AddTabModalPage {

  availableTabs;
  newTabValue;

  constructor(public alertCtrl: AlertController, private view: ViewController, private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getTabList();
  }

  getTabList() {
    //this.http.get("http://127.0.0.1:8080/available")
    this.http.get("http://150.145.114.110:8009/available")
      .subscribe(
        data => {
          this.availableTabs = data;
          console.log(data);
          document.getElementById("tabChoice").style.display = "block";
        },
        error => {
          let alert = this.alertCtrl.create({
            title: "I'm sorry. Server problems.",
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.closeModal();
                }
              }
            ]
          });
          alert.present();
        }
    );
  }

  closeModal() {
    this.view.dismiss();
  }

  addTab() {
    if (this.newTabValue != undefined) {
      var selectedUrl = this.newTabValue;
      var selectedSource = this.availableTabs.filter(x => x.url == this.newTabValue)[0].source;
      var selectedDescription = this.availableTabs.filter(x => x.url == this.newTabValue)[0].description;
      /*var selectedChartOptions = [];
      var selectedDetailsOptions = [];
      var temp;
      if (this.availableTabs.filter(x => x.url == this.newTabValue)[0].chart != undefined)
        selectedChartOptions = this.availableTabs.filter(x => x.url == this.newTabValue)[0].chartOptions;

      if (this.availableTabs.filter(x => x.url == this.newTabValue)[0].details != undefined)
        selectedDetailsOptions = this.availableTabs.filter(x => x.url == this.newTabValue)[0].details.detailsOptions;
      */       
      var temp = {url: selectedUrl, source: selectedSource, description: selectedDescription /*, chartOptions: selectedChartOptions, detailsOptions: selectedDetailsOptions*/};

      this.view.dismiss(temp);
    }
  }
}
