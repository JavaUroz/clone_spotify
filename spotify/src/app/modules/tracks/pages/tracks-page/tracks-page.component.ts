import { Component, Input } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { Subscription } from 'rxjs';
import { SectionGenericComponent } from '../../../../shared/components/section-generic/section-generic.component';
import { getAllRandom$, getAlltracks$ } from '@modules/tracks/services/trackv2.service';import { CommonModule } from '@angular/common';
;

@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrl: './tracks-page.component.css',
    standalone: true,
    imports: [SectionGenericComponent, CommonModule]
})
export class TracksPageComponent {
  @Input() currentUser: any

  tracksTrending: Array<TracksModel> = []
  tracksRandom: Array<TracksModel> = []
  listObservers$: Array<Subscription> = []

  constructor(){
    getAlltracks$().subscribe((response: TracksModel[]) => {
      this.tracksTrending = response
    })

    getAllRandom$().subscribe((response: TracksModel[]) => {
      this.tracksRandom = response
    })
  }
}
