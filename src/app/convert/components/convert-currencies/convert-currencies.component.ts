import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getCurrenciesList } from 'src/app/store/selectors/convert.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { IConvertParams } from '../../interfaces/convert-params.interface';
import { ICurrency } from '../../interfaces/currency.interface';
import { ConvertService } from '../../services/convert.service';

@Component({
  selector: 'app-convert-currencies',
  templateUrl: './convert-currencies.component.html',
  styleUrls: ['./convert-currencies.component.scss']
})
export class ConvertCurrenciesComponent implements OnInit, OnDestroy {
  public rates: {[key: string]: string};
  public form = this.fb.group({
    amount: [1, [Validators.required]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
  });
  public params: IConvertParams;
  public currencies$: Observable<ICurrency[]> = of([]);

  private notifier = new Subject();

  constructor(
    private convertService: ConvertService,
    private fb: FormBuilder,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.currencies$ = this.store.pipe(select(getCurrenciesList));
  }

  public convertCurrencies(): void {
    if (this.form.valid) {
      this.params = this.form.value;

      this.convertService.getLatest(this.params)
        .pipe(takeUntil(this.notifier))
        .subscribe(response => {
          this.rates = response.rates;
        })
    }
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
