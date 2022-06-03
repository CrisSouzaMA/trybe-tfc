import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import User from '../database/models/user';

export default class Login {
  private _result: IUser | null;
  private _error = new Error('User não existe');

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

  public async logintoken(id: number) {
    const checkid = await User
      .findOne({ where: { id }, attributes: { exclude: ['password'] } });

    if (!checkid) throw this._error;

    return checkid;
  }
}

// refatorar com mensagens todas em inglês
