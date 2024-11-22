import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';
import { OrderListPipe } from '../../pipe/order-list.pipe';

@Component({
    selector: 'app-play-list-body',
    templateUrl: './play-list-body.component.html',
    styleUrl: './play-list-body.component.css',
    standalone: true,
    imports: [NgFor, NgTemplateOutlet, ImgBrokenDirective, OrderListPipe]
})
export class PlayListBodyComponent implements OnInit{
  @Input() tracks: Array<TracksModel> = []
  optionSort:{property:string | null, order: string} = {property: null, order: 'asc'}

  constructor() { }

  ngOnInit(){

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
