import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  save(user: User): Promise<User> {
      return this.usersRepository.save(user);
  }

  update(id: string, user: User): Promise<User> {
    this.usersRepository.update(id, user);
    return this.findOne(id)
  }

  remove(id: string): Promise<void> {
    this.usersRepository.delete(id);
    return;
  }
}
