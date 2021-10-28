import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CountriesPageRoutingModule } from "./countries-page-routing.module";
import { CountriesPageComponent } from "./countries-page/countries-page.component";

@NgModule({
    declarations: [
      CountriesPageComponent
  ],
    imports: [
      CommonModule,
      CountriesPageRoutingModule,
    ]
})
export class CountriesPageModule { }