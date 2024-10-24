import { Component, OnInit } from '@angular/core';
import * as dataRaw from "../../../../data/tracks.json"
import { TracksModel } from '@core/models/tracks.model';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-tracks-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit {
  mockTracksList: Array<TracksModel> = []
  
  constructor() { }

  ngOnInit(): void{
    const { data }: any =  (dataRaw as any).default
    this.mockTracksList = data
  } 
}
