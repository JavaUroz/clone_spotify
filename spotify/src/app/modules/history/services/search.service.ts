import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly Url = environment.api
  constructor(private httpClient: HttpClient) { }

  searchTrucks$(term: string): Observable<any> {
    return this.httpClient.get(`${this.Url}/tracks?src=${term}`)
    .pipe(
      map((dataRaw: any) => dataRaw.data)
    )
  }
}
