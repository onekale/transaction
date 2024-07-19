import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async createUser(name: string, initialBalance: number): Promise<User> {
    const newUser = this.userRepository.create({ name, balance: initialBalance });
    return this.userRepository.save(newUser);
  }

  async addMoney(userId: number, amount: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.balance += amount;
    return this.userRepository.save(user);
  }

  async transferMoney(fromUserId: number, toUserId: number, amount: number): Promise<void> {
    await this.dataSource.transaction(async transactionalEntityManager => {
      const fromUser = await transactionalEntityManager.findOne(User, { where: { id: fromUserId } });
      const toUser = await transactionalEntityManager.findOne(User, { where: { id: toUserId } });

      if (!fromUser || !toUser) {
        throw new Error('One or both users not found');
      }

      if (fromUser.balance < amount) {
        throw new Error('Insufficient funds');
      }

      fromUser.balance -= amount;
      toUser.balance += amount;

      await transactionalEntityManager.save(fromUser);
      await transactionalEntityManager.save(toUser);

   

      
    });
  }

  getDatas() : Promise<User[]> {
    return this.userRepository.find();
  }
}
