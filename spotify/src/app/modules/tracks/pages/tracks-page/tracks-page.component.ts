import { Component, OnDestroy, OnInit } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TracksModel> = []
  tracksRandom: Array<TracksModel> = []
  listObservers$: Array<Subscription> = []
  
  constructor(private trackService: TrackService) { 
    
  }

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
  }
  //una forma de cargar datos desde una promesa
  async loadDataAll(): Promise<any>{
    this.tracksTrending = await this.trackService.getAlltracks$().toPromise()
    
  }
  // otra forma desde un subscribe
  loadDataRandom(): void{
    this.trackService.getAllRandom$()
      .subscribe((response: TracksModel[]) => {
        this.tracksRandom = response
    })
  }

  ngOnDestroy(): void {

  }
}
