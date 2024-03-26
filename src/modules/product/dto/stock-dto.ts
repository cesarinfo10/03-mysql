import { IsNotEmpty, IsNumber, IsPositive, Max, Min, isNumber } from "class-validator";

export class StockDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id: number;

    @IsNotEmpty()
    @Min(0)
    @Max(1000)
    @IsNumber()
    stock: number;


}