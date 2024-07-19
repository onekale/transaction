import { Controller, Post,Get,  Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, AddMoneyDto, TransferMoneyDto } from './create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { name, initialBalance } = createUserDto;
    return this.userService.createUser(name, initialBalance);
  }

  @Post('add-money')
  async addMoney(@Body() addMoneyDto: AddMoneyDto): Promise<User> {
    const { userId, amount } = addMoneyDto;
    return this.userService.addMoney(userId, amount);
  }

  @Post('transfer-money')
  async transferMoney(@Body() transferMoneyDto: TransferMoneyDto): Promise<void> {
    const { fromUserId, toUserId, amount } = transferMoneyDto;
    await this.userService.transferMoney(fromUserId, toUserId, amount);
  }

  @Get()
  async getData(): Promise<User[]> {
    return this.userService.getDatas();
  }
}
