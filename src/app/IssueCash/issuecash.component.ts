import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms'
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { MycarService } from "../mycar.service ";
import {Message} from "./message.model";
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from "@angular/router";




@Component({
  selector: 'app-issuecash',
  templateUrl: './issuecash.component.html',
  styleUrls: ['./issuecash.component.css']
})
export class IssueCashComponent implements OnInit {

  title = 'Angular Reactive forms';
  posts: Message[] = [];
  private postsSub: Subscription;
  private mode = "create";
  private postId: string;
  min = 10;
  private memberId: string;
  msgList = [];
  newStr: string;


  contactForm;

  ngOnInit() {
    /*
    this.postsService.getPosts();
    */

    //getting parm


    //getting parm
    this.postsSub = this.mycarService.getCashUpdateListener()
      .subscribe((posts: Message[]) => {
       this.posts = posts;
       this.newStr = '';
   //    console.log("before = + " + posts);
       this.posts.map(item => {
           console.log("x: " + item.message)
        //  this.msgList.push(item.message);
            this.newStr +=item.message;

        } )
        alert("post??? "+ this.newStr);
        this.contactForm.get("result").setValue(this.newStr);

      });
     //this.mode = "create";
     //var memberId = null;
     this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("memberId")) {
         var memberId = paramMap.get("memberId");
         this.contactForm.get("member").setValue(memberId);
         this.contactForm.get("member").disable();

        }});



  }


  constructor(private formBuilder: FormBuilder,public mycarService: MycarService, public route: ActivatedRoute ) {


    this.contactForm = this.formBuilder.group({


      member: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      cash: ['', [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$"), validatorMin(this.min)]],
      result: ['']

    });
  }

  get result() {
    return this.contactForm.get('result');
  }


  get cash() {
    return this.contactForm.get('cash');
  }



  get member() {
    return this.contactForm.get('member');
    //return this.contactForm.get('owner');
  }

  get currency() {
    return this.contactForm.get('currency');
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



     this.mycarService.getCash(
        this.postId,
        this.member.value,
        this.currency.value,
        this.cash.value

      );
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
