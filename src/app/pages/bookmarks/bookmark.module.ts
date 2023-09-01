
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BookmarksComponent } from './container/bookmarks/bookmarks.component';
import { bookmarkReducer } from './state/bookmarks.reducer';
import { BookmarksEffects } from './state/bookmarks.effects';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    EffectsModule.forFeature([BookmarksEffects]),
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('bookmarks', bookmarkReducer),
  ],
  declarations: [
    BookmarksComponent,
  ],
})
export class BookmarkModule {
}
