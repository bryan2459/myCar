export class MyCar {
    carMake: string;
    rego: string;
    amount: number;
    paid: number;
    issuer: string;
    owner: string;
    linearId: string;

    constructor(carMake,rego,amount,paid,issuer,owner,linearId)
    {
      this.carMake = carMake;
      this.rego = rego;
      this.amount = amount;
      this.paid = paid;
      this.issuer = issuer;
      this.owner = owner;
      this.linearId = linearId;
    }
}

