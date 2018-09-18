webpackJsonp([1],{

/***/ 133:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 133;

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-tab-modal/add-tab-modal.module": [
		510,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 175;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popover__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_papaparse__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_papaparse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_papaparse__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = /** @class */ (function () {
    function HomePage(loadingCtrl, popoverCtrl, navCtrl, alertCtrl, http, storage, modal, socialSharing) {
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.storage = storage;
        this.modal = modal;
        this.socialSharing = socialSharing;
        this.unique = __webpack_require__(503);
        this.converter = __webpack_require__(507);
    }
    HomePage.prototype.ngAfterViewInit = function () {
    };
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.ionViewWillLoad = function () {
        this.startup = 1;
        this.selectedChoice = [];
        this.initStorage();
    };
    HomePage.prototype.presentPopover = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__popover__["a" /* PopoverContentPage */]);
        popover.present({
            ev: event
        });
        popover.onDidDismiss(function (id) {
            if (id != undefined) {
                if (id == 1) {
                    _this.openAddTabModal();
                }
            }
        });
    };
    HomePage.prototype.popup = function (message) {
        var alert = this.alertCtrl.create({
            title: message,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.refresh = function (refresher) {
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
        setTimeout(function () {
            refresher.complete();
        }, 2000);
        refresher.complete();
        this.popup(message);
    };
    HomePage.prototype.initStorage = function () {
        var _this = this;
        //this.storage.set('tabs',[]);
        this.storage.get('tabs').then(function (val) {
            if (val == null) {
                _this.storage.set('tabs', []);
                _this.tabs = [];
                _this.nTabs = 0;
            }
            else {
                _this.tabs = val;
                if (_this.tabs != undefined)
                    _this.nTabs = _this.tabs.length;
                else
                    _this.nTabs = 0;
                _this.updateData();
            }
        });
    };
    HomePage.prototype.openAddTabModal = function () {
        var _this = this;
        var addTabModal = this.modal.create('AddTabModalPage');
        addTabModal.present();
        addTabModal.onDidDismiss(function (out) {
            if (out != undefined) {
                var currentID = _this.unique();
                var newTab = { "id": currentID, "url": out.url, "source": out.source, "description": out.description, "chart": { "data": {}, "chartOptions": out.chartOptions }, "details": { "data": {}, "detailsOptions": out.detailsOptions }, "lastUpdate": (new Date).getTime() };
                //window.alert(JSON.stringify(newTab));
                _this.nTabs = _this.tabs.push(newTab);
                _this.storage.set('tabs', _this.tabs);
                _this.updateData();
            }
        });
    };
    HomePage.prototype.favoriteTab = function (event) {
        var id = event.srcElement.parentElement.parentElement.parentElement.nextElementSibling.innerHTML;
        var index = this.tabs.findIndex(function (x) { return x.id == id; });
        var temp = this.tabs[index];
        this.tabs.splice(index, 1);
        this.tabs.unshift(temp);
        this.storage.set('tabs', this.tabs);
        this.updateData();
    };
    HomePage.prototype.deleteTab = function (event) {
        var _this = this;
        var id = event.srcElement.parentElement.parentElement.nextElementSibling.innerHTML;
        var index = this.tabs.findIndex(function (x) { return x.id == id; });
        var alert = this.alertCtrl.create({
            title: 'Deleting',
            message: "Are you sure to delete the tab called \"" + this.tabs[index].description + "\"?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.tabs.splice(index, 1);
                        _this.nTabs = _this.tabs.length;
                        _this.storage.set('tabs', _this.tabs);
                        _this.updateData();
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.updateData = function () {
        var count = 0;
        var timeToWait = 300000;
        var loading = this.presentLoading("Please wait.");
        for (var i = 0; i != this.nTabs; i++) {
            if ((new Date).getTime() - this.tabs[i].lastUpdate > timeToWait || JSON.stringify(this.tabs[i].chart.data) == "{}" || this.startup == 1) {
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
    };
    HomePage.prototype.getData = function (mode, tab, id) {
        var _this = this;
        if (mode == "online") {
            this.http.get("http://192.168.0.114:8080" + tab.url)
                .subscribe(function (out) {
                //window.alert(JSON.stringify(out.details.paramValues));
                //window.alert(this.memorySizeOf(out));
                _this.tabs[id].chart.data = out["chart"];
                _this.drawChart(out["chart"], id, tab.chart.chartOptions);
                if (out["details"] != undefined) {
                    _this.tabs[id].details.data = out["details"].data;
                    _this.tabs[id].details.detailsOptions = out["details"].paramValues;
                    //this.drawDetails(out["details"].data, id);
                }
                _this.storage.set('tabs', _this.tabs);
            }, function (error) {
                _this.popup("I'm sorry. Server problems.");
            });
        }
        else if (mode == "offline") {
            this.drawChart(tab.chart.data, id, tab.chart.chartOptions);
        }
    };
    HomePage.prototype.drawChart = function (data, idItem, options, variable) {
        if (variable != undefined) {
            console.log(data);
            data = data.filter(function (x) { return x.variable == variable; });
            console.log(data);
        }
        var keys = new Array(data.length);
        for (var i = 0; i != data.length; i++) {
            keys[i] = data[i].id;
        }
        var values = new Array(data.length);
        for (var i = 0; i != data.length; i++) {
            values[i] = data[i].log;
        }
        values = values.slice(0, 15);
        keys = keys.slice(0, 15);
        var type;
        var label;
        if (Array.isArray(options)) {
            type = options[0].type;
            label = "# of " + options[0].label;
        }
        else {
            type = options.type;
            label = "# of " + options.label;
        }
        var canvas = this.components.toArray()[idItem].nativeElement;
        var newChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__["Chart"](canvas, {
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
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
    };
    HomePage.prototype.updateChart = function (event) {
        var element = event.srcElement;
        var id = element.parentElement.parentElement.parentElement.nextElementSibling.innerHTML;
        var type = element.lastElementChild.innerHTML;
        var index = this.tabs.findIndex(function (x) { return x.id == id; });
        var data = this.tabs.filter(function (x) { return x.id == id; })[0].chart.data;
        var chartOptions = this.tabs.filter(function (x) { return x.id == id; })[0].chart.chartOptions;
        var selectedOptions = chartOptions.filter(function (x) { return x.type == type; });
        this.tabs.filter(function (x) { return x.id == id; })[0].chart.chartOptions.forEach(function (element) {
            element.selected = 0;
        });
        this.tabs.filter(function (x) { return x.id == id; })[0].chart.chartOptions.filter(function (x) { return x.type == type; })[0].selected = 1;
        this.drawChart(data, index, selectedOptions);
    };
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
    HomePage.prototype.toggleDetails = function (event) {
        if (event.srcElement.nextElementSibling.style.display == "none") {
            event.srcElement.nextElementSibling.style.display = "block";
            event.srcElement.firstElementChild.style.display = "none";
            event.srcElement.lastElementChild.style.display = "block";
        }
        else if (event.srcElement.nextElementSibling.style.display == "block") {
            event.srcElement.nextElementSibling.style.display = "none";
            event.srcElement.firstElementChild.style.display = "block";
            event.srcElement.lastElementChild.style.display = "none";
        }
        else {
            event.srcElement.nextElementSibling.style.display = "block";
            event.srcElement.firstElementChild.style.display = "none";
            event.srcElement.lastElementChild.style.display = "block";
        }
    };
    HomePage.prototype.drawDetails = function (event) {
        var _this = this;
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
        var currentTab = this.tabs.filter(function (x) { return x.id == id; })[0];
        var index = this.tabs.findIndex(function (x) { return x.id == id; });
        currentTab.details.detailsOptions.forEach(function (element) {
            if (element.filter == 1) {
                if (element.paramName != element.name) {
                    if (element.paramName != "All") {
                        var temp = element.elements.filter(function (x) { return x.name == element.paramName; })[0].id;
                        values.push(temp);
                        if (element.chartUpdater == 1) {
                            _this.drawChart(currentTab.chart.data, index, currentTab.chart.chartOptions, temp);
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
        params.forEach(function (element) {
            if (element.tagName == "ION-ITEM") {
                if (element.firstElementChild.firstElementChild.firstElementChild.innerHTML == 0) {
                    count -= 1;
                }
                else {
                    if (element.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML != "") {
                        values.push(parseInt(element.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML));
                    }
                }
            }
        });
        if (!error) {
            var temp = this.tabs.filter(function (x) { return x.id == id; })[0].details.data;
            for (var i = 0; i != values.length; i++) {
                if (values[i] != 99999) {
                    temp = temp.filter(function (x) { return x.params[i] == values[i]; });
                }
                else {
                    var newTemp = { data: [], params: values };
                    temp.forEach(function (element) {
                        element.data.forEach(function (row) {
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
    };
    HomePage.prototype.resetDetails = function (event) {
        var button;
        if (event.srcElement.parentElement.previousElementSibling.previousElementSibling.className == "paramGroup") {
            button = event.srcElement.parentElement;
        }
        else {
            button = event.srcElement;
        }
        button.parentElement.firstElementChild.childNodes.forEach(function (element) {
            if (element.tagName == "ION-ITEM") {
                element.firstElementChild.firstElementChild.lastElementChild.setAttribute('ng-reflect-model', '');
                element.firstElementChild.firstElementChild.lastElementChild.setAttribute('class', 'select select-md ng-untouched ng-pristine ng-valid');
                element.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML = "";
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
    };
    HomePage.prototype.json2Table = function (obj) {
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
        var tr = table.insertRow(-1); // TABLE ROW.
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th"); // TABLE HEADER.
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
    };
    HomePage.prototype.table2csv = function (table) {
        var data = [];
        table.childNodes.forEach(function (tr) {
            var row = [];
            tr.childNodes.forEach(function (th) {
                row.push(th.innerHTML);
            });
            data.push(row);
        });
        var header = data[0];
        data.splice(0, 1);
        var filecsv = __WEBPACK_IMPORTED_MODULE_7_papaparse__["unparse"]({
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
    };
    HomePage.prototype.openIn = function () {
        var table = event.srcElement.previousElementSibling;
        if (table == null) {
            table = event.srcElement.parentElement.previousElementSibling.firstElementChild.firstElementChild;
        }
        else {
            table = event.srcElement.previousElementSibling.firstElementChild.firstElementChild;
        }
        var csv = this.table2csv(table);
        this.socialSharing.share(csv);
    };
    HomePage.prototype.memorySizeOf = function (obj) {
        var bytes = 0;
        function sizeOf(obj) {
            if (obj !== null && obj !== undefined) {
                switch (typeof obj) {
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
                        if (objClass === 'Object' || objClass === 'Array') {
                            for (var key in obj) {
                                if (!obj.hasOwnProperty(key))
                                    continue;
                                sizeOf(obj[key]);
                            }
                        }
                        else
                            bytes += obj.toString().length * 2;
                        break;
                }
            }
            return bytes;
        }
        ;
        function formatByteSize(bytes) {
            if (bytes < 1024)
                return bytes + " bytes";
            else if (bytes < 1048576)
                return (bytes / 1024).toFixed(3) + " KB";
            else if (bytes < 1073741824)
                return (bytes / 1048576).toFixed(3) + " MB";
            else
                return (bytes / 1073741824).toFixed(3) + " GB";
        }
        ;
        return formatByteSize(sizeOf(obj));
    };
    HomePage.prototype.presentLoading = function (text) {
        var loading = this.loadingCtrl.create({
            content: text
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 20000);
        return loading;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])('chart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], HomePage.prototype, "components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])('details'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], HomePage.prototype, "components2", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/fabianoammirata/Dashboard/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <ion-title> MyDashboard </ion-title>\n    <button id="popover" icon-only (click)="presentPopover($event)">\n      <ion-icon name="more"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n<ion-refresher (ionRefresh)="refresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n</ion-refresher>\n\n<ion-list *ngFor="let data of tabs;" no-lines>\n\n    <ion-card>\n      <ion-card-header>\n        <div class="topHead">\n          <span class="source">{{ data.source }}</span>\n          <button class="delete" icon-only (click)="deleteTab($event);">\n            <ion-icon name="close"></ion-icon>\n          </button>\n          <div class="clear"></div>\n        </div>\n        <div class="bottomHead">\n          <div class="description">{{ data.description }}</div>\n          <div class="settings">\n            <ng-container *ngFor="let options of data.chart.chartOptions;">\n              <button class="typeSelected" icon-only *ngIf="options.selected==1" (click)="updateChart($event);">\n                <ion-icon class="iconTypeSelected" [name]="options.icon"></ion-icon>\n                <div class="id">{{ options.type }}</div>\n              </button>\n              <button class="type" icon-only *ngIf="options.selected==0" (click)="updateChart($event);">\n                <ion-icon class="iconType" [name]="options.icon"></ion-icon>\n                <div class="id">{{ options.type }}</div>\n              </button>\n            </ng-container>\n            <div class="clear"></div>\n          </div>\n        </div>\n      </ion-card-header>\n      <div class="id">{{ data.id }}</div>\n      <ion-card-content>\n        <canvas #chart></canvas>\n        <div class="details">\n          <div *ngIf="data.details.detailsOptions" class="descriptionDetails">Details</div>\n          <button class="hideButtonDetails" *ngIf="data.details.detailsOptions" icon-only (click)="toggleDetails($event);">\n            <ion-icon class="detailsUp" name="arrow-forward"></ion-icon>\n            <ion-icon class="detailsDown" name="arrow-down"></ion-icon>\n          </button>\n          <div class="detailsForm" *ngIf="data.details.detailsOptions">\n            <div class="paramGroup">\n              <ng-container *ngFor="let details of data.details.detailsOptions;">\n                <ion-item *ngIf="details.dependence==1">\n                  <ion-label>{{ details.name }}</ion-label>\n                  <ion-select okText="Select" cancelText="Cancel" [(ngModel)]="details.paramName">\n                    <ng-container *ngFor="let element of details.elements;">\n                      <ng-container *ngIf="element.enable==1">\n                        <ion-option *ngIf="element.filter==data.details.detailsOptions[details.indexOfDependence].paramName" [value]="element.value">{{ element.name }}</ion-option>\n                      </ng-container>\n                      <ng-container *ngIf="element.enable==0">\n                        <ion-option disabled *ngIf="element.filter==data.details.detailsOptions[details.indexOfDependence].paramName" [value]="element.value">{{ element.name }}</ion-option>\n                      </ng-container>\n                    </ng-container>\n                  </ion-select>\n                </ion-item>\n                <ng-container *ngIf="details.dependence==0">\n                  <ion-item *ngIf="details.independence==0">\n                    <ion-label>{{ details.name }}</ion-label>\n                    <ion-select okText="Select" cancelText="Cancel" [(ngModel)]="details.paramName">\n                      <ion-option [value]="all">All</ion-option>\n                      <ng-container *ngFor="let element of details.elements;">\n                        <ion-option *ngIf="element.enable==1" [value]="element.value">{{ element.name }}</ion-option>\n                        <ion-option *ngIf="element.enable==0" disabled [value]="element.value">{{ element.name }}</ion-option>\n                      </ng-container>\n                    </ion-select>\n                  </ion-item>\n                  <ion-item *ngIf="details.independence==1">\n                    <ion-label>{{ details.name }}</ion-label>\n                    <ion-select okText="Select" cancelText="Cancel" [(ngModel)]="details.paramName">\n                      <ng-container *ngFor="let element of details.elements;">\n                        <ion-option *ngIf="element.enable==1" [value]="element.value">{{ element.name }}</ion-option>\n                        <ion-option *ngIf="element.enable==0" disabled [value]="element.value">{{ element.name }}</ion-option>\n                      </ng-container>\n                    </ion-select>\n                  </ion-item>\n                </ng-container>\n              </ng-container>\n            </div>\n            <button *ngIf="data.details.detailsOptions" ion-button color="danger" (click)="drawDetails($event);">Update</button>\n            <button class ="resetDetails" *ngIf="data.details.detailsOptions" ion-button color="light" (click)="resetDetails($event);">Reset</button>\n            <div *ngIf="data.details.detailsOptions"></div>\n            <button class ="exportDetails" *ngIf="data.details.detailsOptions" ion-button color="danger" (click)="openIn($event);">Export</button>\n          </div>\n        </div>\n      </ion-card-content>\n    </ion-card>\n\n\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/fabianoammirata/Dashboard/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopoverContentPage = /** @class */ (function () {
    function PopoverContentPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    PopoverContentPage.prototype.close = function (id) {
        this.viewCtrl.dismiss(id);
    };
    PopoverContentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/fabianoammirata/Dashboard/src/pages/home/popover.html"*/'<ion-list>\n      <ion-list-header color="danger">\n        Actions\n        <button id="popover2" icon-only (click)="close(0)">\n          <ion-icon name="more"></ion-icon>\n        </button>\n      </ion-list-header>\n      <button ion-item (click)="close(1)">Add a tab</button>\n</ion-list>\n'/*ion-inline-end:"/Users/fabianoammirata/Dashboard/src/pages/home/popover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], PopoverContentPage);
    return PopoverContentPage;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(383);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_popover__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_popover__["a" /* PopoverContentPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/add-tab-modal/add-tab-modal.module#AddTabModalPageModule', name: 'AddTabModalPage', segment: 'add-tab-modal', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_popover__["a" /* PopoverContentPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__["a" /* SocialSharing */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(218);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/fabianoammirata/Dashboard/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/fabianoammirata/Dashboard/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 227,
	"./af.js": 227,
	"./ar": 228,
	"./ar-dz": 229,
	"./ar-dz.js": 229,
	"./ar-kw": 230,
	"./ar-kw.js": 230,
	"./ar-ly": 231,
	"./ar-ly.js": 231,
	"./ar-ma": 232,
	"./ar-ma.js": 232,
	"./ar-sa": 233,
	"./ar-sa.js": 233,
	"./ar-tn": 234,
	"./ar-tn.js": 234,
	"./ar.js": 228,
	"./az": 235,
	"./az.js": 235,
	"./be": 236,
	"./be.js": 236,
	"./bg": 237,
	"./bg.js": 237,
	"./bm": 238,
	"./bm.js": 238,
	"./bn": 239,
	"./bn.js": 239,
	"./bo": 240,
	"./bo.js": 240,
	"./br": 241,
	"./br.js": 241,
	"./bs": 242,
	"./bs.js": 242,
	"./ca": 243,
	"./ca.js": 243,
	"./cs": 244,
	"./cs.js": 244,
	"./cv": 245,
	"./cv.js": 245,
	"./cy": 246,
	"./cy.js": 246,
	"./da": 247,
	"./da.js": 247,
	"./de": 248,
	"./de-at": 249,
	"./de-at.js": 249,
	"./de-ch": 250,
	"./de-ch.js": 250,
	"./de.js": 248,
	"./dv": 251,
	"./dv.js": 251,
	"./el": 252,
	"./el.js": 252,
	"./en-au": 253,
	"./en-au.js": 253,
	"./en-ca": 254,
	"./en-ca.js": 254,
	"./en-gb": 255,
	"./en-gb.js": 255,
	"./en-ie": 256,
	"./en-ie.js": 256,
	"./en-il": 257,
	"./en-il.js": 257,
	"./en-nz": 258,
	"./en-nz.js": 258,
	"./eo": 259,
	"./eo.js": 259,
	"./es": 260,
	"./es-do": 261,
	"./es-do.js": 261,
	"./es-us": 262,
	"./es-us.js": 262,
	"./es.js": 260,
	"./et": 263,
	"./et.js": 263,
	"./eu": 264,
	"./eu.js": 264,
	"./fa": 265,
	"./fa.js": 265,
	"./fi": 266,
	"./fi.js": 266,
	"./fo": 267,
	"./fo.js": 267,
	"./fr": 268,
	"./fr-ca": 269,
	"./fr-ca.js": 269,
	"./fr-ch": 270,
	"./fr-ch.js": 270,
	"./fr.js": 268,
	"./fy": 271,
	"./fy.js": 271,
	"./gd": 272,
	"./gd.js": 272,
	"./gl": 273,
	"./gl.js": 273,
	"./gom-latn": 274,
	"./gom-latn.js": 274,
	"./gu": 275,
	"./gu.js": 275,
	"./he": 276,
	"./he.js": 276,
	"./hi": 277,
	"./hi.js": 277,
	"./hr": 278,
	"./hr.js": 278,
	"./hu": 279,
	"./hu.js": 279,
	"./hy-am": 280,
	"./hy-am.js": 280,
	"./id": 281,
	"./id.js": 281,
	"./is": 282,
	"./is.js": 282,
	"./it": 283,
	"./it.js": 283,
	"./ja": 284,
	"./ja.js": 284,
	"./jv": 285,
	"./jv.js": 285,
	"./ka": 286,
	"./ka.js": 286,
	"./kk": 287,
	"./kk.js": 287,
	"./km": 288,
	"./km.js": 288,
	"./kn": 289,
	"./kn.js": 289,
	"./ko": 290,
	"./ko.js": 290,
	"./ky": 291,
	"./ky.js": 291,
	"./lb": 292,
	"./lb.js": 292,
	"./lo": 293,
	"./lo.js": 293,
	"./lt": 294,
	"./lt.js": 294,
	"./lv": 295,
	"./lv.js": 295,
	"./me": 296,
	"./me.js": 296,
	"./mi": 297,
	"./mi.js": 297,
	"./mk": 298,
	"./mk.js": 298,
	"./ml": 299,
	"./ml.js": 299,
	"./mn": 300,
	"./mn.js": 300,
	"./mr": 301,
	"./mr.js": 301,
	"./ms": 302,
	"./ms-my": 303,
	"./ms-my.js": 303,
	"./ms.js": 302,
	"./mt": 304,
	"./mt.js": 304,
	"./my": 305,
	"./my.js": 305,
	"./nb": 306,
	"./nb.js": 306,
	"./ne": 307,
	"./ne.js": 307,
	"./nl": 308,
	"./nl-be": 309,
	"./nl-be.js": 309,
	"./nl.js": 308,
	"./nn": 310,
	"./nn.js": 310,
	"./pa-in": 311,
	"./pa-in.js": 311,
	"./pl": 312,
	"./pl.js": 312,
	"./pt": 313,
	"./pt-br": 314,
	"./pt-br.js": 314,
	"./pt.js": 313,
	"./ro": 315,
	"./ro.js": 315,
	"./ru": 316,
	"./ru.js": 316,
	"./sd": 317,
	"./sd.js": 317,
	"./se": 318,
	"./se.js": 318,
	"./si": 319,
	"./si.js": 319,
	"./sk": 320,
	"./sk.js": 320,
	"./sl": 321,
	"./sl.js": 321,
	"./sq": 322,
	"./sq.js": 322,
	"./sr": 323,
	"./sr-cyrl": 324,
	"./sr-cyrl.js": 324,
	"./sr.js": 323,
	"./ss": 325,
	"./ss.js": 325,
	"./sv": 326,
	"./sv.js": 326,
	"./sw": 327,
	"./sw.js": 327,
	"./ta": 328,
	"./ta.js": 328,
	"./te": 329,
	"./te.js": 329,
	"./tet": 330,
	"./tet.js": 330,
	"./tg": 331,
	"./tg.js": 331,
	"./th": 332,
	"./th.js": 332,
	"./tl-ph": 333,
	"./tl-ph.js": 333,
	"./tlh": 334,
	"./tlh.js": 334,
	"./tr": 335,
	"./tr.js": 335,
	"./tzl": 336,
	"./tzl.js": 336,
	"./tzm": 337,
	"./tzm-latn": 338,
	"./tzm-latn.js": 338,
	"./tzm.js": 337,
	"./ug-cn": 339,
	"./ug-cn.js": 339,
	"./uk": 340,
	"./uk.js": 340,
	"./ur": 341,
	"./ur.js": 341,
	"./uz": 342,
	"./uz-latn": 343,
	"./uz-latn.js": 343,
	"./uz.js": 342,
	"./vi": 344,
	"./vi.js": 344,
	"./x-pseudo": 345,
	"./x-pseudo.js": 345,
	"./yo": 346,
	"./yo.js": 346,
	"./zh-cn": 347,
	"./zh-cn.js": 347,
	"./zh-hk": 348,
	"./zh-hk.js": 348,
	"./zh-tw": 349,
	"./zh-tw.js": 349
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 467;

/***/ }),

/***/ 493:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 495:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[362]);
//# sourceMappingURL=main.js.map