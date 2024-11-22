import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SideBarComponent } from '../../../../shared/components/side-bar/side-bar.component';
import { MediaPlayerComponent } from '../../../../shared/components/media-player/media-player.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    standalone: true,
    imports: [SideBarComponent, MediaPlayerComponent, RouterOutlet]
})
export class HomePageComponent {

}