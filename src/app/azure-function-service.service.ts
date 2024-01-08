import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { aidataitem } from './aidataitem';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AzureFunctionService {

  constructor(private http: HttpClient) { }

  private functionAppUrl = 'https://app-func-getdetails.azurewebsites.net/api/func-getdetails';
  
  private log(message: string) {
    console.log('AI Service: ' + message);
  }

  getDetails2(inputText: string): Observable<any> {
    const url = `${this.functionAppUrl}?input=${encodeURIComponent(inputText)}`;
    
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }


  getAIInformation(inputText: string): Observable<aidataitem> {

    const url = `${this.functionAppUrl}?input=${encodeURIComponent(inputText)}`;
    
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );

    // return this.http.get<any>(url).pipe(
    //   tap(_ => this.log(`fetched inputtext=${inputText}`)),
    //   catchError(this.handleError<aidataitem(`getAIInformation inputtext=${inputText}`))
    // );

  }


  getDetails(inputText: string): Observable<any> {
    const url = `${this.functionAppUrl}?input=${encodeURIComponent(inputText)}`;
        
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response.map((item: any) => {
            // Modify each item in the array if needed
            return item;
          });
        } else {
          // If it's not an array, you can perform other operations here
          return response;
        }
      })
    );
  }
}
