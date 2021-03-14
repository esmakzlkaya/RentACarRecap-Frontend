import { RentalDetailDto } from "./rentalDetailDto";
import { ResponseModel } from "./responseModel";

export interface RentalResponseModel extends ResponseModel{
    data:RentalDetailDto[]
}