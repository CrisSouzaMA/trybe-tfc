import IUser from '../interfaces/IUser';
import User from '../database/models/user';

export default class Login {
  public _result: IUser | null;

  public async login(email: string, password: string): Promise<IUser | null> {
    this._result = await User
      .findOne({ where: { email, password }, attributes: { exclude: ['password'] } });

    if (!this._result) throw new Error('Incorrect email or password');
    return this._result;
  }
}
