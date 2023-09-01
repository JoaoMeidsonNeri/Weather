import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Units } from 'src/app/shared/models/units.enum';

import { DailyWeather, Weather } from 'src/app/shared/models/weather.model'
import { unitToSymbol } from 'src/app/shared/utils/units.util';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DailyWeatherComponent  {

  @Input() dailyWeather: DailyWeather;
  @Input() timeZone: string;
  @Input() unit: Units;

  get weather(): Weather {
    return this.dailyWeather.weather;
  }

  get date(): number {
    return this.dailyWeather.date * 1000;
  }

  get icon(): string {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
  }
  
  get unitSymbol() {
    return unitToSymbol(this.unit);
  }
  
  unixToHourMinute(value: number): number {
    return value * 1000;
  }

}
