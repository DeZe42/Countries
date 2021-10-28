import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesPageComponent } from './countries-page/countries-page.component';

const routes: Routes = [
    { path: '', component: CountriesPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CountriesPageRoutingModule { }