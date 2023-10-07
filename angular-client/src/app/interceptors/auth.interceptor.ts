import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationServices } from "../core/services/authentication.services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationServices) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders()
            .append('Authorization', `Bearer ${this.authenticationService.getToken()}`);
        const modifiedReq = req.clone({ headers });

        return next.handle(modifiedReq);
    }
}