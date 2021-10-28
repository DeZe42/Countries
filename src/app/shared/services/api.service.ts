import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  countries$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  country$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  getAllCountries() {
    this.http.get(environment.apiURL + 'all').subscribe(res => {
      this.countries$.next(res);
    });
  }

  getCountryByName(name: string) {
    this.http.get(environment.apiURL + 'name/' + name).subscribe(res => {
      this.countries$.next(res);
    });
  }

  getCountryByCode(code) {
    this.http.get(environment.apiURL + 'alpha/' + code).subscribe(res => {
      this.country$.next(res);
    });
  }

  getCountryByRegion(name: string) {
    this.http.get(environment.apiURL + 'region/' + name).subscribe(res => {
      this.countries$.next(res);
    });
  }
}