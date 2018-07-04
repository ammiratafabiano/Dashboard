import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTabModalPage } from './add-tab-modal';

@NgModule({
  declarations: [
    AddTabModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTabModalPage),
  ],
})
export class AddTabModalPageModule {}
