import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        LoginPageComponent
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Primer enunciado debe asegurar:
  ////Formulario invalido por datos erroneos
  it('Should return invalid form', () => {
    //Arrange
    const mockCredential = {
      email:'0@0',
      password: '111111111111111111'
    }

    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')

    //Act
    emailForm.setValue(mockCredential.email)
    passwordForm.setValue(mockCredential.password)

    //Assert
    expect(component.formLogin.invalid).toEqual(true);

  })

  ////Formulario valido por datos correctos
  it('Should return valid form', () => {
    //Arrange
    const mockCredential = {
      email:'test@test.com',
      password: '12345678'
    }

    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')

    //Act
    emailForm.setValue(mockCredential.email)
    passwordForm.setValue(mockCredential.password)

    //Assert
    expect(component.formLogin.invalid).toEqual(false);

  })

  it('button should show text "Iniciar sesión"', () =>{
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText

    expect(getInnerText).toEqual('Iniciar sesión')
  })
});
