import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor { //Inyectar propiedades a las peticiones (colocarlas, quitarlas o parsear informacion)
  constructor (private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // la funcion agarra toda la propiedad del request, la agarro para manipularla, y la devuelvo 
    try{
      const token = this.cookieService.get('token') // obtener token de cockieService inyectado en el contructor
      let newRequest = req.clone( // voy a clonar el request original
        {
          setHeaders: {
            authorization:`Bearer ${token}` // le asigno a la propiedad el token.
          } // asignar encabezado y colocarle authorization: Bearer TOKEN como propiedad
        }
      )
      return next.handle(newRequest)
    } catch(err) {
      console.log('Error con InjectSession!', err)
      return next.handle(req)
    }
  }
}