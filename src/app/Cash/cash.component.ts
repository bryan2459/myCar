import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms'
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { MycarService } from "../mycar.service ";
import {Cash} from "./cash.model";
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {

  title = 'Angular Reactive forms';
  cashs: Cash[] = [];
  cash: Cash;
  private postsSub: Subscription;
  private mode = "create";
  private postId: string;
  //cash: Cash;
  min = 10;
  private memberId: string;


  contactForm;

  ngOnInit() {


    this.postsSub = this.mycarService.getCarUpdateListener()
      .subscribe((cashs: Cash[]) => {
        this.cashs = cashs;
       // alert("cash???' "+ this.cashs);
        this.cashs.map(item => {
          //console.log(item.quantity,item.token)
        //  alert("Quantity sub? "+ item.quantity + " Currency: " + item.token);

        } )
      });

    }


  constructor(private formBuilder: FormBuilder,public mycarService: MycarService ) {

    this.contactForm = this.formBuilder.group({


      member: ['', [Validators.required]],
      query: ['', [Validators.required]],

    });
  }






  get member() {
    return this.contactForm.get('member');
    //return this.contactForm.get('owner');
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



     this.mycarService.checkCash(
        this.postId,
        this.member.value,
        this.query.value

      );
      // this.contactForm.reset();

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
