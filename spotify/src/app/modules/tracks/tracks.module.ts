import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';

import { HttpClientModule } from '@angular/common/http'; 
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';


@NgModule({
    imports: [
    CommonModule,
    TracksRoutingModule,
    HttpClientModule,
    TracksPageComponent
]
})
export class TracksModule { }
