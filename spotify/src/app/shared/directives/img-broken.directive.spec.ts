import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

//Componente de prueba
@Component({
  template:'<img appImgBroken [src]="srcMock" class="testing-directive">'
})
class TestComponent {
  public srcMock: any = null
}

describe('ImgBrokenDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[
        TestComponent,
        ImgBrokenDirective
      ]
    })

    fixture = TestBed.createComponent(TestComponent)
    fixture.detectChanges()
    component = fixture.componentInstance
  })

  it('should create an instance', () => {
    const mockElement = new ElementRef('')
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });

  it('TestComponent should be instanced correctly', () => {
    expect(component).toBeTruthy
  })

  it('Directive should change the image broken to default image base64', (done: DoneFn) => {
    //Arrange
    const beforeImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement
    const beforeImgSrc = beforeImgElement.src
    component.srcMock = undefined

    setTimeout(() => {
      const afterImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement
      const afterImgSrc = afterImgElement.src

      expect(afterImgSrc).toMatch(/\bdata:image\b/)
      done()
    }, 3000)

    //Act

    //Assert
  })
});
