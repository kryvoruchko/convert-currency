import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { GetCurrenciesList } from 'src/app/store/actions/convert.actions';
import { IAppState } from 'src/app/store/state/app.state';
import { IConvertParams } from '../../interfaces/convert-params.interface';
import { IConvertResponse } from '../../interfaces/convert-response.interface';
import { IRequestSettings } from '../../interfaces/currencies-request-settings.interface';
import { ICurrency } from '../../interfaces/currency.interface';
import { ConvertService } from '../../services/convert.service';

@Component({
  selector: 'app-convert-dashboard',
  templateUrl: './convert-dashboard.component.html',
  styleUrls: ['./convert-dashboard.component.scss']
})
export class ConvertDashboardComponent implements OnInit, OnDestroy {
  public data: Observable<(ICurrency)[]> = of([]);
  public columns: string[] = ['id', 'value'];
  public filters: IRequestSettings;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
    private readonly convertService: ConvertService,
  ) {
    this.store.dispatch(new GetCurrenciesList());
  }

  ngOnInit(): void {}

  public changeFilters(filters): void {
    this.filters = filters;

    (filters.startDate || filters.endDate) ?
      this.getCurrenciesByDate(filters) :
      this.getLatestData(filters);
  }

  private getLatestData(filters: IConvertParams): void {
    if (this.columns.length === 3) {
      this.columns.slice(-1, 1);
    }

    this.subscriptions.add(
      this.convertService.getLatest(filters)
        .subscribe(data => {
          this.createData(data.rates);
        })
    );
  }

  private getCurrenciesByDate(filters: IRequestSettings): void {
    let dateLink = `${filters.startDate}`;
    if (filters.endDate) {
      dateLink = `${dateLink}..${filters.endDate}`
      if (this.columns.length !== 3) {
        this.columns = [...this.columns, 'date'];
      }
    }

    this.subscriptions.add(
      this.convertService.getCurrenciesByDate(dateLink, { from: filters.from, to: filters.to })
        .subscribe(data => {
          this.createData(data.rates);
        })
    );
  }

  private createData(data: IConvertResponse): void {
    const items = [];
    for (let key in data) {
      if (typeof data[key] === 'object') {
        for (let subKey in data[key]) {
          items.push({ id: subKey, value: data[key][subKey], date: key });
        }
      } else {
        items.push({ id: key, value: data[key] });
      }
    }
    this.data = of(items);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
