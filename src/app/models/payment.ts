export interface Payment{
    customerName:string,
    creditCardNo:string,
    expirationDate:Date,
    cvv:number,
    cardType:string,
    installment:number
}