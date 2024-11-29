import { HttpHandlerFn, HttpRequest } from "@angular/common/http"
import { inject } from "@angular/core"
import { CookieService } from "ngx-cookie-service"

export const authorizationInterceptor = (
    request: HttpRequest<any>, 
    next: HttpHandlerFn) => {
        const cookieService = inject(CookieService)

    try{
      const token = cookieService.get('token')
      let newRequest = request.clone(
        {
          setHeaders: {
            authorization:`Bearer ${token}`,
            VERSION_ANGULAR: '18'
          }
        }
      )
      return next(newRequest)
    } catch(err) {
      console.log('Error con InjectSession!', err)
      return next(request)
    }
}