import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms'
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { MycarService } from "../mycar.service ";
import { Subscription } from 'rxjs';
import {Message} from "../IssueCash/message.model";




@Component({
  selector: 'app-issuecar',
  templateUrl: './issuecar.component.html',
  styleUrls: ['./issuecar.component.css']
})
export class IssueCarComponent implements OnInit {

  title = 'Angular Reactive forms';
  //posts: Person[] = [];
  private postsSub: Subscription;
  private mode = "create";
  private postId: string;
  //person: Person;
  min = 10;
  private memberId: string;
  posts: Message[] = [];
  newStr: string;


  contactForm;

  ngOnInit() {
    this.postsSub = this.mycarService.getIssueCarUpdateListener()
      .subscribe((posts: Message[]) => {
       this.posts = posts;
       this.newStr = '';
   //    console.log("before = + " + posts);
       this.posts.map(item => {
           console.log("x: " + item.message)
        //  this.msgList.push(item.message);
            this.newStr +=item.message;

        } )
        alert("Result: "+ this.newStr);
        this.contactForm.get("result").setValue(this.newStr);
        this.contactForm.get("result").disable();

      });
  }


  constructor(private formBuilder: FormBuilder,public mycarService: MycarService ) {

    this.contactForm = this.formBuilder.group({


      member: ['', [Validators.required]],
      maker: ['', [Validators.required]],
      rego: ['', [Validators.required]],
      loc:  ['', [Validators.required]],
      country: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      cash: ['', [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), validatorMin(this.min)]],
      result: ['']

    });
  }

  get result() {
    return this.contactForm.get('result');
  }

  get country() {
    return this.contactForm.get('country');
  }
  get loc() {
    return this.contactForm.get('loc');
  }

  get rego() {
    return this.contactForm.get('rego');
  }

  get cash() {
    return this.contactForm.get('cash');
  }

  get maker() {
    return this.contactForm.get('maker');
  }

  get member() {
    return this.contactForm.get('member');
    //return this.contactForm.get('owner');
  }

  get currency() {
    return this.contactForm.get('currency');
  }




  memberList: member[] = [
    new member("1", "Bryan"),
    new member('2', "Sunil"),
    new member('3', "Tola"),
  ];

  currencyList: currency[] = [
    new currency("1", "USD"),
    new currency('2', "AUD"),
    new currency('3', "INR"),
    new currency('4', "NGN"),
    new currency('5', "SGD"),
  ];

  countryList: country[] = [
    new country("1", "AU"),
    new country('2', "US"),
    new country('3', "IN"),
    new country('4', "NG"),
    new country('5', "SG"),
  ];

  makerList: maker[] = [
    new maker("1", "Ford"),
    new maker('2', "Toyota"),
    new maker('3', "GM"),
    new maker('4', "Hyunda"),
    new maker('5', "Saab"),
  ];

  onSubmit() {

  //Dealer Issue a New Car (PUT Request)
//http://localhost:10009/api/v1/issue-car?carMake=FORD&rego=RTY543&amount=2000&currency=AUD&party=O=Bryan, L=Melbourne, C=AU



     this.mycarService.issueCar(
        this.postId,
        this.member.value,
        this.maker.value,
        this.rego.value,
        this.loc.value,
        this.country.value,
        this.currency.value,
        this.cash.value);


      this.contactForm.reset();

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

export class maker {
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

export class country {
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
