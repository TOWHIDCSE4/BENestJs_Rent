import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description?: string;

  @IsNotEmpty()
  coverImage?: string;

  @IsNotEmpty()
  price?: number;

  @IsNotEmpty()
  @Min(1)
  @Max(99)
  discountRate: number;
}
