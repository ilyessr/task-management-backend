import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsMongoId,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password?: string;
}

export class FindOneUserDto {
  @IsMongoId()
  id: string;
}

export class RemoveUserDto {
  @IsMongoId()
  id: string;
}
