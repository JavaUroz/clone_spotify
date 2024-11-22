import { Component } from '@angular/core';

import { PlayListHeaderComponent } from '../../../../shared/components/play-list-header/play-list-header.component';
import { PlayListBodyComponent } from '../../../../shared/components/play-list-body/play-list-body.component';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [PlayListHeaderComponent, PlayListBodyComponent],
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.css'
})
export class FavoritePageComponent {

}
