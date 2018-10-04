webpackJsonp([2],{

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignInPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignInPage = /** @class */ (function () {
    function SignInPage(navCtrl, navParams, formBuilder, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.credentialsForm = this.formBuilder.group({
            user: [''],
            password: ['']
        });
    }
    SignInPage.prototype.popup = function (message) {
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
    SignInPage.prototype.onSignIn = function () {
        var _this = this;
        var user = this.credentialsForm.value.user;
        var pass = this.credentialsForm.value.password;
        this.http.get("http://192.168.0.114:8081/users/all")
            .subscribe(function (out) {
            if (user != "" && pass != "") {
                var account = out.filter(function (x) { return x.username = user; })[0];
                if (account != undefined) {
                    if (user == account.username && pass == account.password) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */], { data: account });
                    }
                    else {
                        _this.popup("Wrong Username or Password");
                    }
                }
                else {
                    _this.popup("Wrong Username or Password");
                }
            }
            else {
                _this.popup("Please insert credentials");
            }
        }, function (error) {
            _this.popup("Error");
        });
    };
    SignInPage.prototype.onForgotPassword = function () {
        alert(this.credentialsForm.value.user + " " + this.credentialsForm.value.password);
    };
    SignInPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sign-in',template:/*ion-inline-start:"/Users/fabianoammirata/Dashboard/src/pages/sign-in/sign-in.html"*/'<ion-header no-border>\n</ion-header>\n\n<ion-content no-bounce padding>\n\n  <ion-row class="app-icon-container">\n    <ion-col text-center>\n      <ion-icon name="ionic" class="app-icon-zoom"></ion-icon>\n    </ion-col>\n  </ion-row>\n\n  <form [formGroup]="credentialsForm">\n\n    <ion-item>\n      <ion-label floating>User</ion-label>\n      <ion-input required [formControl]="credentialsForm.controls[\'user\']"\n          type="text"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input required [formControl]="credentialsForm.controls[\'password\']"\n          type="password"></ion-input>\n    </ion-item>\n\n    <ion-row class="sign-in-button-container">\n      <ion-col text-center>\n        <button ion-button block color="secondary" (click)="onSignIn()">\n          Sign in\n        </button>\n      </ion-col>\n    </ion-row>\n\n<!--\n    <ion-row>\n      <ion-col text-center>\n        <button ion-button clear color="light"\n            (click)="onForgotPassword()">\n          Forgot your password?\n        </button>\n      </ion-col>\n    </ion-row>\n-->\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"/Users/fabianoammirata/Dashboard/src/pages/sign-in/sign-in.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SignInPage);
    return SignInPage;
}());

//# sourceMappingURL=sign-in.js.map

/***/ }),

