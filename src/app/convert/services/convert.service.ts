import { Injectable } from '@angular/core';
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

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getCurrencies(): Observable<ICurencyRequest[]> {
    return this.http.get<ICurencyRequest[]>(`/currencies`);
  }

  public getLatest(filters: IConvertParams): Observable<IConvertResponse> {
    const params = _.pickBy(filters, _.identity);
    return this.http.get<IConvertResponse>(`/latest`, { params });
  }

  public getCurrenciesByDate(date: string, filters?: IRequestSettings): Observable<IConvertResponse> {
    const params = _.pickBy(filters, _.identity);
    return this.http.get<IConvertResponse>(`/${date}`, { params });
  }
}
