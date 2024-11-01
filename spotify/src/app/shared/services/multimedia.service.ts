import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  myObservable$: Observable<any> = new Observable() // requiere de un Observer que va dentro del Observable
  mySubject$: Subject<any> = new Subject() // similar al Orservable pero es Observable y Observer a la vez
  myBehaviorSubject$: BehaviorSubject<any> = new BehaviorSubject('💦') // necesita inicializarse y al inicializarse ya evita el problema de los ciclos de vida y tambien son Observable y Observer a la vez.

  constructor() {
    //:::BehaviorSubject:::
    setTimeout(() => { // se ejecutará 3 veces, en su inicializacion y estos...
      this.myBehaviorSubject$.next('💦')
    }, 1000)
    setTimeout(() => {
      this.myBehaviorSubject$.error('💦')
    }, 3000)

    //:::Subject:::
    setTimeout(() => { // notar que en MediaPlayerComponent donde se ejecuta la funcion, lo hace en ngOnInit()=> este es el primer hook en ejecutarse y lo hace antes del contructor donde se inicializa el multimediaService
      this.mySubject$.next('💦') // Subject permite utilizar el metodo (ex. next()) en la misma variable
    }, 1000) // entonces despues de 1 segundo da tiempo al constructor a ejecutarse antes del ngOnInit y permite la ejecución del Subject
    setTimeout(() => {
      this.mySubject$.next('💦')
    }, 2000)
    setTimeout(() => {
      this.mySubject$.error('💦')
    }, 3000)

    //:::Observable:::
    this.myObservable$ = new Observable( // se declara el Observable
      (observer:Observer<any>) => { // declara Observer
        observer.next('💦') // metodos del Observer
        setTimeout(() => {
          observer.complete()
        }, 1500)
        setTimeout(() => {
          observer.next('💦')
        }, 2500)
        setTimeout(() => {
          observer.error('💦')
        }, 3500)
      }
    )
  }

  private listenAllEvents(): void {

  }
}
