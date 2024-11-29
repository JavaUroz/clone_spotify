import { Injectable, EventEmitter, signal, effect } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();
  public audio!: HTMLAudioElement
  public trackInfoSignal = signal<TracksModel | undefined>(undefined)
  public timeElapsedSignal = signal<string>('00:00')
  public timeRemainingSignal = signal<string>('-00:00')
  public playerStatusSignal = signal<string>('paused')
  public playerPercentageSignal = signal<number>(0)

  constructor() {
    this.audio = new Audio()

    effect(()=>{
      const dataInfo = this.trackInfoSignal()
      console.log('desde signal reproduciendo en lugar de una suscripcion: ',dataInfo)
      if(dataInfo) this.setAudio(dataInfo)
    })
    // this.trackInfo$.subscribe(responseOk =>{
    //   if(responseOk){
    //     this.setAudio(responseOk)
    //   }      
    // })
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
    switch (state.type) {
      case 'play':
        this.playerStatusSignal.set('play')
        break
      case 'playing':
        this.playerStatusSignal.set('playing')
        break
      case 'ended':
        this.playerStatusSignal.set('ended')
        break
      default:
        this.playerStatusSignal.set('paused')
        break
    }
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setTimeElapsed(currentTime:number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = ((minutes < 10) ? `0${minutes}` : minutes)

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsedSignal.set(displayFormat)
  }

  private setTimeRemaining(currentTime: number, duration: number) {
    let leftTime = duration - currentTime

    let seconds = Math.floor(leftTime % 60)
    let minutes = Math.floor((leftTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = ((minutes < 10) ? `0${minutes}` : minutes)

    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemainingSignal.set(displayFormat)

  }

  public setAudio(track: TracksModel): void {
    this.audio.src = track.url
    this.audio.play()
  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = currentTime * 100 / duration
    this.playerPercentageSignal.set(percentage)
  }

  public tooglePlayer():void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage:number):void{
    const {duration} = this.audio
    const percentageToSeconds = duration * percentage / 100
    this.audio.currentTime = percentageToSeconds
  }
}
