import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { SideBarComponent } from '@shared/components/side-bar/side-bar.component';
import { MediaPlayerComponent } from '@shared/components/media-player/media-player.component';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { of } from 'rxjs'

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterOutlet, RouterModule, HomePageComponent, SideBarComponent, MediaPlayerComponent],
    providers: [
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: { paramMap: new Map() },
                queryParams: of({}),
            }
        }
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
