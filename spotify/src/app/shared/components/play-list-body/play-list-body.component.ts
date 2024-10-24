import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dataRaw from '../../../data/tracks.json'
import { TracksModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-play-list-body',
  // standalone: true,
  // imports: [NgFor, NgTemplateOutlet],
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.css'
})
export class PlayListBodyComponent implements OnInit{
  tracks: Array<TracksModel> = []

  constructor() { }

  ngOnInit(){
    const { data }: any = (dataRaw as any).default
    this.tracks = data
  }
}
