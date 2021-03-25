import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrency } from '../../interfaces/currency.interface';

export interface GroupBy {
  initial: string;
  isGroupBy: boolean;
}

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.scss']
})
export class CurrenciesListComponent implements OnInit {
  @Input() data: Observable<(ICurrency | GroupBy)[]>;

  public displayedColumns: string[] = ['id', 'value'];
  public columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor() {}

  ngOnInit(): void {}

  public isGroup(index, item): boolean{
    return item.isGroupBy;
  }
}
