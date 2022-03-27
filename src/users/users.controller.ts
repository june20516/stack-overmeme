import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    createUsers(@Body() user: User): Promise<User> {
        return this.usersService.save(user);
    }

    @Get(':id')
    getUser(
        @Param('id') id: string
        ): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    updateUser(
        @Param('id') id: string,
        @Body() user: User
    ): Promise<User> {
        return this.usersService.update(id, user);
    }

    
    @Delete(':id')
    removeUser(
        @Param('id') id: string
        ): Promise<string> {
        this.usersService.remove(id);
        return Object.assign({
            data: {id: id},
        })
    }
}
