import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet, NgIf, NgClass } from '@angular/common';
import { destroyCustom } from '@core/utils/destroyCustom';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.css'],
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass]
})
export class MediaPlayerComponent {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'

  multimediaService = inject(MultimediaService)

  destroyCustom = destroyCustom()
  
  constructor() {
    effect(()=>{
      const state = this.multimediaService.playerStatusSignal()
      this.state = state
    })
  }

  handlePosition(event: MouseEvent): void {
    const elementNative: HTMLElement = this.progressBar.nativeElement
    const {x, width} = elementNative.getBoundingClientRect()
    const {clientX} = event
    const click = clientX - x
    const percentageClicked = click * 100 / width
    this.multimediaService.seekAudio(percentageClicked)
  }
}
