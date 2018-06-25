// import * as lskeys from './../localstorage.items';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (window.sessionStorage.getItem('token')) {
            console.log('nope'); // e.g. if token exists, otherwise use incomming request.
            return next.handle(req.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }
            }));
        } else {
            return next.handle(req);
        }
    }
}