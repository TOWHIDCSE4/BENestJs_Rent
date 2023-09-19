import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsUrl()
  image_url: string;

  @IsString()
  @MaxLength(255)
  action_link: string;
};
export class UpdateBannerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsUrl()
  image_url: string;

  @IsString()
  @MaxLength(255)
  action_link: string;
};
export class DeleteBannerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsUrl()
  image_url: string;

  @IsString()
  @MaxLength(255)
  action_link: string;
}