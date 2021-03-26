import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConvertParams } from '../interfaces/convert-params.interface';
import { ICurencyRequest } from '../interfaces/currency-request.interface';
import { IRequestSettings } from '../interfaces/currencies-request-settings.interface';
import { IConvertResponse } from '../interfaces/convert-response.interface';
import * as _ from 'lodash';

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
    const params = _.pickBy(filters, _.identity);
    return this.http.get<IConvertResponse>(`${this.url}/latest`, { params });
  }

  public getCurrenciesByDate(date: string, filters?: IRequestSettings): Observable<IConvertResponse> {
    const params = _.pickBy(filters, _.identity);
    return this.http.get<IConvertResponse>(`${this.url}/${date}`, { params });
  }
}
