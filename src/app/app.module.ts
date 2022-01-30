import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductComponent} from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaAttrDirective} from "./attr.directive";
import {PaModel} from "./twoway.directive";
import {PaStructureDirective} from "./structure.directive";
import {PaIteratorDirective} from "./iterator.directive";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    PaAttrDirective,
    PaModel,
    PaStructureDirective,
    PaIteratorDirective
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [PaModel],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
