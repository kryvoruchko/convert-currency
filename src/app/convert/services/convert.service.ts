import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConvertParams } from '../interfaces/convert-params.interface';
import { ICurencyRequest } from '../interfaces/currency-request.interface';
import { IRequestSettings } from '../interfaces/currencies-request-settings.interface';
import { IConvertResponse } from '../interfaces/convert-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {
  private url = environment.apiURL;

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getCurrencies(): Observable<ICurencyRequest[]> {
    return this.http.get<ICurencyRequest[]>(`${this.url}/currencies`);
  }

  public getLatest(filters: IConvertParams): Observable<IConvertResponse> {
    const params = this.getHttpParams(filters);
    return this.http.get<IConvertResponse>(`${this.url}/latest`, { params });
  }

  public getCurrenciesByDate(date: string, filters?: IRequestSettings): Observable<IConvertResponse> {
    const params = this.getHttpParams(filters);
    return this.http.get<IConvertResponse>(`${this.url}/${date}`, { params });
  }

  private getHttpParams(filters): HttpParams {
    let params = new HttpParams();
    for (let k in filters) {
      if (filters[k]) {
        params = params.append(k, filters[k]);
      }
    }

    return params;
  }
}
