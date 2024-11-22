import { Component, Input, OnInit } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { NgIf, NgClass } from '@angular/common';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';

@Component({
    selector: 'app-card-player',
    // standalone: true,
    // imports: [NgIf, NgClass],
    templateUrl: './card-player.component.html',
    styleUrls: ['./card-player.component.css'],
    standalone: true,
    imports: [NgIf, NgClass, ImgBrokenDirective]
})
export class CardPlayerComponent implements OnInit {
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track: TracksModel = {_id:0,name:'',album:'',cover:'',url:''};

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
    
  }

  sendPlay(track: TracksModel):void{
    this.multimediaService.trackInfo$.next(track)
  }
}
