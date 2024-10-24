import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: 'img[appImgBroken]',
  //standalone: true
})
export class ImgBrokenDirective {
  @Input() customImg: string = ''
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement
    console.log('🔴 Esta imagen se rompió -->', this.elHost)
    //elNative.src = "../../../assets/images/img-broken.png"
    elNative.src = this.customImg
  }
  constructor(private elHost: ElementRef) {

   }

}
