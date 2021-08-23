import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {MyCar} from "./mycar.model"
import {Car } from "./IssueCar/car.model";

import { EmailValidator } from '@angular/forms';
import { getLocaleWeekEndRange } from '@angular/common';

import { createPipeType } from '@angular/compiler/src/render3/r3_pipe_compiler';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Cash } from './Cash/cash.model';
import { Message } from './IssueCash/message.model';

//main
//main


@Injectable({ providedIn: "root" })
export class MycarService {

    private cars: MyCar[] = [];
    car: MyCar;
    stringJson: any;
    private carsUpdated = new Subject<MyCar[]>();
    //from cash.component.ts
    private casher: Cash[] = [];
    private moneyUpdated = new Subject<Cash[]>();
    //from cash.component.ts
    //from cashissue.component.ts
    private msgs: Message[] = [];
    private messsageUpdated = new Subject<Message[]>();
    //from cashissue.component.ts
   //from issuecar.component.ts
   private carUpdated = new Subject<Car[]>();
   //from issuecar.component.ts
   //server variables
   serverPut = "http://localhost:10009/api/v1/issue-car?carMake=";
   serverGet = "http://localhost:";
   //server variables



  constructor(private http: HttpClient,private dialog: MatDialog,private router: Router) {}

  //start mycar.component.ts
  getPostUpdateListener() {
    return this.carsUpdated.asObservable();
  }
  //end mycar.compoent.ts

  //start transfer car

