import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchCtrl: FormControl = new FormControl('');
  countries;
  isLoading: boolean = false;
  dropDownOpen: boolean = false;
  darkMode: boolean = false;
  filterName: string = 'Filter by Region';
  darkModeSub: Subscription;
  countriesDataSub: Subscription;

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getAllCountries();
    this.countriesDataSub = this.apiService.countries$.subscribe(data => {
      if (data) {
        this.countries = data;
        this.isLoading = false;
      }
    });
    this.darkModeSub = this.dataService.darkMode$.subscribe(data => {
      this.darkMode = data;
    });
  }

  ngOnDestroy() {
    if (this.darkModeSub) this.darkModeSub.unsubscribe();
    if (this.countriesDataSub) this.countriesDataSub.unsubscribe();
  }

  searchCountryByName(event) {
    if (event.keyCode == 13) {
      this.apiService.getCountryByName(this.searchCtrl.value);
    }
  }

  dropDown() {
    let filter = document.getElementById('filter');
    let dropdown = document.getElementById('drop-down');
    let layer = document.getElementById('filter-layer');
    if (dropdown && filter && layer) {
      let width = filter.offsetWidth;
      if (this.dropDownOpen == true) {
        this.dropDownOpen = false;
        dropdown.style.display = 'none';
        layer.style.display = 'none';
      } else {
        this.dropDownOpen = true;
        dropdown.style.display = 'flex';
        dropdown.style.minWidth = width + 'px';
        layer.style.display = 'flex';
      }
    }
  }

  dropDownOff() {
    let layer = document.getElementById('filter-layer');
    let dropdown = document.getElementById('drop-down');
    if (dropdown && layer) {
      if (this.dropDownOpen == true) {
        this.dropDownOpen = false;
        dropdown.style.display = 'none';
        layer.style.display = 'none';
      }
    }
  }

  addRegion(name: string) {
    let layer = document.getElementById('filter-layer');
    let dropdown = document.getElementById('drop-down');
    if (dropdown && layer) {
      this.dropDownOpen = false;
      dropdown.style.display = 'none';
      layer.style.display = 'none';
    }
    this.filterName = name;
    this.apiService.getCountryByRegion(name);
  }

  formatNumber(number) {
    if (number) {
      return number.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
    }
  }

  navigateToCountryPage(code) {
    this.router.navigateByUrl('/' + code);
  }

  restore() {
    this.searchCtrl.setValue('');
    this.apiService.getAllCountries();
  }

  restoreFilter(event) {
    event.stopPropagation();
    this.filterName = "Filter by Region";
    this.apiService.getAllCountries();
  }
}