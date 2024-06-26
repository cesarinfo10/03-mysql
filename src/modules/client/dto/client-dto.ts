import { Address } from './../entity/address.entity';
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber,  IsOptional, IsPositive, IsString } from "class-validator";

export class ClientDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @Type(() => Address)
    @IsNotEmpty()
    address!: Address;

}