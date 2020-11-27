import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApikeyDatabase} from '../apikey.database';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  apikeyContent: any

  constructor(private apikeydb: ApikeyDatabase, private router: Router) { }

  ngOnInit(): void {
    
    this.apikeydb.getApikey()
    .then(res =>{
    this.apikeyContent = res

    if (this.apikeyContent.length<=0){
      this.router.navigate(['/apikey'])
    }
    
    else this.router.navigate(['/countrylist'])
    
    })
    .catch(e=> console.log(e))

    

    

  }

}
