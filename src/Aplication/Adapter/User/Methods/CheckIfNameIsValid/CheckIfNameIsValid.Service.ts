import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";

import { Either, left, right } from "../../../../Shared/Utils/Errors/Either"; 



export class CheckIfNameIsValidService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute(userName: string): Promise<boolean> {
    const user = await this.userRepository.getByUserName(userName);

    if (!user) {
      return false;
    }
    
    return true;
  }
}