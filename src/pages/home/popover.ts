import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
@Component({
  templateUrl: 'popover.html'
})

export class PopoverContentPage {
constructor(public viewCtrl: ViewController) {}
close(id) {
    this.viewCtrl.dismiss(id);
  }
}
