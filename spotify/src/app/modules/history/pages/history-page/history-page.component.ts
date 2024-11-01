import { Component, OnInit } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent implements OnInit {
  listResults: TracksModel[] = []
  constructor(private searchService: SearchService){}

  ngOnInit(): void {
    
  }

  receiveData(event: string): void {
    this.searchService.searchTrucks$(event).subscribe(({ data }) => {
      this.listResults = data
      console.log('--------->  ', data)
    })
  }
}
