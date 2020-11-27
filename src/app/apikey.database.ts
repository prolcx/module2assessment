import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {Apikey, Countrylist, CacheContent} from  './apikey';

@Injectable()

export class ApikeyDatabase extends Dexie {

    private apikey1: Dexie.Table<Apikey, string>;

    constructor(){
        super('apikeydb')

        this.version(1).stores({
            apikey: "id"
            // search: "++id,title"                          //number id base, need further study
        })

        this.apikey1 = this.table('apikey')
    }

    async addApikey(a: Apikey): Promise<any> {
        a.apikey = a.apikey.trim().toLowerCase()           
        return this.apikey1.add(a)                         //add for adding new, put is for edit and update
    }

    getApikey(): Promise<any>{
        return this.apikey1.toArray()
    }

   async deleteApikey(a: string): Promise<any>{
        return this.apikey1.delete(a)
    }

}



export class CountrylistDatabase extends Dexie {

    private countrylist: Dexie.Table<Countrylist, string>;

    constructor(){
        super('countrylistdb')

        this.version(1).stores({
            countrylist: "id"
            // search: "++id,title"                          //number id base, need further study
        })

        this.countrylist = this.table('countrylist')
    }

    async addCountry(a: Countrylist): Promise<any> {
        return this.countrylist.add(a)                         //add for adding new, put is for edit and update
    }

    getCountrylist(): Promise<any>{
        return this.countrylist/*.orderBy('country')*/.toArray()
    }

}

export class CacheContentDatabase extends Dexie {

    private cachecontent1: Dexie.Table<CacheContent, string>;

    constructor(){
        super('cachecontentdb')

        this.version(1).stores({
            cachecontent: "id"
            // search: "++id,title"                          //number id base, need further study
        })

        this.cachecontent1 = this.table('cachecontent')
    }

    async addCache(a: CacheContent): Promise<any> {
        return this.cachecontent1.add(a)                         //add for adding new, put is for edit and update
    }

    getCache(): Promise<any>{
        return this.cachecontent1/*.orderBy('country')*/.toArray()
    }

}