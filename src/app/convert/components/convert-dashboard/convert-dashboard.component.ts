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
import { GroupBy } from '../currencies-list/currencies-list.component';

@Component({
  selector: 'app-convert-dashboard',
  templateUrl: './convert-dashboard.component.html',
  styleUrls: ['./convert-dashboard.component.scss']
})
export class ConvertDashboardComponent implements OnInit, OnDestroy {
  public data: Observable<(ICurrency | GroupBy)[]> = of();
  public columns: string[] = [];
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
    }

    this.subscriptions.add(
      this.convertService.getCurrenciesByDate(dateLink, { from: filters.from, to: filters.to })
        .subscribe(data => {
          this.filters.endDate ?
            this.createDateWithGroup(data.rates):
            this.createData(data.rates);
        })
    );
  }

  private createData(data: IConvertResponse): void {
    const items = [];
    for (let k in data) {
      items.push({ id: k, value: data[k] });
    }
    this.data = of(items);
  }

  private createDateWithGroup(data: IConvertResponse): void {
    const items = [];
    for (let key in data) {
      items.push({ initial: key, isGroupBy: true });
      
      for (let subKey in data[key]) {
        items.push({ id: subKey, value: data[key][subKey] });
      }
    }
    this.data = of(items);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