  transferCar(owner:string,car: string,newOwner: string) {
    alert('Transferring car');
    alert('Owner= '+owner + 'cardid='+car +"newOwner:"+ newOwner);
    const array = owner.split(",");
    // console.log("names +" +array[0]);
     const name = array[0].replace('O=','');
     console.log("new name- "+ name );
     var portn ='';
     if (name == 'Bryan') { portn = '10015'}
     if (name == 'Sunil') { portn = '10012'}
     if (name == 'Tola')  { portn =  '10018'}
     console.log("port = "+ portn);
     //http://localhost:10015/api/v1/transfer-car?id=fa1615a5-d401-460d-801b-bfcef1d4e337&party=O=Sunil,L=Brisbane,C=AU
     this.http
     .get<{ message: string; carstemp: any }>(
          this.serverGet + portn +
          "/api/v1/transfer-car?id=" + car +
          "&party=" + newOwner,
            {responseType : 'text' as 'json'}

      )
      .subscribe(transformedPosts => {
           console.log("return = "+ transformedPosts )
           //sending back to page
             // start of code
           //console.log("trans = " + transformedPosts);

           const temp = [];
           this.msgs = temp;
              Object.keys(transformedPosts).forEach( key => this.msgs.push(new Message(transformedPosts[key])));

           //console.log(temp);
           //alert(temp);
              this.msgs.map(item => {
                 console.log("xxxx: " + item.message)

           } )
           this. messsageUpdated.next([...this.msgs]);
           //sending back to page

        }, error =>  {alert("error ? "+ JSON.stringify(error.message));}
     );


      //   this.router.navigate(["/"]);
  }
  //end transfer car
  //start from settle.component.ts
  settleCar(owner: string, car: string, currency: string,cash: string)
  {
          alert("calling settle car");
          //http://localhost:10015/api/v1/settle-car-payment?id=f5e3ff8b-d336-4b94-bec3-0be7ddaea56a&amount=1&currency=AUD
         // const name = owner.slice(0);
          const array = owner.split(",");
         // console.log("names +" +array[0]);
          const name = array[0].replace('O=','');
          console.log("Settle name- "+ name );
          var portn ='';
          if (name == 'Bryan') { portn = '10015'}
          if (name == 'Sunil') { portn = '10012'}
          if (name == 'Tola')  { portn =  '10018'}
          console.log("port = "+ portn);
          this.http
            .get<{ message: string; carstemp: any }>(
                 this.serverGet + portn +
                 "/api/v1/settle-car-payment?id=" + car +
                 "&amount=" + cash +
                 "&currency=" + currency,
                 {responseType : 'text' as 'json'}
             )
             .subscribe(transformedPosts => {
              console.log("return = "+ transformedPosts )
              //sending data back
              //console.log("trans = " + transformedPosts);

              const temp = [];
              this.msgs = temp;
                Object.keys(transformedPosts).forEach( key => this.msgs.push(new Message(transformedPosts[key])));

              //console.log(temp);
              //alert(temp);
              this.msgs.map(item => {
                console.log("xxxx: " + item.message)

               } )
               this. messsageUpdated.next([...this.msgs]);

              //sending data back
            }, error =>  {alert("error ? "+ JSON.stringify(error.message) );}
         );

    //   this.router.navigate(["/"]);

  }
  getSettleCarUpdateListener() {
    return this.messsageUpdated.asObservable();
  }
  //end from settle.component.ts
  //start from myCars.component.ts
  getCars(member: string) {
    console.log("UpdatePost?????????")
    console.log(member);


    //http://localhost:10015/api/v1/my-cars
    //generate: http://localhost:10009/api/v1/my-cars

     this.http
      .get<{ message: string; carstemp: any }>(
          // "http://localhost:10009/api/v1/self-issue-cash?amount=500&currency=AUD"
          this.serverGet + member +
          "/api/v1/my-cars"


       //   cash +
        //  "&currency=" + currency

      )

      .subscribe(transformedPosts => {
       console.log("done it " + JSON.stringify(transformedPosts ));
       let results = transformedPosts;
       const temp = [];
       this.cars = temp;


          let arr1 = Object.entries(transformedPosts);

          const carlist = arr1.map( function(cargo) {
            return [cargo[1].state.data.rego,
                   cargo[1].state.data.carMake,
                   cargo[1].state.data.amount,
                   cargo[1].state.data.paid,
                   cargo[1].state.data.issuer,
                   cargo[1].state.data.owner,
                   cargo[1].state.data.linearId.id]
            //console.log("lnexxxxxxxx "+cargo[1].state.data.linearId.id);

            //this.cars.push(new MyCar(carMake,rego,amount,paid,issuer,owner,linearId));

           }

          );

         console.log("new array "+ carlist);
        // console.log("element 0 "+ carlist[0][0])
        // console.log('element 1 '+ carlist[0][1] );
         console.log("array length = "+ carlist.length);
          for (var i=0;i< carlist.length; ++i )
          {
           this.cars.push(new MyCar(carlist[i][1],
                                    carlist[i][0],
                                    carlist[i][2],
                                    carlist[i][3],
                                    carlist[i][4],
                                    carlist[i][5],
                                    carlist[i][6] ))
          }

         //new code

           this.carsUpdated.next([...this.cars]);

       //



           }, error => {alert('error ='+  JSON.stringify(error.message));
                         alert("error ? "+ error.status);

        }

    );

  }
   //end from myCars.component.ts
  //start from cash.component.ts

  checkCash(id: string, member: string, query: string) {
    console.log("UpdatePost?????????")
    console.log(member);
    console.log("query type " + query);
    if (query == "balance")
    {
       alert('balance query will be executed...');
       var queryString = "cash-balances";
    }
    if (query == "state") {
       alert('state query will be executed...');
       var queryString = "cash";
    }
    if (query == "issueCash") {
      alert('issue cash will be executed...');
      var queryString = "isssueCash";
      this.router.navigate(["/issuecash",member]);
      return;
    }


    //http://localhost:10009/api/v1/cash-balances
    //http://localhost:10009/api/v1/cash
    //http://localhost:10012/api/v1/cash-balances

     this.http
      .get<{ message: string; casher: any }>(
          // "http://localhost:10009/api/v1/self-issue-cash?amount=500&currency=AUD"
           this.serverGet + member +
          "/api/v1/" +
           queryString

       //   cash +
        //  "&currency=" + currency

      )

      .subscribe(transformedPosts => {
       console.log("done it " + transformedPosts ) ;

        let results = transformedPosts;

        // start of code
           const temp = [];
           this.casher = temp;
           Object.keys(transformedPosts).forEach( key => this.casher.push(new Cash(transformedPosts[key].quantity/100,
                    transformedPosts[key].token)
            ) )
           //console.log(temp);
           //alert(temp);
           this.casher.map(item => {
             console.log(item.quantity,item.token)

           } )
           this.moneyUpdated.next([...this.casher]);


        //


            }, error => {alert('error ='+  JSON.stringify(error.message));
                          alert("error ? "+ error.status);

         }

     );

 }

