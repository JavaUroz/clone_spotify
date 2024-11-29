//import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"
import { CookieService } from "ngx-cookie-service"

export const currentUser = (): {[key:string]:string} => {
    const cookieService = inject(CookieService)
    const token = cookieService.get('token') as string

    //inject(HttpClient).get(`/api`) podria pasar el token por el body del endpoint

    return {email: 'javito@contact.com', id: '123', role: 'admin', token}
}