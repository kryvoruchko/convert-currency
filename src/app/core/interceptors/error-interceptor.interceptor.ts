import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private _snackBar: MatSnackBar
  ) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Something went wrong!', null,
          {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );

        return EMPTY;
      })
    );
  }
}
