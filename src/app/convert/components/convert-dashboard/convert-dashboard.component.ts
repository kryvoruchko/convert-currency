import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getCurrenciesList } from 'src/app/store/actions/convert.actions';
import { getConvertSetttings } from 'src/app/store/selectors/convert.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { IConvertResponse } from '../../interfaces/convert-response.interface';
import { IRequestSettings } from '../../interfaces/currencies-request-settings.interface';
import { ICurrency } from '../../interfaces/currency.interface';
import { ConvertService } from '../../services/convert.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-convert-dashboard',
  templateUrl: './convert-dashboard.component.html',
  styleUrls: ['./convert-dashboard.component.scss']
})
export class ConvertDashboardComponent implements OnInit, OnDestroy {
  public data$: Observable<(ICurrency)[]> = of([]);
  public columns: string[] = ['id', 'value'];
  public filters: IRequestSettings;

  private notifier = new Subject();

  constructor(
    private store: Store<IAppState>,
    private readonly convertService: ConvertService,
  ) {
    this.store.dispatch(getCurrenciesList());
  }

  ngOnInit(): void {
    this.store.select(getConvertSetttings)
      .pipe(takeUntil(this.notifier))
      .subscribe(settings => {
        this.filters = settings;
        (this.filters.startDate || this.filters.endDate) ?
          this.getCurrenciesByDate() :
          this.getLatestData();
      })
  }

  private getLatestData(): void {
    if (this.columns.length === 3) {
      this.columns.slice(-1, 1);
    }

    this.convertService.getLatest(this.filters)
      .pipe(takeUntil(this.notifier))
      .subscribe(data => {
        this.createData(data.rates);
      });
  }

  private getCurrenciesByDate(): void {
    let dateLink = `${this.filters.startDate}`;
    if (this.filters.endDate) {
      dateLink = `${dateLink}..${this.filters.endDate}`;

      if (this.columns.length !== 3) {
        this.columns = [...this.columns, 'date'];
      }
    }

    this.convertService.getCurrenciesByDate(dateLink, { from: this.filters.from, to: this.filters.to })
      .pipe(takeUntil(this.notifier))
      .subscribe(data => {
        this.createData(data.rates);
      });
  }

  private createData(data: IConvertResponse): void {
    const arr = _.map(data, (value, key) => {
      if (_.isPlainObject(value)) {
        return _.map(value, (val, id) => ({ id, value: val, date: key }));
      }
      return { id: key, value };
    });
    this.data$ = of(_.flattenDeep(arr));
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}
