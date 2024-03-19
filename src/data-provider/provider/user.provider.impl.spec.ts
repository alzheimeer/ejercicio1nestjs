// import { Test, TestingModule } from '@nestjs/testing';
// import { getModelToken } from '@nestjs/mongoose';
// import mongoose, { Model } from 'mongoose';
// import { UserProvider } from './user.provider.impl';
// import { UserModel } from '../model/user.model';
// import { AddressModel } from '../model/address.model';

// describe('UserProvider', () => {
//   let userProvider: UserProvider;
//   let userModelMock: jest.Mocked<Model<UserModel>>;
//   let addressModelMock: jest.Mocked<Model<AddressModel>>;

//   beforeEach(async () => {
//     userModelMock = {
//       find: jest.fn().mockReturnValue({
//         lean: jest.fn().mockReturnThis(),
//         exec: jest.fn().mockResolvedValue([
//           { _id: new mongoose.Types.ObjectId(), name: 'John Doe', documentNumber: '123456789', documentType: 'CC' },
//           // Añade más usuarios mockeados según sea necesario
//         ]),
//       }),
//     } as unknown as jest.Mocked<Model<UserModel>>;

//     addressModelMock = {
//       find: jest.fn().mockImplementation((criteria) => ({
//         lean: jest.fn().mockReturnThis(),
//         exec: jest.fn().mockResolvedValue([
//           { _id: new mongoose.Types.ObjectId(), address: '123 Main St', isActive: true, isPrimary: true, userId: criteria.userId },
//           // Añade más direcciones mockeadas según sea necesario, ajustando el criteria.userId como corresponda
//         ]),
//       })),
//     } as unknown as jest.Mocked<Model<AddressModel>>;

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserProvider,
//         {
//           provide: getModelToken(UserModel.name),
//           useValue: userModelMock,
//         },
//         {
//           provide: getModelToken(AddressModel.name),
//           useValue: addressModelMock,
//         },
//       ],
//     }).compile();

//     userProvider = module.get<UserProvider>(UserProvider);
//   });

//   describe('getAllUsers', () => {
//     it('should return all users with their addresses', async () => {
//       const users = await userProvider.getAllUsers();

//       // Aquí asumimos que esperas que el resultado sea un array de usuarios con sus direcciones
//       expect(users).toEqual([
//         expect.objectContaining({
//           id: expect.any(String),
//           name: 'John Doe',
//           documentNumber: '123456789',
//           documentType: 'CC',
//           addresses: expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(String),
//               address: '123 Main St',
//               isActive: true,
//               isPrimary: true,
//             }),
//           ]),
//         }),
//         // Añade expectativas para otros usuarios si es necesario
//       ]);

//       expect(userModelMock.find).toHaveBeenCalled();
//       // Asegura que se haya llamado al método para encontrar las direcciones para cada usuario
//       expect(addressModelMock.find).toHaveBeenCalledTimes(expect.any(Number));
//     });
//   });

//   // Aquí puedes añadir más descripciones para otras pruebas
// });