 getCarUpdateListener() {
  return this.moneyUpdated.asObservable();
}

  //end from cash.componet.ts

  //start from cashissue.component.ts
  getCash(id: string, member: string, currency: string,
    cash: string) {
    console.log("UpdatePost?????????")
    console.log(member);
     console.log(currency);
     console.log(cash);
     this.http
      .get<{ message: string; msgs: any }>(
          // "http://localhost:10009/api/v1/self-issue-cash?amount=500&currency=AUD"
          this.serverGet + member +
          "/api/v1/self-issue-cash?amount=" +
          cash +
          "&currency=" + currency,
          {responseType : 'text' as 'json'}

      )
      .subscribe(transformedPosts => {


          // start of code
          console.log("trans = " + transformedPosts);

          const temp = [];
          this.msgs = temp;
             Object.keys(transformedPosts).forEach( key => this.msgs.push(new Message(transformedPosts[key])));

           //console.log(temp);
           //alert(temp);
           this.msgs.map(item => {
             console.log("xxxx: " + item.message)

           } )
           this. messsageUpdated.next([...this.msgs]);


         // this.messageUpdated.next([...results]);
       }, error =>  {alert("error ? "+ JSON.stringify(error.message));}
     );

    //    .get("http://localhost:10009/api/v1/self-issue-cash?amount=200&currency=AUD");

  }
  getCashUpdateListener() {
    return this.messsageUpdated.asObservable();
  }

   //end from cashissue.component.ts

   //start from issuecar.compoent.ts
   issueCar(id: string, member: string, maker: string, rego: string,
    loc: string, country: string,
    currency: string,
   cash: string) {
   console.log("UpdatePost?????????")
   console.log(member);
   console.log(maker);
   console.log(rego);
   console.log(loc),
   console.log(country);
    console.log(currency);
    console.log(cash);
  const car: Car = {member: member,
          carMake: maker,
          rego: rego,
          amount: cash,
          currency: currency,
          location: loc,
          country: country
  };
  //http://localhost:10009/api/v1/issue-car?carMake=FORD&rego=VM200T&amount=5000&currency=AUD&party=O=Bryan, L=Melbourne, C=AU
  //this.http
  //.put("http://localhost:3000/api/members/" + id, car)
  this.http
  .put(this.serverPut +
         maker +
         "&rego=" +
         rego   +
         "&amount=" +
         cash +
         "&currency=" +
         currency +
         "&party=O=" +
         member +
         ",L=" +
         loc +
         ",C=" +
         country   + "",car, {responseType : 'text' as 'json'} )
  .subscribe(transformedPosts => {
       console.log("????" + transformedPosts);
       const temp = [];
       this.msgs = temp;
          Object.keys(transformedPosts).forEach( key => this.msgs.push(new Message(transformedPosts[key])));

        //console.log(temp);
        //alert(temp);
        this.msgs.map(item => {
          console.log("xxxx: " + item.message)

        } )
        this. messsageUpdated.next([...this.msgs]);
      });
   }

  getIssueCarUpdateListener() {
    return this.messsageUpdated.asObservable();
  }
   //end from issuecar.compoent.ts



}
