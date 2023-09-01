import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { PortalOutlet, DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';

import { select, Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators'

import { Units } from 'src/app/shared/models/units.enum';
import { UnitSelectorComponent } from '../unit-selector/unit-selector.component';
import { Bookmark } from 'src/app/shared/models/bookmark.model'
import { CityWeather } from 'src/app/shared/models/weather.model';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selector';
import * as fromHomeActions from '../../state/home.actions'
import * as fromHomeSelectors from '../../state/homeSelectors'
import * as fromBookmarksSelectors from 'src/app/pages/bookmarks/state/bookmarks.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  cityWeather$: Observable<CityWeather>;
  cityWeather: CityWeather;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  
  searchControl: UntypedFormControl;
  bookmarksList$: Observable<Bookmark[]>;

  unit$: Observable<Units>;

  isCurrentFavorite$: Observable<boolean>;

  private componentDestroyed$ = new Subject();
  private portalOutlet: PortalOutlet;

  constructor(private store: Store,
              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) { }

  ngOnInit(): void {
    this.searchControl = new UntypedFormControl('', Validators.required);

    this.cityWeather$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeather));
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => this.cityWeather = value);
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError));

    this.bookmarksList$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarksList));

    this.isCurrentFavorite$ = combineLatest([this.cityWeather$, this.bookmarksList$])
      .pipe(
        map(([current, bookmarksList]) => {
          if (current) {
            return bookmarksList.some(bookmark => bookmark.id === current.city.id);
          }
          return false;
        }),
      );
      this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
      this.setupPortal();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromHomeActions.clearHomeState());
    this.portalOutlet.detach();
  }

  doSearch():void {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }))
  }
  
  onToggleBookmark() {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
    this.store.dispatch(fromHomeActions.toggleBookmark({ entity: bookmark }));
  }

  private setupPortal() {
    const el = document.querySelector('#navbar-portal-outlet');
    this.portalOutlet = new DomPortalOutlet(
      el,
      this.componentFactoryResolver,
      this.appRef,
      this.injector,
    );
    this.portalOutlet.attach(new ComponentPortal(UnitSelectorComponent));
  }

}
