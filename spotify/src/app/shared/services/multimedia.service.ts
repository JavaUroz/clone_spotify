import { Injectable, EventEmitter } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement // 'audio!' no es inicializada y su tipo es <audio> en HTML
  
  constructor() {
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOk =>{
      if(responseOk){
        this.setAudio(responseOk)
      }      
    })
  }

  private listenAllEvents(): void {

  }

  public setAudio(track: TracksModel): void {
    console.log('Informacion de data desde Servicio', track)
    this.audio.src = track.url
    this.audio.play()
  }
}
