import { Injectable, EventEmitter } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { BehaviorSubject, min, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement // 'audio!' no es inicializada y su tipo es <audio> en HTML
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('pause')
  
  constructor() {
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOk =>{
      if(responseOk){
        this.setAudio(responseOk)
      }      
    })
    this.listenAllEvents()
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing',this.setPlayerStatus, false)
    this.audio.addEventListener('play',this.setPlayerStatus, false)
    this.audio.addEventListener('pause',this.setPlayerStatus, false)
    this.audio.addEventListener('ended',this.setPlayerStatus, false)
  }

  private setPlayerStatus = (state: any) => {
    console.log('setPlayerStatus', state)
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('pause')
        break
    }
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
  }

  private setTimeElapsed(currentTime:number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = ((minutes < 10) ? `0${minutes}` : minutes)

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(currentTime: number, duration: number) {
    let leftTime = duration - currentTime

    let seconds = Math.floor(leftTime % 60)
    let minutes = Math.floor((leftTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = ((minutes < 10) ? `0${minutes}` : minutes)

    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)

  }

  public setAudio(track: TracksModel): void {
    console.log('Informacion de data desde Servicio', track)
    this.audio.src = track.url
    this.audio.play()
  }

  public tooglePlayer():void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }
}
