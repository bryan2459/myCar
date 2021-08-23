import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms'
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, ParamMap } from "@angular/router";


/*
import { PostsService } from "./posts.service";
import { PostsService } from "../posts.service";
import { Post } from "../post.model";
*/

import { Subscription } from 'rxjs';
import { MycarService } from '../mycar.service ';
import { Message } from '../IssueCash/message.model';



@Component({
  selector: 'app-car-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  title = 'Car Registration forms';
  //cars: Car[] = [];
  //car: Car;
  isLoading = false;
  private mode = "create";
  private carId: string;
  min = 1000;
  //posts: Person[] = [];
  private postsSub: Subscription;
  //private carsSub: Subscription;
  posts: Message[] = [];
  newStr: string;

  contactForm;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("carId")) {
         var carId = paramMap.get("carId");
         this.contactForm.get("car").setValue(carId);
         this.contactForm.get("car").disable();
         var registration = paramMap.get("rego");
         this.contactForm.get("rego").setValue(registration);
         this.contactForm.get("rego").disable();
         var ownerid = paramMap.get("owner")
         this.contactForm.get("owner").setValue(ownerid);
         this.contactForm.get("owner").disable();

        }});

      //displaying to page
      this.postsSub = this.mycarService.getSettleCarUpdateListener()
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
      //dispalying to page

   }





  constructor(private formBuilder: FormBuilder,public mycarService: MycarService,public route: ActivatedRoute ) {

    this.contactForm = this.formBuilder.group({
      owner: ['', [Validators.required]],
      car: ['', [Validators.required]],
      rego: ['', [Validators.required]],
      newOwner: ['', [Validators.required]],
      result: ['']
    });
  }


/*
 lastname: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
    Validators.pattern("^20(1[1-9]|[2-9][0-9])$")]]
*/

  get result() {
    return this.contactForm.get('result');
  }
  get owner() {
    return this.contactForm.get('owner');
  }

  get car() {
    return this.contactForm.get('car');
  }

  get newOwner() {
    return this.contactForm.get('newOwner');
  }
  get rego() {
    return this.contactForm.get('rego');
  }



  getMembers() {
    //this.postsService.getPosts();
    //this.postsSub = this.postsService.getPostUpdateListener()
    //  .subscribe((posts: Person[]) => {
      //  this.posts = posts;
     //   alert("post "+  JSON.stringify(this.posts));

     // });

  }

  ownerList: currency[] = [
    new currency("1", "O=Sunil,L=Brisbane,C=AU"),
    new currency('2', "O=Bryan, L=Melbourne, C=AU"),
    new currency('3', "O=Tola,L=Perth,C=AU"),
  ];

  onSubmit() {

    console.log(this.contactForm.value);
    this.mycarService.transferCar(this.owner.value,this.car.value,this.newOwner.value);
   /*
    owner (name)
  carMake e.g Toyota
  carModel e.g Corolla
  rego
  transmission
  manufacturedYear
  value ($$)

   */
  /*
   this.carsService.addPost(this.owner.value,
                            this.carMake.value,
                            this.carModel.value,
                            this.rego.value,
                            this.transmission.value,
                            this.manufacturedYear.value,
                            this.valueAmount.value)

   */




    this.contactForm.reset();
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



//https://stackoverflow.com/questions/39847862/min-max-validator-in-angular-2-final
//https://dzone.com/articles/how-to-create-custom-validators-in-angular
function validatorMin (min: number) : ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value < min )) {
        return { 'MinValue': true };
    }
    return null;
 }
}







