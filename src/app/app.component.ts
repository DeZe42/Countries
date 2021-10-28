import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
 
  darkMode: boolean = false;
  darkModeSub: Subscription;

  constructor(
    private dataService: DataService
  ) {

  }

  ngOnInit() {
    this.getDarkMode();
    this.darkModeSub = this.dataService.darkMode$.subscribe(data => {
      this.darkMode = data;
    });
  }

  ngOnDestroy() {
    if(this.darkModeSub) this.darkModeSub.unsubscribe();
  }

  darkModeToggle() {
    if (this.darkMode == true) {
      this.dataService.darkMode$.next(false);
      localStorage.setItem('darkMode', 'false');
    } else {
      this.dataService.darkMode$.next(true);
      localStorage.setItem('darkMode', 'true');
    }
  }
  
  getDarkMode() {
    if (localStorage.getItem('darkMode') == null || (localStorage.getItem('darkMode') == 'false')) {
      this.dataService.darkMode$.next(false);
    } else {
      this.dataService.darkMode$.next(true);
    }
  }
}