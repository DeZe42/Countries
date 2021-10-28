import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss']
})
export class CountriesPageComponent implements OnInit, OnDestroy {

  countryData: any;
  darkMode: boolean = false;
  darkModeSub: Subscription;
  countryDataSub: Subscription;

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.apiService.getCountryByCode(this.route.snapshot.params['id']);
    this.countryDataSub = this.apiService.country$.subscribe(data => {
      if (data) {
        this.countryData = data[0];
      }
    });
    this.darkModeSub = this.dataService.darkMode$.subscribe(data => {
      this.darkMode = data;
    });
  }

  ngOnDestroy() {
    if (this.darkModeSub) this.darkModeSub.unsubscribe();
    if (this.countryDataSub) this.countryDataSub.unsubscribe();
  }

  back() {
    this.router.navigateByUrl('/');
  }

  goToCountry(code: string) {
    this.router.navigateByUrl('/' + code);
    this.apiService.getCountryByCode(code);
  }

  formatNumber(number) {
    if (number) {
      return number.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
    }
  }

  getObject(obj) {
    if (obj) {
      let data: any = [];
      for (const key in obj) {
        data.push(obj[key]);
      }
      return data;
    }
  }
}