import { Component, Input } from '@angular/core';
import { CardPlayerComponent } from "../card-player/card-player.component";
import { JsonPipe, NgClass, NgFor } from '@angular/common';
import { TracksModel } from '@core/models/tracks.model';

@Component({
    selector: 'app-section-generic',
    templateUrl: './section-generic.component.html',
    styleUrl: './section-generic.component.css',
    standalone: true,
    imports: [NgClass, NgFor, CardPlayerComponent]
})
export class SectionGenericComponent {
  @Input() title: string = ''
  @Input() mode: 'small' | 'big' = 'big'
  @Input() dataTracks: Array<TracksModel> = []
}
