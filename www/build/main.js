webpackJsonp([1],{

/***/ 119:
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
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-tab-modal/add-tab-modal.module": [
		475,
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
webpackAsyncContext.id = 161;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popover__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(336);
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
    function HomePage(loadingCtrl, popoverCtrl, navCtrl, alertCtrl, http, storage, modal) {
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.storage = storage;
        this.modal = modal;
        this.unique = __webpack_require__(467);
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
                //window.alert(JSON.stringify(val));
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
                //window.alert(JSON.stringify(out));
                //window.alert(this.memorySizeOf(out));
                _this.tabs[id].chart.data = out["chart"];
                _this.drawChart(out["chart"], id, tab.chart.chartOptions);
                if (out["details"] != undefined) {
                    _this.tabs[id].details.data = out["details"].data;
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
    HomePage.prototype.drawChart = function (data, idItem, options) {
        var keys = new Array(data.length);
        for (var i = 0; i != data.length; i++) {
            keys[i] = data[i].id;
        }
        var values = new Array(data.length);
        for (var i = 0; i != data.length; i++) {
            values[i] = data[i].log;
        }
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
        //if (this.barChart) this.barChart.destroy();
        this.barChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__["Chart"](canvas, {
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
        var id;
        var values = [];
        var count;
        var params;
        var details;
        if (event.srcElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling != undefined) {
            id = event.srcElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.innerHTML;
        }
        else {
            id = event.srcElement.parentElement.parentElement.parentElement.previousElementSibling.innerHTML;
        }
        if (event.srcElement.parentElement.previousElementSibling.className == "paramGroup") {
            count = event.srcElement.parentElement.previousElementSibling.childElementCount;
            params = event.srcElement.parentElement.previousElementSibling.childNodes;
            details = event.srcElement.parentElement.nextElementSibling.nextElementSibling;
        }
        else {
            count = event.srcElement.previousElementSibling.childElementCount;
            params = event.srcElement.previousElementSibling.childNodes;
            details = event.srcElement.nextElementSibling.nextElementSibling;
        }
        params.forEach(function (element) {
            if (element.tagName == "ION-ITEM") {
                if (element.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML != "") {
                    values.push(parseInt(element.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML));
                }
            }
        });
        if (JSON.stringify(values) != "[]") {
            if (count == values.length) {
                var temp;
                for (var i = 0; i != values.length; i++) {
                    temp = this.tabs;
                    temp = temp.filter(function (x) { return x.id == id; })[0].details.data.filter(function (x) { return x.params[i] == values[i]; });
                }
                details.innerHTML = "";
                details.appendChild(this.json2Table(temp[0].data));
            }
            else {
                this.popup("Missing params. Please insert them all.");
            }
        }
        else {
            this.popup("Please insert parameters.");
        }
    };
    HomePage.prototype.resetDetails = function (event) {
        console.log(event);
        var details;
        if (event.srcElement.parentElement.previousElementSibling.previousElementSibling.className == "paramGroup") {
            details = event.srcElement.parentElement.nextElementSibling;
        }
        else {
            details = event.srcElement.nextElementSibling;
        }
        details.innerHTML = "";
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
            selector: 'page-home',template:/*ion-inline-start:"/Users/fabianoammirata/Dashboard/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <ion-title> MyDashboard </ion-title>\n    <button id="popover" icon-only (click)="presentPopover($event)">\n      <ion-icon name="more"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n<ion-refresher (ionRefresh)="refresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n</ion-refresher>\n\n<ion-list *ngFor="let data of tabs;" no-lines>\n\n    <ion-card>\n      <ion-card-header>\n        <div class="topHead">\n          <span class="source">{{ data.source }}</span>\n          <button class="delete" icon-only (click)="deleteTab($event);">\n            <ion-icon name="close"></ion-icon>\n          </button>\n          <div class="clear"></div>\n        </div>\n        <div class="bottomHead">\n          <div class="description">{{ data.description }}</div>\n          <div class="settings">\n            <button class="type" icon-only *ngFor="let options of data.chart.chartOptions;" (click)="updateChart($event);">\n              <ion-icon [name]="options.icon"></ion-icon>\n              <div class="id">{{ options.type }}</div>\n            </button>\n            <!--\n            <button class="favorite" icon-only (click)="favoriteTab($event);">\n              <ion-icon name="star"></ion-icon>\n            </button>\n            -->\n            <div class="clear"></div>\n          </div>\n        </div>\n      </ion-card-header>\n      <div class="id">{{ data.id }}</div>\n      <ion-card-content>\n        <canvas #chart></canvas>\n        <div class="details">\n          <div *ngIf="data.details.detailsOptions" class="descriptionDetails">Details</div>\n          <button class="hideButtonDetails" *ngIf="data.details.detailsOptions" icon-only (click)="toggleDetails($event);">\n            <ion-icon class="detailsUp" name="arrow-forward"></ion-icon>\n            <ion-icon class="detailsDown" name="arrow-down"></ion-icon>\n          </button>\n          <div class="detailsForm" *ngIf="data.details.detailsOptions">\n            <div class="paramGroup">\n              <ion-item *ngFor="let details of data.details.detailsOptions;">\n                <ion-label>{{ details.name }}</ion-label>\n                <ion-select okText="Select" cancelText="Cancel" [(ngModel)]="details.paramName">\n                  <ion-option *ngFor="let values of details.values;" [value]="values">{{ values }}</ion-option>\n                </ion-select>\n              </ion-item>\n            </div>\n            <button *ngIf="data.details.detailsOptions" ion-button color="danger" (click)="drawDetails($event);">Update</button>\n            <button class ="resetDetails" *ngIf="data.details.detailsOptions" ion-button color="light" (click)="resetDetails($event);">Reset</button>\n            <div *ngIf="data.details.detailsOptions"></div>\n          </div>\n        </div>\n      </ion-card-content>\n    </ion-card>\n\n\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/fabianoammirata/Dashboard/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/fabianoammirata/Dashboard/src/pages/home/popover.html"*/'<ion-list>\n      <ion-list-header color="danger">Actions</ion-list-header>\n      <button ion-item (click)="close(1)">Add a tab</button>\n</ion-list>\n'/*ion-inline-end:"/Users/fabianoammirata/Dashboard/src/pages/home/popover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], PopoverContentPage);
    return PopoverContentPage;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(360);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_popover__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(204);
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
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(205);
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

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 213,
	"./af.js": 213,
	"./ar": 214,
	"./ar-dz": 215,
	"./ar-dz.js": 215,
	"./ar-kw": 216,
	"./ar-kw.js": 216,
	"./ar-ly": 217,
	"./ar-ly.js": 217,
	"./ar-ma": 218,
	"./ar-ma.js": 218,
	"./ar-sa": 219,
	"./ar-sa.js": 219,
	"./ar-tn": 220,
	"./ar-tn.js": 220,
	"./ar.js": 214,
	"./az": 221,
	"./az.js": 221,
	"./be": 222,
	"./be.js": 222,
	"./bg": 223,
	"./bg.js": 223,
	"./bm": 224,
	"./bm.js": 224,
	"./bn": 225,
	"./bn.js": 225,
	"./bo": 226,
	"./bo.js": 226,
	"./br": 227,
	"./br.js": 227,
	"./bs": 228,
	"./bs.js": 228,
	"./ca": 229,
	"./ca.js": 229,
	"./cs": 230,
	"./cs.js": 230,
	"./cv": 231,
	"./cv.js": 231,
	"./cy": 232,
	"./cy.js": 232,
	"./da": 233,
	"./da.js": 233,
	"./de": 234,
	"./de-at": 235,
	"./de-at.js": 235,
	"./de-ch": 236,
	"./de-ch.js": 236,
	"./de.js": 234,
	"./dv": 237,
	"./dv.js": 237,
	"./el": 238,
	"./el.js": 238,
	"./en-au": 239,
	"./en-au.js": 239,
	"./en-ca": 240,
	"./en-ca.js": 240,
	"./en-gb": 241,
	"./en-gb.js": 241,
	"./en-ie": 242,
	"./en-ie.js": 242,
	"./en-il": 243,
	"./en-il.js": 243,
	"./en-nz": 244,
	"./en-nz.js": 244,
	"./eo": 245,
	"./eo.js": 245,
	"./es": 246,
	"./es-do": 247,
	"./es-do.js": 247,
	"./es-us": 248,
	"./es-us.js": 248,
	"./es.js": 246,
	"./et": 249,
	"./et.js": 249,
	"./eu": 250,
	"./eu.js": 250,
	"./fa": 251,
	"./fa.js": 251,
	"./fi": 252,
	"./fi.js": 252,
	"./fo": 253,
	"./fo.js": 253,
	"./fr": 254,
	"./fr-ca": 255,
	"./fr-ca.js": 255,
	"./fr-ch": 256,
	"./fr-ch.js": 256,
	"./fr.js": 254,
	"./fy": 257,
	"./fy.js": 257,
	"./gd": 258,
	"./gd.js": 258,
	"./gl": 259,
	"./gl.js": 259,
	"./gom-latn": 260,
	"./gom-latn.js": 260,
	"./gu": 261,
	"./gu.js": 261,
	"./he": 262,
	"./he.js": 262,
	"./hi": 263,
	"./hi.js": 263,
	"./hr": 264,
	"./hr.js": 264,
	"./hu": 265,
	"./hu.js": 265,
	"./hy-am": 266,
	"./hy-am.js": 266,
	"./id": 267,
	"./id.js": 267,
	"./is": 268,
	"./is.js": 268,
	"./it": 269,
	"./it.js": 269,
	"./ja": 270,
	"./ja.js": 270,
	"./jv": 271,
	"./jv.js": 271,
	"./ka": 272,
	"./ka.js": 272,
	"./kk": 273,
	"./kk.js": 273,
	"./km": 274,
	"./km.js": 274,
	"./kn": 275,
	"./kn.js": 275,
	"./ko": 276,
	"./ko.js": 276,
	"./ky": 277,
	"./ky.js": 277,
	"./lb": 278,
	"./lb.js": 278,
	"./lo": 279,
	"./lo.js": 279,
	"./lt": 280,
	"./lt.js": 280,
	"./lv": 281,
	"./lv.js": 281,
	"./me": 282,
	"./me.js": 282,
	"./mi": 283,
	"./mi.js": 283,
	"./mk": 284,
	"./mk.js": 284,
	"./ml": 285,
	"./ml.js": 285,
	"./mn": 286,
	"./mn.js": 286,
	"./mr": 287,
	"./mr.js": 287,
	"./ms": 288,
	"./ms-my": 289,
	"./ms-my.js": 289,
	"./ms.js": 288,
	"./mt": 290,
	"./mt.js": 290,
	"./my": 291,
	"./my.js": 291,
	"./nb": 292,
	"./nb.js": 292,
	"./ne": 293,
	"./ne.js": 293,
	"./nl": 294,
	"./nl-be": 295,
	"./nl-be.js": 295,
	"./nl.js": 294,
	"./nn": 296,
	"./nn.js": 296,
	"./pa-in": 297,
	"./pa-in.js": 297,
	"./pl": 298,
	"./pl.js": 298,
	"./pt": 299,
	"./pt-br": 300,
	"./pt-br.js": 300,
	"./pt.js": 299,
	"./ro": 301,
	"./ro.js": 301,
	"./ru": 302,
	"./ru.js": 302,
	"./sd": 303,
	"./sd.js": 303,
	"./se": 304,
	"./se.js": 304,
	"./si": 305,
	"./si.js": 305,
	"./sk": 306,
	"./sk.js": 306,
	"./sl": 307,
	"./sl.js": 307,
	"./sq": 308,
	"./sq.js": 308,
	"./sr": 309,
	"./sr-cyrl": 310,
	"./sr-cyrl.js": 310,
	"./sr.js": 309,
	"./ss": 311,
	"./ss.js": 311,
	"./sv": 312,
	"./sv.js": 312,
	"./sw": 313,
	"./sw.js": 313,
	"./ta": 314,
	"./ta.js": 314,
	"./te": 315,
	"./te.js": 315,
	"./tet": 316,
	"./tet.js": 316,
	"./tg": 317,
	"./tg.js": 317,
	"./th": 318,
	"./th.js": 318,
	"./tl-ph": 319,
	"./tl-ph.js": 319,
	"./tlh": 320,
	"./tlh.js": 320,
	"./tr": 321,
	"./tr.js": 321,
	"./tzl": 322,
	"./tzl.js": 322,
	"./tzm": 323,
	"./tzm-latn": 324,
	"./tzm-latn.js": 324,
	"./tzm.js": 323,
	"./ug-cn": 325,
	"./ug-cn.js": 325,
	"./uk": 326,
	"./uk.js": 326,
	"./ur": 327,
	"./ur.js": 327,
	"./uz": 328,
	"./uz-latn": 329,
	"./uz-latn.js": 329,
	"./uz.js": 328,
	"./vi": 330,
	"./vi.js": 330,
	"./x-pseudo": 331,
	"./x-pseudo.js": 331,
	"./yo": 332,
	"./yo.js": 332,
	"./zh-cn": 333,
	"./zh-cn.js": 333,
	"./zh-hk": 334,
	"./zh-hk.js": 334,
	"./zh-tw": 335,
	"./zh-tw.js": 335
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
webpackContext.id = 445;

/***/ })

},[339]);
//# sourceMappingURL=main.js.map