import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from "@angular/common/http";
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { SettlementComponent } from './Settlement/settle.component';
import { MyCar } from './mycar.model';
import { MycarComponent } from './MyCar/mycar.component';
import { TransferComponent } from './Transfer/transfer.component';
import { HeaderComponent } from './header/header.component';
import { CashComponent } from './Cash/cash.component';
import { IssueCashComponent } from './IssueCash/issuecash.component';
import { IssueCarComponent } from './IssueCar/issuecar.component';

@NgModule({
  declarations: [
    AppComponent,
    SettlementComponent,
    MycarComponent,
    TransferComponent,
    HeaderComponent,
    CashComponent,
    IssueCashComponent,
    IssueCarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
