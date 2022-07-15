import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conditional } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, throwError, tap} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Continent } from '../shared/continent';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public api_url:string  = "http://localhost:3000/continent/filterContinent";
  public filter_api:string = "http://localhost:3000/continent/filterContinent?"


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public loadData(): Observable<Continent>{
    return this.http
          .get<Continent>(this.api_url)
          .pipe(retry(1), catchError(this.errorHandl));
  }

  public filterData(code: string, name:string, keyword:string): Observable<Continent>{
    let filterdata = "code=" + code +"&name="+ name + "&keyword="+keyword;
    return this.http.get<Continent>(this.filter_api+filterdata);
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
