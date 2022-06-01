import * as bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';
import User from '../database/models/user';

export default class Login {
  private _result: IUser | null;

  public async login(useremail: string, password: string) {
    this._result = await User
      .findOne({ where: { email: useremail } });

    if (!this._result) throw new Error('Incorrect email or password');

    const x = await bcrypt.compare(password, this._result.password as string);

    if (!x) {
      throw new Error('Incorrect email or password');
    }

    const { id, username, role, email } = this._result;

    return {
      id,
      username,
      role,
      email,
    };
  }
}
