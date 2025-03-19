import { RegisterDTO } from 'src/Modules/Auth/DTOs/registerDTO';

export interface IAuthRepository {
  createAuth(registerDTO: RegisterDTO, hashedPassword: string);

  findByEmail(email: string);

  getUser(id: string);
}
