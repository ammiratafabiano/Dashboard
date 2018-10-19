webpackJsonp([0],{

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddTabModalPageModule", function() { return AddTabModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_tab_modal__ = __webpack_require__(514);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddTabModalPageModule = /** @class */ (function () {
    function AddTabModalPageModule() {
    }
    AddTabModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_tab_modal__["a" /* AddTabModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_tab_modal__["a" /* AddTabModalPage */]),
            ],
        })
    ], AddTabModalPageModule);
    return AddTabModalPageModule;
}());

//# sourceMappingURL=add-tab-modal.module.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTabModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AddTabModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddTabModalPage = /** @class */ (function () {
    function AddTabModalPage(alertCtrl, view, http) {
        this.alertCtrl = alertCtrl;
        this.view = view;
        this.http = http;
    }
    AddTabModalPage.prototype.ionViewDidLoad = function () {
        this.getTabList();
    };
    AddTabModalPage.prototype.getTabList = function () {
        var _this = this;
        this.http.get("http://127.0.0.1:8080/available")
            .subscribe(function (data) {
            _this.availableTabs = data;
            console.log(data);
            document.getElementById("tabChoice").style.display = "block";
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: "I'm sorry. Server problems.",
                buttons: [
                    {
                        text: 'Ok',
                        role: 'cancel',
                        handler: function () {
                            _this.closeModal();
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    AddTabModalPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    AddTabModalPage.prototype.addTab = function () {
        var _this = this;
        if (this.newTabValue != undefined) {
            var selectedUrl = this.newTabValue;
            var selectedSource = this.availableTabs.filter(function (x) { return x.url == _this.newTabValue; })[0].source;
            var selectedDescription = this.availableTabs.filter(function (x) { return x.url == _this.newTabValue; })[0].description;
            /*var selectedChartOptions = [];
            var selectedDetailsOptions = [];
            var temp;
            if (this.availableTabs.filter(x => x.url == this.newTabValue)[0].chart != undefined)
              selectedChartOptions = this.availableTabs.filter(x => x.url == this.newTabValue)[0].chartOptions;
      
            if (this.availableTabs.filter(x => x.url == this.newTabValue)[0].details != undefined)
              selectedDetailsOptions = this.availableTabs.filter(x => x.url == this.newTabValue)[0].details.detailsOptions;
            */
            var temp = { url: selectedUrl, source: selectedSource, description: selectedDescription /*, chartOptions: selectedChartOptions, detailsOptions: selectedDetailsOptions*/ };
            this.view.dismiss(temp);
        }
    };
    AddTabModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-tab-modal',template:/*ion-inline-start:"/Users/fabianoammirata/Dashboard/src/pages/add-tab-modal/add-tab-modal.html"*/'<!--\n  Generated template for the AddTabModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add a tab</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="closeModal();">Close</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div id="tabChoice">\n    <ion-item>\n      <ion-label>Tab\'s name</ion-label>\n      <ion-select okText="Select" cancelText="Cancel" [(ngModel)]="newTabValue">\n        <ion-option *ngFor="let options of availableTabs" [value] = "options.url">{{options.description}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <button ion-button color="danger" (click)="addTab();">Confirm</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/fabianoammirata/Dashboard/src/pages/add-tab-modal/add-tab-modal.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _c || Object])
    ], AddTabModalPage);
    return AddTabModalPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=add-tab-modal.js.map

/***/ })

});
//# sourceMappingURL=0.js.map