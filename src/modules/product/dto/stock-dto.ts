import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, Max, Min, isNumber } from "class-validator";

export class StockDto {

    @ApiProperty({
        name: 'id',
        required: true,
        description: 'Id del producto',
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id: number;

    @ApiProperty({
        name: 'stock',
        required: true,
        description: 'Stock del producto',
        type: Number
    })
    @IsNotEmpty()
    @Min(0)
    @Max(1000)
    @IsNumber()
    stock: number;


}