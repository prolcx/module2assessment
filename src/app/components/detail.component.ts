import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchService } from '../apikey.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  country =''
  apikey=''
  countryName=''
  searchContent: any

  constructor(private activatedRouter: ActivatedRoute, private searchSvc: SearchService) { }

  ngOnInit(): void {

    this.country = this.activatedRouter.snapshot.params['country']
    this.apikey = '93e1cad1ae284573bf1f8b640cdf25f5'


    this.searchSvc.getResult(this.country, this.apikey)
      .then(res => {
        this.searchContent = res.articles
        console.log(this.searchContent)
      })
      .catch(e=> console.log(e))
  }

}
