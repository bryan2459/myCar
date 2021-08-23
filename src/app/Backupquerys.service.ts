import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {Cash } from "./cash.model";
import {MyCar} from "./mycar.model"

import { EmailValidator } from '@angular/forms';
import { getLocaleWeekEndRange } from '@angular/common';
import { member } from './app.component';
import { createPipeType } from '@angular/compiler/src/render3/r3_pipe_compiler';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';




@Injectable({ providedIn: "root" })
export class QuerysService {
    private casher: Cash[] = [];
    private cars: MyCar[] = [];

    stringJson: any;
    private moneyUpdated = new Subject<Cash[]>();
    private carsUpdated = new Subject<MyCar[]>();


  constructor(private http: HttpClient,private dialog: MatDialog) {}


  getPostUpdateListener() {
    return this.carsUpdated.asObservable();
  }


  updatePost(member: string) {
    console.log("UpdatePost?????????")
    console.log(member);


    //http://localhost:10015/api/v1/my-cars
    //generate: http://localhost:10009/api/v1/my-cars

     this.http
      .get<{ message: string; cars: any }>(
          // "http://localhost:10009/api/v1/self-issue-cash?amount=500&currency=AUD"
          "http://localhost:" + member +
          "/api/v1/my-cars"


       //   cash +
        //  "&currency=" + currency

      )

      .subscribe(transformedPosts => {
       console.log("done it " + JSON.stringify(transformedPosts ));
       let results = transformedPosts;

       // start of code
          const temp = [];
         // this.cars = temp;
          /*
          Object.keys(transformedPosts).forEach( key => this.casher.push(new Cash(transformedPosts[key].quantity/100,
                   transformedPosts[key].token)
           ) )
          //console.log(temp);
          //alert(temp);
          this.casher.map(item => {
            console.log(item.quantity,item.token)

          } )
          */
          //new code
          let arr1 = Object.entries(transformedPosts);
          var carInfo = arr1.map( function(car) {
            var rego =car[1].state.data.rego;
            var carMake = car[1].state.data.carMake;
            var amount = car[1].state.data.amount;
            var paid = car[1].state.data.paid;
            var issuer = car[1].state.data.issuer;
            var owner = car[1].state.data.owner;
            var linearId = car[1].state.data.linearId.id;
            console.log("lnexxxxxxxx "+car[1].state.data.linearId.id);
            this.cars.push(new MyCar(carMake,rego,amount,paid,issuer,owner,linearId));

           }
         );

         //new code

          this.carsUpdated.next([...this.cars]);

       //



           }, error => {alert('error ='+  JSON.stringify(error.message));
                         alert("error ? "+ error.status);

        }

    );

  }
}
