import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HomeComponent } from './containers/home/home.component';
import { HomeEffects } from './state/home.effects';
import { homeReducer } from './state/home.reducer';
import { UnitSelectorComponent } from './containers/unit-selector/unit-selector.component';


@NgModule({
  declarations: [ HomeComponent, CurrentWeatherComponent, UnitSelectorComponent,],
  imports: [
    CommonModule,
    ComponentsModule,
    EffectsModule.forFeature([HomeEffects]),
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('home', homeReducer),
    MatButtonToggleModule
  ]
})
export class HomeModule { }
