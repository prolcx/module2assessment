import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list.component';
import { ApikeyComponent } from './components/apikey.component';
import { DetailComponent } from './components/detail.component';
import { MainComponent } from './components/main.component';
import { ApiService, SearchService } from './apikey.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { ApikeyDatabase, CountrylistDatabase, CacheContentDatabase } from './apikey.database';

const ROUTES: Routes = [
  {path:'', component: MainComponent},
  {path:'countrylist', component: CountryListComponent},
  {path:'apikey', component: ApikeyComponent},
  {path:'countrylist/:country', component: DetailComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
  // include the search/genre/q (using params) way

]

@NgModule({
  declarations: [ //here
    AppComponent,
    CountryListComponent,
    ApikeyComponent,
    DetailComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApikeyDatabase,CacheContentDatabase, CountrylistDatabase, ApiService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
