import {
  Body,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
  CrudAuth
} from '@dataui/crud';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  dto: { create: CreateUserDto, update: UpdateUserDto },
  routes:{
    deleteOneBase:{
      returnDeleted: true
    }
  },
  query: {
    exclude: ['password'],
    alwaysPaginate: true
  },
})
// @CrudAuth({
//   property: 'user',
//   filter: ( user ) => {
//     return { 'id' : user.userId}
//   },
//   persist: (user) => {
//     return {'id' : user.userId }
//   }
// })


@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  get base(): CrudController<any> {
    return this;
  }

  @Override()
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: CreateUserDto) {
    const userCreated = await this.base.createOneBase(req, dto);


    return userCreated;
  }


  @Override('getManyBase')
  @UseGuards(JwtAuthGuard)
  getMany(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.getManyBase(req);
  }

  @Override('getOneBase')
  @UseGuards(JwtAuthGuard)
  getOneAndDoStuff(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.getOneBase(req);
  }

  @Override('deleteOneBase')
  @UseGuards(JwtAuthGuard)
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    const deleteOneUser = await this.base.deleteOneBase(req);

    return {
      message: `User deleted !`
    }
  }

  @Override('updateOneBase')
  @UseGuards(JwtAuthGuard)
  coolFunction(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateUserDto,
  ) {
    return this.base.updateOneBase(req, dto);
  }
}
