import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly url = environment.api;

  constructor(private httpClient: HttpClient) {    
  }

  private skipById(listTracks: TracksModel[], id: number): Promise<TracksModel[]>{
    return new Promise ((resolve, reject) =>{
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  getAlltracks$(): Observable<any>{
    return this.httpClient.get(`${this.url}/tracks`)
    .pipe(
      map(({data}: any) => {
        return data
      })
    )
  }

  getAllRandom$(): Observable<any>{    
    return this.httpClient.get(`${this.url}/tracks`)
    .pipe(
      tap(data => console.log('💝💝💝💝', data)),
      mergeMap(({data}: any) => this.skipById(data, 2)),
      tap(data => console.log('😃', data)),
      catchError(err => {
        const {status, statusText} = err
        console.log('🔴🔴🔴 algo pasó', [status, statusText])
        return of ([])
      })
    )
  }
}
