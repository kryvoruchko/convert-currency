import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { DEFAULT_FROM_CURRENCY } from 'src/app/core/constants/convert.constants';
import {
  clearCurrencySettings,
  setCurrencySettingsDate,
  setFromCurrency,
  setToCurrency
} from 'src/app/store/actions/convert.actions';
import { getCurrenciesList } from 'src/app/store/selectors/convert.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { ICurrency } from '../../interfaces/currency.interface';

@Component({
  selector: 'app-convert-nav-actions',
  templateUrl: './convert-nav-actions.component.html',
  styleUrls: ['./convert-nav-actions.component.scss']
})
export class ConvertNavActionsComponent implements OnInit, OnDestroy {
  public currencies$: Observable<ICurrency[]> = of([]);
  public today = new Date();
  public actionsForm = this.fb.group({
    startDate: [null],
    endDate: [null],
    from: [DEFAULT_FROM_CURRENCY],
    to: [''],
  });

  private notifier = new Subject();

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.currencies$ = this.store.select(getCurrenciesList);
  }

  public changeCurrency(val: MatOptionSelectionChange, mode: string): void {
    if (val.isUserInput) {
      this[mode] = val.source.value;

      switch(mode) {
        case 'from':
          this.store.dispatch(setFromCurrency({ from: val.source.value }));
          break;
        case 'to':
          this.store.dispatch(setToCurrency({ to: val.source.value }));
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

    this.store.dispatch(setCurrencySettingsDate(
      {
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

    this.store.dispatch(clearCurrencySettings());
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}
