import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { NestSubComponent } from "./nest-sub/nest-sub.component";
import { ListComponent } from "./list/list.component";
import { AutoCompleteComponent } from "./auto-complete/auto-complete.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      // { path: "", component: HomeComponent },
      { path: "nest", component: NestSubComponent },
      { path: "list", component: ListComponent },
      { path: "autoComplete", component: AutoCompleteComponent }
    ])
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    NestSubComponent,
    ListComponent,
    AutoCompleteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
