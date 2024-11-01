import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http'; 
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';


@NgModule({
  declarations: [
    TracksPageComponent
   ],
  imports: [
    CommonModule,
    TracksRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class TracksModule { }
