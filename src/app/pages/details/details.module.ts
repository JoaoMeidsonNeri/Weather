import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DailyWeatherComponent } from './components/daily-weather/daily-weather.component';
import { DetailsComponent } from './containers/details/details.component';
import { DetailsGuard } from './containers/services/details.guard';
import { detailsReducer } from './containers/state/details.reducer';
import { DetailsEffects } from './containers/state/details.effects';



@NgModule({
  declarations: [DailyWeatherComponent, DetailsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    EffectsModule.forFeature([DetailsEffects]),
    RouterModule.forChild([
      {path: '', component: DetailsComponent, canActivate: [DetailsGuard]}
    ]),
    StoreModule.forFeature('details', detailsReducer),

  ],
  providers: [
    DetailsGuard
  ]
})
export class DetailsModule { }
