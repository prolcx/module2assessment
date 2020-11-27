import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'

import {Countrylist} from '../apikey';   //need change
import { CountrylistDatabase} from '../apikey.database';
import { ApiService } from '../apikey.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countryListResult: any
  countrylistArray: any


  constructor(private countrySvc: ApiService, private countrylistdb: CountrylistDatabase, private router: Router) { }

  ngOnInit(): void {

    this.countrylistdb.getCountrylist()
    .then(res =>{
      this.countrylistArray = res
      // console.log(this.countrylistArray)

    if (this.countrylistArray.length<=0){

    this.countrySvc.getCountry()
    .then(res =>{
      this.countryListResult = res
      // console.log(this.countryListResult)
      for (let a of this.countryListResult){
        
        const id = uuidv4().toString().substring(0,8,)
        const countryListForDB= {country: a.name, id: id, alpha: a.alpha2Code, flag: a.flag};

        this.countrylistdb.addCountry(countryListForDB)
        
      }
     })
    }

  })

}
}

