import { UpdateUserDTO } from '../updateUserDTO';

export interface IUserRepository {
  updateUser(id: string, updateUserDTO: UpdateUserDTO);

  findById(id: string);

  findByEmail(email: string);

  findAll();

  deleteUser(id: string);
}
