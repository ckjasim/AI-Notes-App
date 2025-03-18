import { User } from '../models/schema/User';
import { UserAttrs, UserDoc } from '../models/user.model';
import { IUserService } from './user.service.interface';

export class UserService implements IUserService {
  async findUserByEmail(email: string): Promise<UserDoc | null> {
    const user = await User.findOne({email});
    return user;
  }
  async createUser(attrs: UserAttrs): Promise<any> {
    try {
      
      console.log('jjjjjjjjkkkkkkkkkkkkkkkkk')
      return await User.build(attrs).save();
    } catch (error) {
      console.log(error)
      
    }
  }
  async findUserById(id: string): Promise<UserDoc | null> {
    const user = await User.findOne({ _id: id });
    return user;
  }
}

export default new UserService();
