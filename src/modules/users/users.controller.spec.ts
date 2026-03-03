// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
// import {User} from "./entities/user.entity";
// import { CreateUserDto } from './dto/create-user.dto';
// import { createMock } from '@golevelup/ts-jest';
// import { ExecutionContext } from '@nestjs/common';
// import { CrudRequest } from "@nestjsx/crud";
// import { MockRepository } from '../../utils/tests/mockRepository';



// describe('UsersController', () => {
//   let catsController: UsersController;
//   let catsService: UsersService;

  
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(User),
//           useClass: MockRepository,
//         },
//       ],
//     }).compile();

//     catsController = module.get<UsersController>(UsersController);
//     catsService = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(catsController).toBeDefined();
//   });

//   it('create()는 id를 받아서 저장합니다.', async () => {
//     const spy = jest.spyOn(catsService, 'getMany');


//     // const createUser: CreateUserDto = {
//     //     name: 'lucas',
//     //     email: 'lucaseidi@hotmail.com',
//     //     password: '123',
//     // }
//     const req : CrudRequest = {
//         parsed: undefined,
//         options: undefined
//     }
    
//     await catsController.getMany(req);

//     expect(spy).toHaveBeenCalled();
//   });

// });