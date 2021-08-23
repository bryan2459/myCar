import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms'
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { MycarService } from "../mycar.service ";
import {MyCar} from "../mycar.model";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";




@Component({
  selector: 'app-mycar',
  templateUrl: './mycar.component.html',
  styleUrls: ['./mycar.component.css']
})
export class MycarComponent implements OnInit {

  title = 'Angular Reactive forms';
  cars: MyCar[] = [];
  car: MyCar;
  private postsSub: Subscription;
  private mode = "create";
  private postId: string;
  //cash: Cash;
  min = 10;
  private memberId: string;


  contactForm;

  ngOnInit() {


    this.postsSub = this.mycarService.getPostUpdateListener()
      .subscribe((cars: MyCar[]) => {
        this.cars = cars;
       //  alert("cars???' "+ this.cars);
           this.cars.map(item => {
               console.log(item.rego,item.amount)
              // alert("Rego sub? "+ item.rego + " Car Maker: " + item.carMake);

        } )
      });

    }


  constructor(private formBuilder: FormBuilder,public mycarService: MycarService,private router: Router ) {

    this.contactForm = this.formBuilder.group({


      member: ['', [Validators.required]],


    });
  }






  get member() {
    return this.contactForm.get('member');


  }



  get query() {
    return this.contactForm.get('query');
  }



  memberList: member[] = [
    new member("1", "10009"),
    new member('2', "10012"),
    new member('3', "10015"),
    new member('4', "10018"),
  ];

  currencyList: currency[] = [
    new currency("1", "USD"),
    new currency('2', "AUD"),
    new currency('3', "NGN"),
    new currency('4', "INR"),
    new currency('5', "SGD"),
  ];

  onSubmit() {



     this.mycarService.getCars(
         this.member.value
      );
      // this.contactForm.reset();

    }
    onSettlement(carId: string, ownerId: string) {
      alert("car id : "+ carId  + "owner: "+ ownerId);
     // this.router.navigate(["/settle/:]");
     this.router.navigate(['/edit']);

  }

}



export class member {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

  }

}

export class currency {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

  }


}

function validatorMin (min: number) : ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value < min )) {
        return { 'MinValue': true };
    }
    return null;
 }
}
