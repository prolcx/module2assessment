import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()

export class ApiService {


    constructor(private http: HttpClient){}

    async getCountry(): Promise<any> {
        return await this.http.get<any>('https://restcountries.eu/rest/v2/all')
          .toPromise()
      }
    
}

@Injectable()

export class SearchService {


    constructor(private http: HttpClient){}

    async getResult(country: string, apikey: string): Promise<any> {
        

        return await this.http.get<any>(`https://newsapi.org/v2/top-headlines?country=${country.toLowerCase()}&apikey=${apikey}`)
        .toPromise()
    }

}



