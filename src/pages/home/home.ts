import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { PopoverContentPage } from './popover';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as papa from 'papaparse';

declare var require: any

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChildren('chart') components:QueryList<any>;
  @ViewChildren('details') components2:QueryList<any>;

  barCharts: Chart;
  lineCharts: Chart;
  startup;
  tabs;
  nTabs;

  selectedChoice;

  unique = require('node-unique');
  converter = require('json-2-csv');


  constructor(public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, public navCtrl: NavController, public alertCtrl: AlertController, private http: HttpClient, private storage: Storage, private modal: ModalController, private socialSharing: SocialSharing) {

  }

  ngAfterViewInit() {

  }

  ionViewDidLoad() {

  }

  ionViewWillLoad() {
    this.startup = 1;
    this.selectedChoice = [];
    this.initStorage();
  }


  presentPopover(event) {
   let popover = this.popoverCtrl.create(PopoverContentPage);
    popover.present({
      ev: event
    });

    popover.onDidDismiss((id) => {
      if (id != undefined) {
            if (id == 1) {
              this.openAddTabModal();
            }
      }
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

  refresh(refresher) {
    var message = "";
    if (this.nTabs != 0) {
      var count = this.updateData();
      if (count == 0) {
        message = "No update available.";
      }
      else {
        message = count + " tabs updated";
      }
    }
    else {
      message = "You have no tab.";
    }

    setTimeout(() => {
      refresher.complete();
    }, 2000);

    refresher.complete();

    this.popup(message);
  }

  initStorage() {

  	//this.storage.set('tabs',[]);
		this.storage.get('tabs').then((val) => {
			if ( val == null) {
				this.storage.set('tabs',[]);
				this.tabs = [];
				this.nTabs = 0;
			}
			else {
				this.tabs = val;
				if (this.tabs != undefined)
					this.nTabs = this.tabs.length;
				else
					this.nTabs = 0;

				this.updateData();
			}
		});
  }

  openAddTabModal() {

    const addTabModal = this.modal.create('AddTabModalPage');

    addTabModal.present();

    addTabModal.onDidDismiss((out) => {
      if (out != undefined) {
            let currentID = this.unique();
            var newTab = { "id": currentID, "url": out.url, "source": out.source, "description": out.description, "chart": { "data": {}, "chartOptions": out.chartOptions }, "details": { "data": {}, "detailsOptions": out.detailsOptions }, "lastUpdate": (new Date).getTime() };
            //window.alert(JSON.stringify(newTab));
            this.nTabs = this.tabs.push(newTab);
            this.storage.set('tabs', this.tabs);
            this.updateData();
      }
    });
  }

  favoriteTab(event: any) {

    var id = event.srcElement.parentElement.parentElement.parentElement.nextElementSibling.innerHTML;

    var index = this.tabs.findIndex(x => x.id == id);

    var temp = this.tabs[index];

    this.tabs.splice(index, 1);
    this.tabs.unshift(temp);
    this.storage.set('tabs', this.tabs);
    this.updateData();

  }

  deleteTab(event: any) {

    var id = event.srcElement.parentElement.parentElement.nextElementSibling.innerHTML;

    var index = this.tabs.findIndex(x => x.id == id); 

    let alert = this.alertCtrl.create({
      title: 'Deleting',
      message: "Are you sure to delete the tab called \"" + this.tabs[index].description + "\"?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.tabs.splice(index, 1);
            this.nTabs = this.tabs.length;
            this.storage.set('tabs', this.tabs);
            this.updateData();
          }
        }
      ]
    });
    alert.present();
  }

  updateData() {
    var count = 0;
    var timeToWait = 300000;

    var loading = this.presentLoading("Please wait.");

    for (let i=0; i!=this.nTabs ; i++) {
      if ((new Date).getTime()  - this.tabs[i].lastUpdate > timeToWait || JSON.stringify(this.tabs[i].chart.data) == "{}" || this.startup == 1) {
        this.getData("online", this.tabs[i], i);
        this.tabs[i].lastUpdate = (new Date).getTime();
        count += 1;
      }
      else {
        this.getData("offline", this.tabs[i], i);
      }
    }
    loading.dismiss();

    this.startup = 0;
    return count;
  }

  getData(mode, tab, id) {

    if (mode == "online") {
      this.http.get("http://192.168.0.114:8080"+tab.url)
        .subscribe(
          out => {
            //window.alert(JSON.stringify(out.details.paramValues));
            //window.alert(this.memorySizeOf(out));
            this.tabs[id].chart.data = out["chart"];
            this.drawChart(out["chart"], id, tab.chart.chartOptions);
            if (out["details"] != undefined) {
              this.tabs[id].details.data = out["details"].data;
              this.tabs[id].details.detailsOptions = out["details"].paramValues;
              //this.drawDetails(out["details"].data, id);
            }
            this.storage.set('tabs', this.tabs);
          },
          error => {
            this.popup("I'm sorry. Server problems.");
          }
      );
    }
    else if (mode == "offline") {
      this.drawChart(tab.chart.data, id, tab.chart.chartOptions);
    }
  }

  drawChart(data, idItem, options, variable?) {
    
    if (variable != undefined) {
      console.log(data);
      data = data.filter(x => x.variable == variable);
      console.log(data);
    }
    
    var keys = new Array(data.length);
  
    for(let i=0; i!=data.length ; i++) {
      keys[i]=data[i].id;
    }

    var values = new Array(data.length);

    for(let i=0; i!=data.length ; i++) {
      values[i]=data[i].log;
    }
    
    values = values.slice(0,15);
    keys = keys.slice(0,15);

    var type;
    var label
    if (Array.isArray(options)) {
      type = options[0].type;
      label = "# of " + options[0].label;
    }
    else {
      type = options.type;
      label = "# of " + options.label;
    }

    var canvas = this.components.toArray()[idItem].nativeElement;

    var newChart = new Chart(canvas, {

      type: type,
      data: {
              labels: keys,
              datasets: [{
                          label: label,
                          data: values,
                          backgroundColor: 'rgba(255, 99, 132, 0.2)',
                          borderColor: 'rgba(255,99,132,1)',
                          borderWidth: 1
                        }]
            },
      options: {
                scales: {
                          yAxes:  [{
                                    ticks: {
                                            beginAtZero:true
                                            }
                                  }]
                        }
                }
    });
    
  }

  updateChart(event: any) {

    var element = event.srcElement;

    var id = element.parentElement.parentElement.parentElement.nextElementSibling.innerHTML;
    var type = element.lastElementChild.innerHTML;
    var index = this.tabs.findIndex(x => x.id == id);
    var data = this.tabs.filter(x => x.id == id)[0].chart.data;
    var chartOptions = this.tabs.filter(x => x.id == id)[0].chart.chartOptions;

    var selectedOptions = chartOptions.filter(x => x.type == type);
    
    this.tabs.filter(x => x.id == id)[0].chart.chartOptions.forEach(function(element){
      element.selected=0;
    });
    
    this.tabs.filter(x => x.id == id)[0].chart.chartOptions.filter(x => x.type == type)[0].selected = 1;

    this.drawChart(data, index, selectedOptions);
  }

  /*

  updateDetails() {

    var label;
    if (event.srcElement.parentElement.parentElement.parentElement.firstChild.firstChild != null)
      label = event.srcElement.parentElement.parentElement.parentElement.firstChild.firstChild.nextSibling.innerHTML;
    else
      label = event.srcElement.parentElement.parentElement.firstChild.firstChild.nextSibling.innerHTML;

    var value;

    if (event.srcElement.parentElement.parentElement.previousElementSibling.firstElementChild != null) {
      event.srcElement.parentElement.parentElement.previousElementSibling.firstElementChild.childNodes.forEach(function(element){
        if (element.attributes != undefined) {
          if (element.attributes["aria-checked"].value == "true") {
            value = element.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
          }
        }
      });
    }
    else {
      event.srcElement.parentElement.previousElementSibling.firstElementChild.childNodes.forEach(function(element){
        if (element.attributes != undefined) {
          if (element.attributes["aria-checked"].value == "true") {
            value = element.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
          }
        }
      });
    }

    this.selectedChoice.push(parseInt(value));
  }
  */

  toggleDetails(event) {

    if (event.srcElement.nextElementSibling.style.display == "none") {
      event.srcElement.nextElementSibling.style.display = "block";
      event.srcElement.firstElementChild.style.display = "none";
      event.srcElement.lastElementChild.style.display = "block";
    }
    else if (event.srcElement.nextElementSibling.style.display == "block") {
      event.srcElement.nextElementSibling.style.display = "none"
      event.srcElement.firstElementChild.style.display = "block";
      event.srcElement.lastElementChild.style.display = "none";
    }
    else {
      event.srcElement.nextElementSibling.style.display = "block";
      event.srcElement.firstElementChild.style.display = "none";
      event.srcElement.lastElementChild.style.display = "block";
    }
  }

  drawDetails(event) {
    
    var id;
    var values = [];
    var count;
    var params = [];
    var details;
    var hideButton, exportButton;
    var error = 0;

    if (event.srcElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling != undefined) {
      id = event.srcElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.innerHTML;
    }
    else {
      id = event.srcElement.parentElement.parentElement.parentElement.previousElementSibling.innerHTML;
    }
    
    var currentTab = this.tabs.filter(x => x.id == id)[0];
    var index = this.tabs.findIndex(x => x.id == id);
            
    currentTab.details.detailsOptions.forEach( (element) => {
      if (element.filter==1) {
        if (element.paramName != element.name) {
          if (element.paramName != "All") {
            var temp = element.elements.filter(x => x.name == element.paramName)[0].id
            values.push(temp);
            if (element.chartUpdater == 1) {
              this.drawChart(currentTab.chart.data, index, currentTab.chart.chartOptions, temp);
            }
          }
          else {
            values.push(99999);
          }
        }
        else {
          error = 1;
        }
      }
    });
    

    if (event.srcElement.parentElement.previousElementSibling.className == "paramGroup") {
      //count = event.srcElement.parentElement.previousElementSibling.childElementCount;
      //params = event.srcElement.parentElement.previousElementSibling.childNodes;
      details = event.srcElement.parentElement.nextElementSibling.nextElementSibling;
      hideButton = event.srcElement.parentElement.nextElementSibling;
      exportButton = event.srcElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
      
    }
    else {
      //count = event.srcElement.previousElementSibling.childElementCount;
      //params = event.srcElement.previousElementSibling.childNodes;
      details = event.srcElement.nextElementSibling.nextElementSibling;
      hideButton = event.srcElement.nextElementSibling;
      exportButton = event.srcElement.nextElementSibling.nextElementSibling.nextElementSibling;
    }

    params.forEach(function(element) {
        if (element.tagName == "ION-ITEM") {
          if (element.firstElementChild.firstElementChild.firstElementChild.innerHTML == 0) {
            count -= 1;
          }
          else {
            if (element.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML != "") {
              values.push(parseInt(element.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML));            }
          }
        }
    });
    
    if (!error) {

      var temp = this.tabs.filter(x => x.id == id)[0].details.data;
      
      for (var i = 0; i != values.length; i++) {
        if (values[i] != 99999) {
          temp = temp.filter(x => x.params[i] == values[i]);
        }
        else {
          var newTemp = {data:[], params: values};
          temp.forEach(function(element){
            element.data.forEach(function(row){
              newTemp.data.push(row);
            });
          });
          temp = [];
          temp.push(newTemp);
        }
      }
      
      details.innerHTML = "";
      details.appendChild(this.json2Table(temp[0].data));
      hideButton.style.display = "block";
      exportButton.style.display = "block";
      
    }
    else {
      this.popup("Missing params. Please insert them all.");
    }

  }

  resetDetails(event) {
  
    var button;
    
    if (event.srcElement.parentElement.previousElementSibling.previousElementSibling.className == "paramGroup") {
      button = event.srcElement.parentElement;
    }
    else {
      button = event.srcElement;
    }
    
    button.parentElement.firstElementChild.childNodes.forEach(function(element){
      
      if (element.tagName == "ION-ITEM") {
        element.firstElementChild.firstElementChild.lastElementChild.setAttribute('ng-reflect-model','');
        element.firstElementChild.firstElementChild.lastElementChild.setAttribute('class','select select-md ng-untouched ng-pristine ng-valid');
        element.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML= "";
        //element.firstElementChild.firstElementChild.lastElementChild.firstChild.remove();
        //element.firstElementChild.firstElementChild.lastElementChild.firstChild.remove();
        
        // risolvere problema!
      }
          
    });

    var details, exportButton;
    
    details = button.nextElementSibling;
    exportButton = button.nextElementSibling.nextElementSibling;
    button.style.display = "none";
    details.innerHTML = "";
    exportButton.style.display = "none";
  }

  json2Table(obj) {


      var col = [];
      for (var i = 0; i < obj.length; i++) {
          for (var key in obj[i]) {
              if (col.indexOf(key) === -1) {
                  col.push(key);
              }
          }
      }

      // CREATE DYNAMIC TABLE.
      var table = document.createElement("table");

      // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

      var tr = table.insertRow(-1);                   // TABLE ROW.

      for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");      // TABLE HEADER.
          th.innerHTML = col[i];
          tr.appendChild(th);
      }

      // ADD JSON DATA TO THE TABLE AS ROWS.
      for (var i = 0; i < obj.length; i++) {

          tr = table.insertRow(-1);

          for (var j = 0; j < col.length; j++) {
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = obj[i][col[j]];
          }
      }
      
    return table;
  }
  
  table2csv(table) {
  
    var data = [];
    
    table.childNodes.forEach(function(tr){
      var row = [];
      tr.childNodes.forEach(function(th){
        row.push(th.innerHTML);
      });
      data.push(row);
    });
    
    var header = data[0];
    data.splice(0, 1);
    
    let filecsv = papa.unparse({
      fields: header,
      data: data
    });
    
    var blob = new Blob([filecsv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    return filecsv;
  }

  openIn() {
    var table = event.srcElement.previousElementSibling;
    
    if (table == null) {
      table = event.srcElement.parentElement.previousElementSibling.firstElementChild.firstElementChild;
    }
    else {
      table = event.srcElement.previousElementSibling.firstElementChild.firstElementChild;
    }
    
    var csv = this.table2csv(table);
    this.socialSharing.share(csv);
  }

  memorySizeOf(obj) {
      var bytes = 0;

      function sizeOf(obj) {
          if(obj !== null && obj !== undefined) {
              switch(typeof obj) {
              case 'number':
                  bytes += 8;
                  break;
              case 'string':
                  bytes += obj.length * 2;
                  break;
              case 'boolean':
                  bytes += 4;
                  break;
              case 'object':
                  var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                  if(objClass === 'Object' || objClass === 'Array') {
                      for(var key in obj) {
                          if(!obj.hasOwnProperty(key)) continue;
                          sizeOf(obj[key]);
                      }
                  } else bytes += obj.toString().length * 2;
                  break;
              }
          }
          return bytes;
      };

      function formatByteSize(bytes) {
          if(bytes < 1024) return bytes + " bytes";
          else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
          else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
          else return(bytes / 1073741824).toFixed(3) + " GB";
      };

      return formatByteSize(sizeOf(obj));
  }

  presentLoading(text) {
    let loading = this.loadingCtrl.create({
      content: text
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 20000);

    return loading;
  }

}
