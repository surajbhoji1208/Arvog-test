import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional, MaxLength } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;
}
