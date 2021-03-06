import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchService } from '../apikey.service';
import { ApikeyDatabase, CacheContentDatabase} from '../apikey.database';
import {CacheContent} from '../apikey';   //need change




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
  cacheContent: CacheContent
  cacheContentArray: any

  constructor(private activatedRouter: ActivatedRoute, private searchSvc: SearchService,
     private apikeydb: ApikeyDatabase, private cachecontentdb: CacheContentDatabase) { }

  ngOnInit(): void {

    this.country = this.activatedRouter.snapshot.params['country']

    this.apikeydb.getApikey()
    .then(res =>{
    this.apikey = res[0].apikey
    

    

    this.searchSvc.getResult(this.country, this.apikey)
      .then(res => {
        this.searchContent = res.articles
        for(let b of this.searchContent){
        this.cacheContent = {
          title: b.title,
          source: b.source.name,
          author: b.author,
          description: b.description,
          url: b.url,
          imageurl: b.urlToImage,
          publishedAt: b.publishedAt,
          content: b.content
        }
        // this.cachecontentdb.addCache(this.cacheContent)
      }
        console.log(this.searchContent)
      })
      .catch(e=> console.log(e, 'Check your API Key!'))
  })
  }
}
