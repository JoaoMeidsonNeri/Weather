import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/shared/state/app.reducer'
import { CityDailyWeather } from 'src/app/shared/models/weather.model';
import { Units } from 'src/app/shared/models/units.enum';
import * as fromDetailsActions from '../state/details.actions'
import * as fromConfigSelectors from '../../../../shared/state/config/config.selector';
import * as fromDetailsSelectors from '../state/details.selectors'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details$: Observable<CityDailyWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>
  unit$: Observable<Units>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());
    this.details$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsEntity));
    this.error$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsError));
    this.loading$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsLoading));
    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
  }

}
