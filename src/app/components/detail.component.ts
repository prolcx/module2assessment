import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchService } from '../apikey.service';
import { ApikeyDatabase} from '../apikey.database';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  apikeyContent =''
  country =''
  apikey=''
  countryName=''
  searchContent: any

  constructor(private activatedRouter: ActivatedRoute, private searchSvc: SearchService, private apikeydb: ApikeyDatabase) { }

  ngOnInit(): void {

    this.country = this.activatedRouter.snapshot.params['country']

    this.apikeydb.getApikey()
    .then(res =>{
    this.apikey = res[0].apikey
    

    this.searchSvc.getResult(this.country, this.apikey)
      .then(res => {
        this.searchContent = res.articles
        console.log(this.searchContent)
      })
      .catch(e=> console.log(e, 'Check your API Key!'))
  })
  }
}