/***/ 134:
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
webpackEmptyAsyncContext.id = 134;

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-tab-modal/add-tab-modal.module": [
		511,
		0
	],
	"../pages/sign-in/sign-in.module": [
		512,
		1
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
webpackAsyncContext.id = 176;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popover__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_papaparse__ = __webpack_require__(472);
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
    function HomePage(loadingCtrl, popoverCtrl, navCtrl, navParams, alertCtrl, http, storage, modal, socialSharing) {
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.storage = storage;
        this.modal = modal;
        this.socialSharing = socialSharing;
        this.unique = __webpack_require__(486);
        this.converter = __webpack_require__(490);
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
            this.http.get("http://192.168.0.116:8080" + tab.url)
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
    HomePage.prototype.tryToSolve = function (keys, id) {
        var _this = this;
        var newKeys = [];
        var elements = this.tabs[id].details.detailsOptions.filter(function (x) { return x.name == "quiz"; })[0].elements;
        console.log(elements);
        keys.forEach(function (key) {
            var index = elements.findIndex(function (x) { return x.name == key; });
            var lable = "";
            if (elements.filter(function (x) { return x.name == key; }).length != 0) {
                var section = elements.filter(function (x) { return x.name == key; })[0].filter;
                _this.tabs[id].details.detailsOptions.filter(function (x) { return x.name == "section"; })[0].elements.forEach(function (sec) {
                    if (sec.name == section) {
                        for (var i = index; i >= 0; i--) {
                            if (elements[i].enable == 0) {
                                lable = elements[i].name;
                                break;
                            }
                        }
                        var newKey;
                        var es = "E" + key.split(" - ")[0];
                        if (key.split(" - ")[0].length > 3) {
                            es = key;
                        }
                        if (lable != "") {
                            var la = "L" + lable.split(" ")[lable.split(" ").length - 1];
                            if (lable.split(" ")[lable.split(" ").length - 1].length > 3) {
                                la = lable.split(" ")[lable.split(" ").length - 1];
                            }
                            newKey = "S" + sec.id + " " + la + " " + es;
                        }
                        else {
                            newKey = "S" + sec.id + " " + es;
                        }
                        newKeys.push(newKey);
                    }
                });
            }
        });
        console.log(newKeys);
        return newKeys;
    };
    HomePage.prototype.drawChart = function (data, idItem, options, variable) {
        if (variable != undefined) {
            data = data.filter(function (x) { return x.variable == variable; });
        }
        var keys = new Array(data.length);
        for (var i = 0; i != data.length; i++) {
            keys[i] = data[i].id;
        }
        keys = this.tryToSolve(keys, idItem);
        console.log(keys);
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
            selector: 'page-home',template:/*ion-inline-start:"/Users/fabianoammirata/Dashboard/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="danger" hideBackButton>\n    <ion-title *ngIf="navParams.get(\'data\').firstname"> {{ navParams.get(\'data\').firstname }}\'s Dashboard </ion-title>\n    <ion-title *ngIf="navParams.get(\'data\').firstname == \'\'"> MyDashboard </ion-title>\n    <button id="popover" icon-only (click)="presentPopover($event)">\n      <ion-icon name="more"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n<ion-refresher (ionRefresh)="refresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n</ion-refresher>\n\n<ion-list *ngFor="let data of tabs;" no-lines>\n\n    <ion-card>\n      <ion-card-header>\n        <div class="topHead">\n          <span class="source">{{ data.source }}</span>\n          <button class="delete" icon-only (click)="deleteTab($event);">\n            <ion-icon name="close"></ion-icon>\n          </button>\n          <div class="clear"></div>\n        </div>\n        <div class="bottomHead">\n          <div class="description">{{ data.description }}</div>\n          <div class="settings">\n            <ng-container *ngFor="let options of data.chart.chartOptions;">\n              <button class="typeSelected" icon-only *ngIf="options.selected==1" (click)="updateChart($event);">\n                <ion-icon class="iconTypeSelected" [name]="options.icon"></ion-icon>\n                <div class="id">{{ options.type }}</div>\n              </button>\n              <button class="type" icon-only *ngIf="options.selected==0" (click)="updateChart($event);">\n                <ion-icon class="iconType" [name]="options.icon"></ion-icon>\n                <div class="id">{{ options.type }}</div>\n              </button>\n            </ng-container>\n            <div class="clear"></div>\n          </div>\n        </div>\n      </ion-card-header>\n      <div class="id">{{ data.id }}</div>\n      <ion-card-content>\n        <canvas #chart></canvas>\n        <div class="details">\n          <div *ngIf="data.details.detailsOptions" class="descriptionDetails">Details</div>\n          <button class="hideButtonDetails" *ngIf="data.details.detailsOptions" icon-only (click)="toggleDetails($event);">\n            <ion-icon class="detailsUp" name="arrow-forward"></ion-icon>\n            <ion-icon class="detailsDown" name="arrow-down"></ion-icon>\n          </button>\n          <div class="detailsForm" *ngIf="data.details.detailsOptions">\n            <div class="paramGroup">\n              <ng-container *ngFor="let details of data.details.detailsOptions;">\n                <ion-item *ngIf="details.dependence==1">\n                  <ion-label>{{ details.name }}</ion-label>\n                  <ion-select okText="Select" cancelText="Cancel" [(ngModel)]="details.paramName">\n                    <ng-container *ngFor="let element of details.elements;">\n                      <ng-container *ngIf="element.enable==1">\n                        <ion-option *ngIf="element.filter==data.details.detailsOptions[details.indexOfDependence].paramName" [value]="element.value">{{ element.name }}</ion-option>\n                      </ng-container>\n                      <ng-container *ngIf="element.enable==0">\n                        <ion-option disabled *ngIf="element.filter==data.details.detailsOptions[details.indexOfDependence].paramName" [value]="element.value">{{ element.name }}</ion-option>\n                      </ng-container>\n                    </ng-container>\n                  </ion-select>\n                </ion-item>\n                <ng-container *ngIf="details.dependence==0">\n                  <ion-item *ngIf="details.independence==0">\n                    <ion-label>{{ details.name }}</ion-label>\n                    <ion-select okText="Select" cancelText="Cancel" [(ngModel)]="details.paramName">\n                      <ion-option [value]="all">All</ion-option>\n                      <ng-container *ngFor="let element of details.elements;">\n                        <ion-option *ngIf="element.enable==1" [value]="element.value">{{ element.name }}</ion-option>\n                        <ion-option *ngIf="element.enable==0" disabled [value]="element.value">{{ element.name }}</ion-option>\n                      </ng-container>\n                    </ion-select>\n                  </ion-item>\n                  <ion-item *ngIf="details.independence==1">\n                    <ion-label>{{ details.name }}</ion-label>\n                    <ion-select okText="Select" cancelText="Cancel" [(ngModel)]="details.paramName">\n                      <ng-container *ngFor="let element of details.elements;">\n                        <ion-option *ngIf="element.enable==1" [value]="element.value">{{ element.name }}</ion-option>\n                        <ion-option *ngIf="element.enable==0" disabled [value]="element.value">{{ element.name }}</ion-option>\n                      </ng-container>\n                    </ion-select>\n                  </ion-item>\n                </ng-container>\n              </ng-container>\n            </div>\n            <button *ngIf="data.details.detailsOptions" ion-button color="danger" (click)="drawDetails($event);">Update</button>\n            <button class ="resetDetails" *ngIf="data.details.detailsOptions" ion-button color="light" (click)="resetDetails($event);">Reset</button>\n            <div *ngIf="data.details.detailsOptions"></div>\n            <button class ="exportDetails" *ngIf="data.details.detailsOptions" ion-button color="danger" (click)="openIn($event);">Export</button>\n          </div>\n        </div>\n      </ion-card-content>\n    </ion-card>\n\n\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/fabianoammirata/Dashboard/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], PopoverContentPage);
    return PopoverContentPage;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(384);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sign_in_sign_in__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_popover__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__ = __webpack_require__(310);
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
                __WEBPACK_IMPORTED_MODULE_7__pages_sign_in_sign_in__["a" /* SignInPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_popover__["a" /* PopoverContentPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/add-tab-modal/add-tab-modal.module#AddTabModalPageModule', name: 'AddTabModalPage', segment: 'add-tab-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sign-in/sign-in.module#SignInPageModule', name: 'SignInPage', segment: 'sign-in', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_sign_in_sign_in__["a" /* SignInPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_popover__["a" /* PopoverContentPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__["a" /* SocialSharing */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 186,
	"./af.js": 186,
	"./ar": 187,
	"./ar-dz": 188,
	"./ar-dz.js": 188,
	"./ar-kw": 189,
	"./ar-kw.js": 189,
	"./ar-ly": 190,
	"./ar-ly.js": 190,
	"./ar-ma": 191,
	"./ar-ma.js": 191,
	"./ar-sa": 192,
	"./ar-sa.js": 192,
	"./ar-tn": 193,
	"./ar-tn.js": 193,
	"./ar.js": 187,
	"./az": 194,
	"./az.js": 194,
	"./be": 195,
	"./be.js": 195,
	"./bg": 196,
	"./bg.js": 196,
	"./bm": 197,
	"./bm.js": 197,
	"./bn": 198,
	"./bn.js": 198,
	"./bo": 199,
	"./bo.js": 199,
	"./br": 200,
	"./br.js": 200,
	"./bs": 201,
	"./bs.js": 201,
	"./ca": 202,
	"./ca.js": 202,
	"./cs": 203,
	"./cs.js": 203,
	"./cv": 204,
	"./cv.js": 204,
	"./cy": 205,
	"./cy.js": 205,
	"./da": 206,
	"./da.js": 206,
	"./de": 207,
	"./de-at": 208,
	"./de-at.js": 208,
	"./de-ch": 209,
	"./de-ch.js": 209,
	"./de.js": 207,
	"./dv": 210,
	"./dv.js": 210,
	"./el": 211,
	"./el.js": 211,
	"./en-au": 212,
	"./en-au.js": 212,
	"./en-ca": 213,
	"./en-ca.js": 213,
	"./en-gb": 214,
	"./en-gb.js": 214,
	"./en-ie": 215,
	"./en-ie.js": 215,
	"./en-il": 216,
	"./en-il.js": 216,
	"./en-nz": 217,
	"./en-nz.js": 217,
	"./eo": 218,
	"./eo.js": 218,
	"./es": 219,
	"./es-do": 220,
	"./es-do.js": 220,
	"./es-us": 221,
	"./es-us.js": 221,
	"./es.js": 219,
	"./et": 222,
	"./et.js": 222,
	"./eu": 223,
	"./eu.js": 223,
	"./fa": 224,
	"./fa.js": 224,
	"./fi": 225,
	"./fi.js": 225,
	"./fo": 226,
	"./fo.js": 226,
	"./fr": 227,
	"./fr-ca": 228,
	"./fr-ca.js": 228,
	"./fr-ch": 229,
	"./fr-ch.js": 229,
	"./fr.js": 227,
	"./fy": 230,
	"./fy.js": 230,
	"./gd": 231,
	"./gd.js": 231,
	"./gl": 232,
	"./gl.js": 232,
	"./gom-latn": 233,
	"./gom-latn.js": 233,
	"./gu": 234,
	"./gu.js": 234,
	"./he": 235,
	"./he.js": 235,
	"./hi": 236,
	"./hi.js": 236,
	"./hr": 237,
	"./hr.js": 237,
	"./hu": 238,
	"./hu.js": 238,
	"./hy-am": 239,
	"./hy-am.js": 239,
	"./id": 240,
	"./id.js": 240,
	"./is": 241,
	"./is.js": 241,
	"./it": 242,
	"./it.js": 242,
	"./ja": 243,
	"./ja.js": 243,
	"./jv": 244,
	"./jv.js": 244,
	"./ka": 245,
	"./ka.js": 245,
	"./kk": 246,
	"./kk.js": 246,
	"./km": 247,
	"./km.js": 247,
	"./kn": 248,
	"./kn.js": 248,
	"./ko": 249,
	"./ko.js": 249,
	"./ky": 250,
	"./ky.js": 250,
	"./lb": 251,
	"./lb.js": 251,
	"./lo": 252,
	"./lo.js": 252,
	"./lt": 253,
	"./lt.js": 253,
	"./lv": 254,
	"./lv.js": 254,
	"./me": 255,
	"./me.js": 255,
	"./mi": 256,
	"./mi.js": 256,
	"./mk": 257,
	"./mk.js": 257,
	"./ml": 258,
	"./ml.js": 258,
	"./mn": 259,
	"./mn.js": 259,
	"./mr": 260,
	"./mr.js": 260,
	"./ms": 261,
	"./ms-my": 262,
	"./ms-my.js": 262,
	"./ms.js": 261,
	"./mt": 263,
	"./mt.js": 263,
	"./my": 264,
	"./my.js": 264,
	"./nb": 265,
	"./nb.js": 265,
	"./ne": 266,
	"./ne.js": 266,
	"./nl": 267,
	"./nl-be": 268,
	"./nl-be.js": 268,
	"./nl.js": 267,
	"./nn": 269,
	"./nn.js": 269,
	"./pa-in": 270,
	"./pa-in.js": 270,
	"./pl": 271,
	"./pl.js": 271,
	"./pt": 272,
	"./pt-br": 273,
	"./pt-br.js": 273,
	"./pt.js": 272,
	"./ro": 274,
	"./ro.js": 274,
	"./ru": 275,
	"./ru.js": 275,
	"./sd": 276,
	"./sd.js": 276,
	"./se": 277,
	"./se.js": 277,
	"./si": 278,
	"./si.js": 278,
	"./sk": 279,
	"./sk.js": 279,
	"./sl": 280,
	"./sl.js": 280,
	"./sq": 281,
	"./sq.js": 281,
	"./sr": 282,
	"./sr-cyrl": 283,
	"./sr-cyrl.js": 283,
	"./sr.js": 282,
	"./ss": 284,
	"./ss.js": 284,
	"./sv": 285,
	"./sv.js": 285,
	"./sw": 286,
	"./sw.js": 286,
	"./ta": 287,
	"./ta.js": 287,
	"./te": 288,
	"./te.js": 288,
	"./tet": 289,
	"./tet.js": 289,
	"./tg": 290,
	"./tg.js": 290,
	"./th": 291,
	"./th.js": 291,
	"./tl-ph": 292,
	"./tl-ph.js": 292,
	"./tlh": 293,
	"./tlh.js": 293,
	"./tr": 294,
	"./tr.js": 294,
	"./tzl": 295,
	"./tzl.js": 295,
	"./tzm": 296,
	"./tzm-latn": 297,
	"./tzm-latn.js": 297,
	"./tzm.js": 296,
	"./ug-cn": 298,
	"./ug-cn.js": 298,
	"./uk": 299,
	"./uk.js": 299,
	"./ur": 300,
	"./ur.js": 300,
	"./uz": 301,
	"./uz-latn": 302,
	"./uz-latn.js": 302,
	"./uz.js": 301,
	"./vi": 303,
	"./vi.js": 303,
	"./x-pseudo": 304,
	"./x-pseudo.js": 304,
	"./yo": 305,
	"./yo.js": 305,
	"./zh-cn": 306,
	"./zh-cn.js": 306,
	"./zh-hk": 307,
	"./zh-hk.js": 307,
	"./zh-tw": 308,
	"./zh-tw.js": 308
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
webpackContext.id = 442;

/***/ }),

/***/ 476:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 478:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_sign_in_sign_in__ = __webpack_require__(123);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_sign_in_sign_in__["a" /* SignInPage */];
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[363]);
//# sourceMappingURL=main.js.map