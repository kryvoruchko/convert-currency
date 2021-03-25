import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICurrency } from '../../interfaces/currency.interface';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.scss']
})
export class CurrenciesListComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: (ICurrency)[];
  @Input() displayedColumns: string[] = [];

  public columnsToDisplay: string[] = this.displayedColumns.slice();
  public dataSource = new MatTableDataSource([]);

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['displayedColumns'] &&
      changes['displayedColumns'].currentValue
    ) {
      this.columnsToDisplay = this.displayedColumns.slice();
    }

    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
      this.dataSource.sort = this.sort;
    }
  }
}
