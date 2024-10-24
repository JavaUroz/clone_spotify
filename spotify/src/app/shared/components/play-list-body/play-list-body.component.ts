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
  optionSort:{property:string | null, order: string} = {property: null, order: 'asc'}

  constructor() { }

  ngOnInit(){
    const { data }: any = (dataRaw as any).default
    this.tracks = data
  }

  changeSort(property: string): void {
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort)
  }
}
