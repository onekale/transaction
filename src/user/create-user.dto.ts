import { IsString, IsInt, Min, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  initialBalance: number;
}

export class AddMoneyDto {
  @IsInt()
  userId: number;

  @IsInt()
  @IsPositive()
  amount: number;
}

export class TransferMoneyDto {
  @IsInt()
  fromUserId: number;

  @IsInt()
  toUserId: number;

  @IsInt()
  @IsPositive()
  amount: number;
}
