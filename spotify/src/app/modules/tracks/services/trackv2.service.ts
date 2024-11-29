
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.api;

/**
 * Function Http Inject
 * @returns
 */
export const getAlltracks$ = (): Observable<any> => {
  return inject(HttpClient)
    .get(`${URL}/tracks`)
    .pipe(
      map(({data}: any) => {
        return data
      })
    );
};

/**
 * Function Http Inject
 * @returns
 */
export const getAllRandom$ = (): Observable<any> => { 
  return inject(HttpClient)
    .get(`${URL}/tracks`)
    .pipe(
      mergeMap(({data}: any) => skipById(data, 2)),
      catchError(() => of ([]))
    )
}

/**
 * @param listTracks
 * @param id
 * @returns
 */
export const skipById = (listTracks: TracksModel[], id: number): Promise<TracksModel[]> => {
  return new Promise ((resolve, reject) =>{
    const listTmp = listTracks.filter(a => a._id !== id)
    resolve(listTmp)
  })
}

export const getCurrentUser = ():string => {
  const cookieService = inject(CookieService)
  return cookieService.get('token')
}