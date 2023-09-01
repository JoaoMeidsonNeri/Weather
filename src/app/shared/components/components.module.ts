import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { DetailedWeatherComponent } from './detailed-weather/detailed-weather.component';
import { LoaderComponent } from './detailed-weather/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    DetailedWeatherComponent,
    LoaderComponent
  ],
  exports: [
    DetailedWeatherComponent, LoaderComponent
  ]
})
export class ComponentsModule {
}
