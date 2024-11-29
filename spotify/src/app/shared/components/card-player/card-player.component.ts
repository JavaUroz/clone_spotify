import { Component, inject, Input } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { NgIf, NgClass } from '@angular/common';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';

@Component({
    selector: 'app-card-player',    
    templateUrl: './card-player.component.html',
    styleUrls: ['./card-player.component.css'],
    standalone: true,
    imports: [NgIf, NgClass, ImgBrokenDirective]
})
export class CardPlayerComponent {
  @Input({required: true}) mode: 'small' | 'big' = 'small';
  @Input({required: true}) track: TracksModel = {_id:0,name:'',album:'',cover:'',url:''};

  multimediaService = inject(MultimediaService)

  sendPlay(track: TracksModel):void{
    this.multimediaService.trackInfoSignal.set(track)
  }
}
