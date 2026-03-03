// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { MockRepository } from '../../utils/tests/mockRepository';

// export type MockType<T> = {
//   [P in keyof T]?: jest.Mock;
// };

// describe('UsersService', () => {
//   let service: UsersService;
//   let repositoryMock: MockType<Repository<User>>;
//   // let spyOn: Repository<User>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(User),
//           useClass: MockRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//     repositoryMock = module.get(getRepositoryToken(User));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should find a user by id with Repository', async () => {
//     const mockUser = { name: "lucas" };
//     repositoryMock.findOne.mockReturnValue(mockUser);
//     const user = await service.findOne(1);

//     expect(user.name).toEqual('lucas');
//   });

// });