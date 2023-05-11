import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService} from './in-memory-data.service';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { FormsModule } from '@angular/forms';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CharacterSearchComponent } from './character-search/character-search.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterDetailComponent,
    MessagesComponent,
    DashboardComponent,
    CharacterSearchComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    )
  ],
  
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
