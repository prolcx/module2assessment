import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'

import {Apikey} from '../apikey';
import { ApikeyDatabase} from '../apikey.database';


@Component({
  selector: 'app-apikey',
  templateUrl: './apikey.component.html',
  styleUrls: ['./apikey.component.css']
})
export class ApikeyComponent implements OnInit {

  apiForm: FormGroup;
  apikeyContent: any

  constructor(private fb: FormBuilder, private apikeydb: ApikeyDatabase, private router: Router) { }

  ngOnInit(): void {
    this.apiForm = this.createApi()
  }

  private createApi(): FormGroup{
  return this.fb.group({
    apikey: this.fb.control('',[Validators.required])
  })
  }

  async storeApi(){                      

    const id = uuidv4().toString().substring(0,8,)
    const apikeyForDB = this.apiForm.value;
    console.log(this.apiForm.value)
    apikeyForDB.id = id;

    await this.apikeydb.addApikey(apikeyForDB)
    
    // await this.goToCountryList()
    this.apikeydb.getApikey()
    .then(res =>{
    this.apikeyContent = res
    console.log(this.apikeyContent)})

  }

  goToCountryList(){

    this.router.navigate(['/countrylist'])
  }

  deleteApi(){
    this.apikeydb.getApikey()
    .then(res =>{
    this.apikeyContent = res
    if(this.apikeyContent.length>0)
    this.apikeydb.deleteApikey(this.apikeyContent[0].id)
      
    console.info(this.apikeyContent)
  }).catch(e=> console.log(e))
  }


}


