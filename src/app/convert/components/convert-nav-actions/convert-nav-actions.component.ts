import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DEFAULT_FROM_CURRENCY } from 'src/app/core/constants/convert.constants';
import {
  ClearCurrencySettings,
  SetCurrencySettingsDate,
  SetFromCurrency,
  SetToCurrency
} from 'src/app/store/actions/convert.actions';
import { getCurrenciesList, getConvertSetttings } from 'src/app/store/selectors/convert.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { IRequestSettings } from '../../interfaces/currencies-request-settings.interface';
import { ICurrency } from '../../interfaces/currency.interface';

@Component({
  selector: 'app-convert-nav-actions',
  templateUrl: './convert-nav-actions.component.html',
  styleUrls: ['./convert-nav-actions.component.scss']
})
export class ConvertNavActionsComponent implements OnInit, OnDestroy {
  @Output() onChangeFilters: EventEmitter<IRequestSettings> = new EventEmitter<IRequestSettings>();

  public currencies: ICurrency[] = [{ id: '', value: 'None' }];
  public today = new Date();
  public actionsForm = this.fb.group({
    startDate: [null],
    endDate: [null],
    from: [DEFAULT_FROM_CURRENCY],
    to: [''],
  });

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.pipe(select(getCurrenciesList))
        .subscribe(currencies => { 
          this.currencies = this.currencies.concat(currencies);
        })
    );

    this.subscriptions.add(
      this.store.pipe(select(getConvertSetttings))
        .subscribe(settings => {
          this.onChangeFilters.emit(settings);
        })
    );
  }

  public changeCurrency(val: MatOptionSelectionChange, mode: string): void {
    if (val.isUserInput) {
      this[mode] = val.source.value;

      switch(mode) {
        case 'from':
          this.store.dispatch(new SetFromCurrency(val.source.value));
          break;
        case 'to':
          this.store.dispatch(new SetToCurrency(val.source.value));
          break;
        default:
          break;
      }
    }
  }

  public selectDate(): void {
    const start =
      this.actionsForm.value['startDate'] &&
      new Date(this.actionsForm.value['startDate']).toISOString().slice(0,10);

    const end =
      this.actionsForm.value['endDate'] &&
      new Date(this.actionsForm.value['endDate']).toISOString().slice(0,10);

    this.store.dispatch(new SetCurrencySettingsDate(
      {
        ...this.actionsForm.value,
        startDate: start,
        endDate: end
      }
    ));
  }

  public setDefaultSettings(): void {
    this.actionsForm.patchValue({
      startDate: null,
      endDate: null,
      from: DEFAULT_FROM_CURRENCY,
      to: '',
    });

    this.store.dispatch(new ClearCurrencySettings());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
