import { UpdateUserDTO } from '../DTOs/updateUserDTO';

export interface IUserService {
  deleteUser(id: string);

  getAllUser();

  getUser(id: string);

  updateUser(id: string, updateUserDTO: UpdateUserDTO);
}
