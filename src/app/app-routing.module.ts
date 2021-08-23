import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {APP_BASE_HREF} from '@angular/common';
import { SettlementComponent } from './Settlement/settle.component';
import { AppComponent } from './app.component';
import { MycarComponent } from './MyCar/mycar.component';
import { TransferComponent } from './Transfer/transfer.component';
import { CashComponent } from './Cash/cash.component';
import { IssueCashComponent } from './IssueCash/issuecash.component';
import { IssueCarComponent } from './IssueCar/issuecar.component';

const routes: Routes = [
     { path: 'issuecar', component: IssueCarComponent },
     { path: 'issuecash/:memberId', component: IssueCashComponent },
     { path: 'cash', component: CashComponent },
     { path: 'transfer/:carId/:rego/:owner', component: TransferComponent },
     { path: 'settle/:carId/:rego/:owner', component: SettlementComponent },
     { path: '', component: MycarComponent},
     //path="/user/manage/:id/:type"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
   /*
   providers: [
      { provide: APP_BASE_HREF, useValue: '/' + (window.location.pathname.split('/')[1] || '') }
    ],
   */
   providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
